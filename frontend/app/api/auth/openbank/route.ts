import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
    }

    try {
        // Exchange the authorization code for an access token
        const response = await fetch("https://sandbox.openbankproject.com/oauth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: process.env.OPENBANK_CLIENT_ID || "",
                client_secret: process.env.OPENBANK_CLIENT_SECRET || "",
                code,
                redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/openbank`,
                grant_type: "authorization_code",
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: data.error_description || "OAuth exchange failed" }, { status: 500 });
        }

        const accessToken = data.access_token;

        // Fetch banks data
        const openBankDataResponse = await fetch("https://sandbox.openbankproject.com/obp/v4.0.0/banks", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const openBankData = await openBankDataResponse.json();

        if (!openBankDataResponse.ok) {
            return NextResponse.json({ error: openBankData.error_description || "Failed to fetch Open Bank data" }, { status: 500 });
        }

        return NextResponse.json({ banks: openBankData.banks });
    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Unexpected error occurred" }, { status: 500 });
    }
}
