import NextAuth from 'next-auth';
import { sendVerificationRequest } from "/authSendRequest";
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'your-email@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Here you should validate the credentials and return the user object or null
        const user = { id: 1, name: 'John Doe', email: 'john.doe@example.com' }; // Replace with your validation logic
        return user ? user : null;
      }
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
        }
      }
    }),
  ],
  database: process.env.DATABASE_URL, // Replace with your database URL
  callbacks: {
    async session(session, user) {
      session.user.id = user.id;
      return session;
    },
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: null // New users will be redirected here after being created
  },
  secret: process.env.SECRET
});
