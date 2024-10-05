/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthConfig } from "next-auth";

export const authConfig = {
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account) {
        token.accessToken = account.access_token;
        token.email = user?.email;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Attach the accessToken from the token to the session object
      session.accessToken = token.accessToken as string;

      // Optionally, pass other data like email if it's stored in the JWT token
      session.user.email = token.email as string;

      return session;
    },
    // async redirect({ url, baseUrl }: any) {
    //   // Default redirect to the dashboard after login
    //   return url.startsWith(baseUrl) ? url : baseUrl + "/dashboard";
    // },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
