import { NextResponse } from "next/server";
import { loginToOBP } from "../../../utils/login";

export async function GET() {

    const username = "katja.fi.29@example.com";
    const password = "ca0317";

    try {
        const token = await loginToOBP(username, password);
        const clientId = process.env.OPENBANK_CLIENT_ID || "";
        const redirectUri = encodeURIComponent("http://localhost:3000/api/auth/openbank/callback");
        const state = process.env.AUTH_SECRET || "";
        const scope = "openid offline ReadAccountsBasic ReadAccountsDetail ReadBalances ReadTransactionsBasic ReadTransactionsDebits ReadTransactionsDetail";

        const authUrl = `https://apisandbox-oauth2.openbankproject.com/hydra-public/oauth2/auth?client_id=${clientId}&response_type=code&state=${state}&scope=${scope}&redirect_uri=${redirectUri}`;

        //redirect user to auth url
        return NextResponse.redirect(authUrl);
    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to log in or initiate OAuth flow." }, { status: 500 });
    }

    
}