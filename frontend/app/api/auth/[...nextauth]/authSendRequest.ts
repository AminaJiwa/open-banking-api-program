// import { SendVerificationRequestParams } from "next-auth/providers/email";

// //Main function for sending an email with a link for user verification
// export async function sendVerificationRequest(
//   params: SendVerificationRequestParams & { apiKey: string, from: string}
// ): Promise<void> {
//     const { identifier: to, url, apiKey, from, expires } = params;
//     const { host } = new URL(url);

//     //For debugging 
//     if (process.env.NODE_ENV === "development") {
//       console.log("Sending verification email:", { to, url, host });
//     }

//     //API request
//     const res = await fetch("https://api.resend.com/emails", {
//         method: "POST",
//         headers: {
//             Authorization: `Bearer ${apiKey}`, 
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             from: from, 
//             to,
//             subject: `Sign in to ${host}`,
//             html: html({ url, host }),
//             text: text({ url, host, expires}),
//         }),
//     });

//     if (!res.ok) {
//       const errorBody = await res.json();
//         throw new Error(
//           `Resend error: ${res.status} ${res.statusText} - ${JSON.stringify(errorBody, null, 2)}`
//         );
//     }
// }

// function html(params: { url: string, host: string}): string {
//     const { url, host } = params;

//     const escapedHost = escapeHtml(host);

//     const brandColor = "#053b48";
//     const color = {
//         background: "#f9f9f9",
//         text: "#444",
//         mainBackground: "#fff",
//         buttonBackground: brandColor,
//         buttonBorder: brandColor,
//         buttonText: "#fff",
//     }

//     return `
//     <body style="background: ${color.background};">
//       <table width="100%" border="0" cellspacing="20" cellpadding="0"
//         style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
//         <tr>
//           <td align="center"
//             style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
//             Sign in to <strong>${escapedHost}</strong>
//           </td>
//         </tr>
//         <tr>
//           <td align="center" style="padding: 20px 0;">
//             <table border="0" cellspacing="0" cellpadding="0">
//               <tr>
//                 <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
//                     target="_blank"
//                     style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
//                     in</a></td>
//               </tr>
//             </table>
//           </td>
//         </tr>
//         <tr>
//           <td align="center"
//             style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
//             If you did not request this email you can safely ignore it.
//           </td>
//         </tr>
//       </table>
//     </body>
//     `;
// }

// function text(params: { url: string, host: string, expires: Date}): string {
//     const { url, host, expires } = params;
//     return `
//     <p>The link will expire on ${expires.toUTCString()}.</p>
//     Sign in to ${host} by clicking on the following link: ${url}
//     `;
// }

// //Escapes special characters in host string to prevent HTML injection attacks 
// function escapeHtml(string: string): string {
//   return string
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");
// }


//ROUTE.TS
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
// import { sendVerificationRequest } from "./authSendRequest";
import GitHubProvider from 'next-auth/providers/github';
// import EmailProvider from 'next-auth/providers/email';
// import { TypeORMAdapter } from "@auth/typeorm-adapter";
// import { createConnection, getConnection, getConnectionOptions } from 'typeorm';
// import { User } from '@/app/entities/User';
// import { Session } from '@/app/entities/Session';
// import { Account } from '@/app/entities/Account';

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      // @ts-ignore
      scope: "read:user",
    })
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.AUTH_SECRET,
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  debug: true
})

// Ensure environment variables are set
// const apiKey = process.env.EMAIL_API_KEY ?? '';
// const emailFrom = process.env.EMAIL_FROM ?? '';
// const gitHubClientId = process.env.GITHUB_CLIENT_ID ?? '';
// const gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET ?? '';

// if (!apiKey || !emailFrom) {
//   console.error("Missing EMAIL_API_KEY or EMAIL_FROM environment variable");
//   process.exit(1);
// }

// //Connect to database using TypeORM
// const connectToDatabase = async () => {
//   try {
//     return await createConnection({ 
//         type: "mysql",
//         host: process.env.DB_HOST || "localhost",
//         port: parseInt(process.env.DB_PORT || "3306", 10),
//         username: process.env.DB_USER || "root",
//         password: process.env.DB_PASSWORD || "",
//         database: process.env.DB_NAME || "nextauth",
//         entities: [User, Session, Account],
//         synchronize: true
//     });
 
//   } catch (error: any) {
//     if (error.name === "AlreadyHasActiveConnectionError") {
//       return getConnection();
//   }
//   throw error;
//   }
// };

// //Default export, main handler
// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     await connectToDatabase();

//     const emailProvider = EmailProvider({
//       type: "email",
//       maxAge: 60 * 60 * 24 * 7, // 24 hours * 7 days
//       sendVerificationRequest: (params) => 
//         sendVerificationRequest({
//           ...params,
//           apiKey,
//           from: emailFrom,
//         }),
//     });

//     const githubProvider = GitHubProvider({
//       clientId: gitHubClientId,
//       clientSecret: gitHubClientSecret,
//     });
    

//     const connectionOptions = await getConnectionOptions();
//     return NextAuth(req, res, {
//       adapter: TypeORMAdapter(connectionOptions),
//       providers: [emailProvider, githubProvider],
//       secret: process.env.AUTH_SECRET,
//       session: {
//         strategy: "database",
//       },
//     });

//   } catch (error) {
//     console.error("Error in NextAuth handler:", error);
//     res.status(500).send("Internal Server Error");
//   }

// };


