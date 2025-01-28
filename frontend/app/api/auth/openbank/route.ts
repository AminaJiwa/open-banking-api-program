import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Handle POST request
    const { code } = req.query;
    

    if (!code) {
        return res.status(400).json({ error: "Missing authorisation code"});
    }

    try {
    //Exchange the authorisation code for an access token
    const response = await fetch("https://sandbox.openbankproject.com/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: process.env.OPENBANK_CLIENT_ID || "",
            client_secret: process.env.OPENBANK_CLIENT_SECRET || "",
            code: code.toString(),
            redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/openbank`,
            grant_type: "authorization_code",
        }),
    });

    const data = await response.json();

    if (response.ok) {
        const accessToken = data.access_token;
        //Fetch data from Open Bank API
        const openBankDataResponse = await fetch("https://sandbox.openbankproject.com/obp/v4.0.0/banks", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const openBankData = await openBankDataResponse.json();

        if(!openBankDataResponse.ok) {
            return res.redirect(`/pages/error?message=${encodeURIComponent(openBankData.error_description || "Failed to fetch Open Bank data")}`);
        }
        //Redirect to dashboard on home page
        return res.redirect(`/pages/dashboard?banks=${encodeURIComponent(JSON.stringify(openBankData.banks))}`);
    } else {
        return res.redirect(`/pages/error?message=${encodeURIComponent(data.error_description || "OAuth exchange failed")}`);
    }
} catch(error: any) {
    console.error("Error:", error);
    return res.redirect(`/pages/error?message=${encodeURIComponent("Unexpected error occured")}`);
}
}