// /* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "@/src/db/drizzle";
import { accounts, users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword } from "@/src/lib/auth/utils";
import { ZodError } from "zod";
import { SignInSchema } from "@/src/lib/zod/auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { User } from "@/src/lib/definitions";

async function getUser(email: string): Promise<User | null> {
  try {
    const userArr = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return userArr.length > 0 ? (userArr[0] as User) : null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
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

          const user = await getUser(email);

          if (!user) {
            throw new Error("User not found.");
          }

          const passwordsMatch = await verifyPassword(password, user.password);
          if (!passwordsMatch) {
            return null;
          }
          return user;
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
