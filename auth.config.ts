/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthConfig } from "next-auth";
import { getUserById } from "@/src/db/queries/users/select";

export const authConfig = {
  callbacks: {
    // authorized: async ({ auth, request: { nextUrl } }) => {
    //   const isLoggedIn = !!auth?.user;
    //   const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
    //   if (isOnDashboard) {
    //     if (isLoggedIn) return true;
    //     return false; // Redirect unauthenticated users to login page
    //   } else if (isLoggedIn) {
    //     return Response.redirect(new URL("/dashboard", nextUrl));
    //   }
    //   return true;
    // },
    async jwt({ token }: any) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser || existingUser.length === 0) return token;

      token.role = existingUser[0].roleId;
    },
    async session({ session, token }: any) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.roleId = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }: any) {
      // Default redirect to the dashboard after login
      return url.startsWith(baseUrl) ? url : baseUrl + "/dashboard";
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
