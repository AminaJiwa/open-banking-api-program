import axios from "axios";

export const getClientCredentialsToken = async () => {
    const tokenUrl = 'https://apisandbox-oauth2.openbankproject.com/hydra-public/oauth2/token';
    const clientId = process.env.OPENBANK_CLIENT_ID || "";
    const clientSecret = process.env.OPENBANK_CLIENT_SECRET || "";
  
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
  
    try {
      const response = await axios.post(tokenUrl, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      const accessToken = response.data.access_token;
      console.log('Client Credentials Token:', accessToken);
      return accessToken;
    } catch (error: any) {
      console.error('Failed to get client credentials token:', error.response?.data || error.message);
      throw error;
    }
  };

export const loginToOBP = async (username:string, password: string) => {
    const loginUrl = "https://apisandbox.openbankproject.com/my/logins/direct";
    const directLoginToken = await getClientCredentialsToken();
    
    try {
        const response = await axios.post(loginUrl, {
            username, 
            password,
            consumer_key: process.env.OPENBANK_CLIENT_ID || "",
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `DirectLogin token=${directLoginToken}`,
            },
        });

        const token = response.data.token;
        return token;
    } catch (error: any) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
    }
};