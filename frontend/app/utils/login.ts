// import OAuth from "oauth-1.0a";
// import crypto from "crypto";
// import axios from "axios";

// //OAuth 1.0a configuration
// const oauth = new OAuth({
//   consumer: {
//     key: process.env.OPENBANK_CLIENT_ID || "",
//     secret: process.env.OPENBANK_CLIENT_SECRET || "",
//   },
//   signature_method: "HMAC-SHA1",
//   hash_function: (baseString: string, key: string) => {
//     return crypto.createHmac("sha1", key).update(baseString).digest("base64");
//   },
// });

// export const getRequestToken = async () => {
//   const requestTokenUrl = "https://apisandbox.openbankproject.com/oauth/initiate";
//   const callbackUrl = "http://localhost:3000/api/auth/openbank/callback";

//   const requestData = {
//     url: requestTokenUrl,
//     method: "POST",
//     data: {
//       oauth_callback: callbackUrl,
//     }
//   };

//   const authHeader = oauth.toHeader(oauth.authorize(requestData));

//   try {
//     const response = await axios.post(requestTokenUrl, null, {
//       headers: {
//         Authorization: authHeader["Authorization"],
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       params: {
//         oauth_callback: callbackUrl,
//       }
//     });

//     const requestToken = response.data.oauth_token;
//     const requestTokenSecret = response.data.oauth_token_secret;
//     return { requestToken, requestTokenSecret };

//   } catch (error: any) {
//     console.error("Failed to get request token:", error.response?.data || error.message);
//     throw error;
    
//   }
// };

// export const getAccessToken = async (requestToken: string, requestTokenSecret: string) => {
//   const accessTokenUrl = "https://apisandbox.openbankproject.com/oauth/token";

//   const requestData = {
//     url: accessTokenUrl,
//     method: "POST",
//   };

//   const authHeader = oauth.toHeader(oauth.authorize(requestData, {
//     key: requestToken,
//     secret: requestTokenSecret,
//   }));

//   try {
//     const response = await axios.post(accessTokenUrl, null, {
//       headers: {
//         Authorization: authHeader["Authorization"],
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     });

//     const accessToken = response.data.oauth_token;
//     const accessTokenSecret = response.data.oauth_token_secret;
//     return { accessToken, accessTokenSecret };

//   } catch (error: any) {
//     console.error("Failed to get access token:", error.response?.data || error.message);
//     throw error;
//   }

// };

// export const loginToOBP = async () => {
//   try { 
//     const { requestToken, requestTokenSecret } = await getRequestToken();

//     const authUrl = `https://apisandbox.openbankproject.com/oauth/authorize?oauth_token=${requestToken}`;
//     console.log("Please authorize the token:", authUrl);

//     const { accessToken, accessTokenSecret } = await getAccessToken(requestToken, requestTokenSecret);

//     //Use access token to call open banking API
//     const apiUrl = "https://apisandbox.openbankproject.com/obp/v4.0.0/my/accounts";
//     const apiData = {
//       url: apiUrl,
//       method: "GET",
//     };

//     const apiAuthHeader = oauth.toHeader(oauth.authorize(apiData, {
//       key: accessToken,
//       secret: accessTokenSecret,
//     }));

//     const response = await axios.get(apiUrl, {
//       headers: {
//         Authorization: apiAuthHeader["Authorization"],
//       },
//     });
//     return response.data;
//     } catch (error: any) {
//       console.error("Failed to log in to OBP:", error.response?.data || error.message);
//       throw error;
//     }
//   }


