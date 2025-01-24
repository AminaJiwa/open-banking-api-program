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
        res.status(200).json(data);
        return res.redirect("/");
    } else {
        return res.redirect(`/pages/error?message=${encodeURIComponent(data.error_description || "OAuth exchange failed")}`);
    }
} catch(error: any) {
    return res.redirect(`/pages/error?message=${encodeURIComponent("Unexpected error occured")}`);
}
}