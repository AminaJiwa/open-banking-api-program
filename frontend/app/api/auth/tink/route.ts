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

        //Create test user
        const createUserUrl = "https://api.tink.com/api/v1/user/create";
        const userResponse = await fetch(createUserUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "external_user_id": "user_123_abc",
                "locale": "en_US",
                "market": "GB",
                "retention_class": "permanent"
            }),
        });

        console.log('User creation response status:', userResponse.status);
        const rawUserResponse = await userResponse.text();
        console.log('Raw user creation response:', rawUserResponse);

        // Now try to parse the response as JSON
        const userData = JSON.parse(rawUserResponse);

        if (!userResponse.ok) {
            throw new Error(userData.error || "Failed to create user with Tink");
        }

        return NextResponse.json(userData);

    } catch (error: any) {
        console.error("Failed to log in to Tink:", error.response?.data || error.message);
        throw error;
    }
}