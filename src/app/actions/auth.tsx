"use server";

import { SignupFormSchema } from "@/src/lib/definitions";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { SignInSchema, SignUpSchema } from "@/src/lib/zod/auth";
import * as z from "zod";
import { hashPassword } from "@/src/lib/auth/utils";
import { getUserByEmail } from "@/src/db/queries/users/select";
import { createUser } from "@/src/db/queries/users/insert";
import { generateVerificationToken } from "@/src/lib/auth/tokens";
import { sendVerificationEmail } from "@/src/lib/mail";

export async function signup(values: z.infer<typeof SignUpSchema>) {
  const validatedFields = SignupFormSchema.safeParse(values);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error: Object.values(fieldErrors).flat().join(", "),
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await hashPassword(password);

  const existingUser = await getUserByEmail(email);

  if (!!existingUser && existingUser?.length > 0) {
    return { error: "User already exists." };
  }

  await createUser({ name, email, password: hashedPassword });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
}

export async function signin(values: z.infer<typeof SignInSchema>) {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const existingUser = await getUserByEmail(values.email);

  if (
    !existingUser ||
    existingUser.length === 0 ||
    !existingUser[0]?.email ||
    !existingUser[0]?.password
  ) {
    return { error: "Email does not exists!" };
  }

  if (!existingUser[0].emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser[0]?.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", values);
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        case "OAuthAccountNotLinked":
          return { error: "Account not linked." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
  return { success: "Email sent!" };
}

export async function authenticateWithProvider(provider: string) {
  await signIn(provider);
}

export async function signout() {
  await signOut();
}
