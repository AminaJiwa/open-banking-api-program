import { NextResponse } from "next/server";

export async function GET() {
    try {
        //Authenticate using client credentials flow
        const authUrl = "https://api.tink.com/api/v1/oauth/token";
        const params = new URLSearchParams();
        params.append("client_id", process.env.TINK_CLIENT_ID || "");
        params.append("client_secret", process.env.TINK_CLIENT_SECRET || "");
        params.append("grant_type", "client_credentials");

        const authResponse = await fetch(authUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params,
        });

        const authData = JSON.parse(await authResponse.text());

        if (!authResponse.ok) {
            throw new Error(authData.error || "Failed to authenticate with Tink");
        }

        const accessToken = authData.access_token;

        //Create test account
        const listAccountsUrl = 'https://api.tink.com/api/v1/accounts/list';
        const listAccountsResponse = await fetch(`${listAccountsUrl}?user_id=ae03cef445df4676876838133cb3218e`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        // Log the raw response for debugging
        console.log('List accounts response status:', listAccountsResponse.status);
        const rawListAccountsResponse = await listAccountsResponse.text();
        console.log('Raw list accounts response:', rawListAccountsResponse);
        
        if (!listAccountsResponse.ok) {
          throw new Error(`Failed to fetch accounts: ${rawListAccountsResponse}`);
        }
        
        // Parse the response as JSON
        const accountsData = JSON.parse(rawListAccountsResponse);
        console.log('Accounts:', accountsData);
        // "user_id" : "ae03cef445df4676876838133cb3218e",
        //"external_user_id" : "user_123_abc"


        return NextResponse.json(accountsData);

    } catch (error: any) {
        console.error("Failed to log in to Tink:", error.response?.data || error.message);
        throw error;
    }
}