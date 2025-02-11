import { NextResponse } from "next/server";

export async function GET() {
    const clientId = process.env.OPENBANK_CLIENT_ID || "";
    const redirectUri = encodeURIComponent("http://localhost:3000/api/auth/openbank/callback");
    const state = Math.random().toString(36).substring(7);
    const scope = "openid offline ReadAccountsBasic ReadAccountsDetail ReadBalances ReadTransactionsBasic ReadTransactionsDebits ReadTransactionsDetail";

    const authUrl = `https://apisandbox-oauth2.openbankproject.com/hydra-public/oauth2/auth?client_id=${clientId}&response_type=code&state=${state}&scope=${scope}&redirect_uri=${redirectUri}`;

    //redirect user to auth url
    return NextResponse.redirect(authUrl);
}