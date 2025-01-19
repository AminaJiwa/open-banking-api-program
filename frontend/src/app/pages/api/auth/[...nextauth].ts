import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { Theme } from 'next-auth';
import { sendVerificationRequest } from "./authSendRequest";
import { EmailConfig } from 'next-auth/providers/email';
import EmailProvider from 'next-auth/providers/email';
import { TypeORMAdapter } from "@auth/typeorm-adapter";
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';
import { User } from '@/app/entities/User';
import { Session } from '@/app/entities/Session';
import { Account } from '@/app/entities/Account';

// Ensure environment variables are set
const apiKey = process.env.EMAIL_API_KEY ?? '';
const emailFrom = process.env.EMAIL_FROM ?? '';

if (!apiKey || !emailFrom) {
  throw new Error("Missing EMAIL_API_KEY or EMAIL_FROM environment variable");
}

const connectToDatabase = async () => {
  const connectionOptions = await getConnectionOptions();
  return createConnection({ ...connectionOptions, entities: [User, Session, Account]});
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const connection = await connectToDatabase();

  // Define the email provider with required parameters
const emailProvider = EmailProvider({
  type: "email",
  maxAge: 60 * 60 * 24, // 24 hours

  sendVerificationRequest: (params: {
    identifier: string;
    url: string;
    token: string;
    expires: Date; 
    provider: EmailConfig;
    theme: Theme;
  }) => sendVerificationRequest({
    ...params,
    apiKey,
    from: emailFrom,
    provider: {
      ...params.provider,
      sendVerificationRequest: () => {},
      options: {},
    },
  }),
});

const connectionOptions = await getConnectionOptions();
return NextAuth(req, res, {
  adapter: TypeORMAdapter(connectionOptions),
  providers: [emailProvider],
});
 
};


