// /* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { type DefaultSession } from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "@/src/db/drizzle";
import { accounts, users } from "@/src/db/schema";
import { verifyPassword } from "@/src/lib/auth/utils";
import { ZodError } from "zod";
import { SignInSchema } from "@/src/lib/zod/auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getUserByEmail } from "./src/db/queries/users/select";
import { getRoleById } from "./src/db/queries/roles/select";

export type ExtendedUser = DefaultSession["user"] & {
  role: "user" | "admin";
  emailVerified: boolean;
};

declare module "@auth/core" {
  interface Session {
    user: ExtendedUser;
  }

  interface SignIn {
    user: ExtendedUser;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60, // 2 days
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const validatedFields = SignInSchema.safeParse(credentials);

          if (!validatedFields.success) {
            return null;
          }

          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || user.length === 0) {
            throw new Error("User not found.");
          }

          if (!user[0].password) {
            throw new Error(
              "User does not have a password. Please sign in with your OAuth provider."
            );
          }

          const passwordsMatch = await verifyPassword(
            password,
            user[0].password
          );

          if (!passwordsMatch) {
            return null;
          }

          const role = await getRoleById(user[0].roleId);
          console.log("role", role);

          return {
            ...user[0],
            role,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],
});
