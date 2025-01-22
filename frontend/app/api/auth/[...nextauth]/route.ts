import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // Handle GET request
  return NextAuth(req, res, {
    providers: [
      GitHubProvider({
        clientId: process.env.CLIENT_ID_GITHUB || '',
        clientSecret: process.env.CLIENT_SECRET_GITHUB || '',
        // @ts-ignore
        scope: 'read:user',
      }),
    ],
    secret: process.env.AUTH_SECRET,
    session: {
      strategy: 'jwt',
    },
    jwt: {
      secret: process.env.AUTH_SECRET,
    },
    pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout',
      error: '/auth/error',
    },
    debug: true,
  });
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // Handle POST request 
  return NextAuth(req, res, {
    providers: [
      GitHubProvider({
        clientId: process.env.CLIENT_ID_GITHUB || '',
        clientSecret: process.env.CLIENT_SECRET_GITHUB || '',
        // @ts-ignore
        scope: 'read:user',
      }),
    ],
    secret: process.env.AUTH_SECRET,
    session: {
      strategy: 'jwt',
    },
    jwt: {
      secret: process.env.AUTH_SECRET,
    },
    pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout',
      error: '/auth/error',
    },
    debug: true,
  });
}
