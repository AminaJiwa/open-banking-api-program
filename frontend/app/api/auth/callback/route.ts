import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

//https://docs.tink.com/resources/money-manager/money-manager-api/access-token-money-manager
export async function GET(request: NextRequest) {
  try {
    // Step 1: Extract the authorization code from the query parameters
    const code = request.nextUrl.searchParams.get("code");
    if (!code) {
      throw new Error("Authorization code not found in the callback URL.");
    }

    console.log("Authorization code:", code);

    // Step 2: Exchange the authorization code for a user access token
    const tokenUrl = "https://api.tink.com/api/v1/oauth/token";
    const params = new URLSearchParams();
    params.append("client_id", process.env.NEXT_PUBLIC_TINK_CLIENT_ID || "");
    params.append("client_secret", process.env.NEXT_PUBLIC_TINK_CLIENT_SECRET || "");
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.NEXT_PUBLIC_TINK_REDIRECT_URI || "");

    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    // Log the raw response for debugging
    console.log("Token response status:", tokenResponse.status);
    const rawTokenResponse = await tokenResponse.text();
    console.log("Raw token response:", rawTokenResponse);

    if (!tokenResponse.ok) {
      throw new Error(`Failed to exchange code for token: ${rawTokenResponse}`);
    }

    // Step 3: Parse the response to get the user access token
    const tokenData = JSON.parse(rawTokenResponse);
    const userAccessToken = tokenData.access_token;
    console.log("User Access Token:", userAccessToken);

    // Step 4: Use the user access token to fetch user data (e.g., accounts)
    const transactionsUrl = "https://api.tink.com/api/v1/transactions";
const transactionsResponse = await fetch(transactionsUrl, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${userAccessToken}`,
    "Content-Type": "application/json",
  },
});

if (!transactionsResponse.ok) {
  throw new Error("Failed to fetch transactions");
}

const transactionsData = await transactionsResponse.json();
console.log("Transactions Data:", transactionsData);

    // Log the raw response for debugging
    console.log("Accounts response status:", transactionsResponse.status);
    const rawAccountsResponse = await transactionsResponse.text();
    console.log("Raw accounts response:", rawAccountsResponse);

    if (!transactionsResponse.ok) {
      throw new Error(`Failed to fetch accounts: ${rawAccountsResponse}`);
    }

    // Step 5: Parse the accounts data
    const accountsData = JSON.parse(rawAccountsResponse);
    console.log("Accounts data:", accountsData);

    // Step 6: Return the accounts data to the frontend
    return NextResponse.json(accountsData);
  } catch (error) {
    console.error("Error in callback route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}