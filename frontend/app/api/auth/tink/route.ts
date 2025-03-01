import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Step 1: Authenticate using client credentials flow
    const authUrl = "https://api.tink.com/api/v1/oauth/token";
    const params = new URLSearchParams();
    params.append("client_id", process.env.NEXT_PUBLIC_TINK_CLIENT_ID || "");
    params.append("client_secret", process.env.NEXT_PUBLIC_TINK_CLIENT_SECRET || "");
    params.append("grant_type", "client_credentials");

    const authResponse = await fetch(authUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    // Log the raw response for debugging
    console.log("Authentication response status:", authResponse.status);
    const rawAuthResponse = await authResponse.text();
    console.log("Raw authentication response:", rawAuthResponse);

    if (!authResponse.ok) {
      throw new Error(`Failed to authenticate: ${rawAuthResponse}`);
    }

    // Parse the response as JSON
    const authData = JSON.parse(rawAuthResponse);
    const accessToken = authData.access_token;
    console.log("Access Token:", accessToken); // Log the access token

    // Step 2: Create an account for the user
    const createAccountUrl = "https://api.tink.com/api/v1/accounts/create";
    const accountResponse = await fetch(createAccountUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "ae03cef445df4676876838133cb3218e", 
        name: "Checking Account",
        type: "CHECKING",
        balance: {
          amount: 1000.0, // Initial balance
          currency: "GBP", // Currency
        },
      }),
    });

    // Log the raw response for debugging
    console.log("Create account response status:", accountResponse.status);
    const rawAccountResponse = await accountResponse.text();
    console.log("Raw create account response:", rawAccountResponse);

    if (!accountResponse.ok) {
      throw new Error(`Failed to create account: ${rawAccountResponse}`);
    }

    // Parse the response as JSON
    const accountData = JSON.parse(rawAccountResponse);
    console.log("Account created:", accountData);

    return NextResponse.json(accountData);
  } catch (error) {
    console.error("Failed to create account:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
        // "user_id" : "ae03cef445df4676876838133cb3218e",
        //"external_user_id" : "user_123_abc"


      