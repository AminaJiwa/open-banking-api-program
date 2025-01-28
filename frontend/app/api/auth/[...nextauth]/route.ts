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
        authorizationUrl: 'https://github.com/login/oauth/authorize?response_type=code',
        tokenUrl: 'https://github.com/login/oauth/access_token',
        userinfoUrl: 'https://api.github.com/user',
        redirectUrl: 'http://localhost:3000/api/auth/callback/github',
      }),
    ],
    callbacks: {
      async redirect({ url, baseUrl }) {
        console.log("Redirect URL:", url); 
        return baseUrl; 
      },
      async session({ session, token, user }) {
        console.log("Session:", session); 
        console.log("Token:", token); 
        console.log("User:", user); 
        return session;
      }
    },
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
