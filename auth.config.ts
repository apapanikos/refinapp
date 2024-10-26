/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthConfig } from "next-auth";
import { updateUser } from "@/src/db/queries/users/update";
import { getUserById } from "./src/db/queries/users/select";
import { getDefaultUserSettings } from "./src/lib/auth/utils";
import { createUser } from "./src/db/queries/users/insert";

export const authConfig = {
  events: {
    async linkAccount({ user }: any) {
      if (!user) return;
      await updateUser(user.id, { emailVerified: new Date() });
    },
  },
  pages: {
    error: "/auth/error",
  },
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
    async signIn({ user, account }: any) {
      // if (!user) return false;
      // try {
      //   const existingUser = await getUserById(user.id);
      //   if (!existingUser || existingUser.length === 0) {
      //     await createUser({
      //       email: user.email,
      //       name: user.name,
      //       emailVerified: new Date(),
      //     });
      //   }
      //   return true;
      // } catch (error) {
      //   console.error("Error during signIn callback:", error);
      //   return false;
      // }
      // if (!user || !user?.emailVerified) {
      //   return false;
      // }
      // return true;

      // Allow OAuth without email verification
      if (account.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user.id);

      if (!existingUser || !existingUser[0]?.emailVerified) {
        return false;
      }
    },
    async jwt({ token, user }: any) {
      if (!token.sub) return token;

      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.image = user.image;
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    // async redirect({ url, baseUrl }: any) {
    //   // Default redirect to the dashboard after login
    //   return url.startsWith(baseUrl) ? url : baseUrl + "/dashboard";
    // },
  },
  providers: [],
} satisfies NextAuthConfig;
