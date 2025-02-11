import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code, state } = req.query;

    if (!code) {
        return res.status(400).json({ error: "Authorisation code not found"});
    }
    //Exchange code for access token
    const redirectUri = 'http://localhost:3000/api/auth/openbank/callback';
    const tokenUrl = 'https://apisandbox-oauth2.openbankproject.com/hydra-public/oauth2/token';

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code as string);
    params.append("redirect_uri", redirectUri);
    params.append("client_id", process.env.OPENBANK_CLIENT_ID || "");
    params.append("client_secret", process.env.OPENBANK_CLIENT_SECRET || "");

    try {
        const tokenResponse = await axios.post(tokenUrl, params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const accessToken = tokenResponse.data.access_token;

        //Call open banking API
        const apiResponse = await callApi(accessToken);

        res.status(200).json(apiResponse.data);
    } catch (error: any) {
        console.error("Token Error:", error.response?.data || error.message);
        res.status(500).json({error: "Failed to exchange code for access token."});
    }
}

const callApi = async (accessToken: string) => {
    const apiUrl = 'https://apisandbox.openbankproject.com/obp/v4.0.0/my/accounts';

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response;
    } catch (error: any) {
        console.error("Api Error:", error.response?.data || error.message);
        throw error;
    } 
};
