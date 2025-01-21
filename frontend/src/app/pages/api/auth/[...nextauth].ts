import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { sendVerificationRequest } from "./authSendRequest";
import GitHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import { TypeORMAdapter } from "@auth/typeorm-adapter";
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';
import { User } from '@/app/entities/User';
import { Session } from '@/app/entities/Session';
import { Account } from '@/app/entities/Account';


// Ensure environment variables are set
const apiKey = process.env.EMAIL_API_KEY ?? '';
const emailFrom = process.env.EMAIL_FROM ?? '';
const gitHubClientId = process.env.GITHUB_CLIENT_ID ?? '';
const gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET ?? '';

if (!apiKey || !emailFrom) {
  console.error("Missing EMAIL_API_KEY or EMAIL_FROM environment variable");
  process.exit(1);
}

//Connect to database using TypeORM
const connectToDatabase = async () => {
  try {
    const connectionOptions = await getConnectionOptions();
    return await createConnection({ ...connectionOptions, entities: [User, Session, Account]});
 
  } catch (error: any) {
    if (error.name === "AlreadyHasActiveConnectionError") {
      return getConnection();
  }
  throw error;
  }
};

//Default export, main handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDatabase();

    const emailProvider = EmailProvider({
      type: "email",
      maxAge: 60 * 60 * 24 * 7, // 24 hours * 7 days
      sendVerificationRequest: (params) => 
        sendVerificationRequest({
          ...params,
          apiKey,
          from: emailFrom,
        }),
    });

    const githubProvider = GitHubProvider({
      clientId: gitHubClientId,
      clientSecret: gitHubClientSecret,
    });

    const connectionOptions = await getConnectionOptions();
    return NextAuth(req, res, {
      adapter: TypeORMAdapter(connectionOptions),
      providers: [emailProvider, githubProvider],
      session: {
        strategy: "database",
      },
    });

  } catch (error) {
    console.error("Error in NextAuth handler:", error);
    res.status(500).send("Internal Server Error");
  }

};


