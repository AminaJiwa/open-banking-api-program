import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.CLIENT_ID_GITHUB || "",
      clientSecret: process.env.CLIENT_SECRET_GITHUB || "",
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log("Redirecting to:", url);
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  debug: true,
});

export { handler as GET, handler as POST };