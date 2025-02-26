import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "Authorisation code missing" }, { status: 400 });
    }

    const tokenUrl = "https://api.tink.com/api/v1/oauth/token";
    const params = new URLSearchParams();
    params.append("client_id", process.env.NEXT_PUBLIC_TINK_CLIENT_ID || "");   
    params.append("client_secret", process.env.NEXT_PUBLIC_TINK_CLIENT_SECRET || "");
    params.append("code", code);
    params.append("grant_type", "authorization_code");

    const tokenResponse = await fetch(tokenUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
    });

    const tokenData = JSON.parse(await tokenResponse.text());
    const accessToken = tokenData.access_token;

    const listAccountsUrl = "https://api.tink.com/api/v1/accounts";
    const listAccountsResponse = await fetch(listAccountsUrl, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });
    console.log('List accounts response status:', listAccountsResponse.status);
    const rawListAccountsResponse = await listAccountsResponse.text(); 
    console.log('Raw list accounts response:', rawListAccountsResponse);
    const accountsData = JSON.parse(rawListAccountsResponse);
    return NextResponse.json(accountsData);

}