"use server";

import { SignupFormSchema } from "@/src/lib/definitions";
import { signIn } from "../../../auth";
import { AuthError } from "next-auth";
import { SignInSchema, SignUpSchema } from "@/src/lib/zod/auth";
import * as z from "zod";
import { hashPassword } from "@/src/lib/auth/utils";
import { getUserByEmail } from "@/src/db/queries/users/select";
import { createUser } from "@/src/db/queries/users/insert";
// import { revalidatePath, revalidateTag } from "next/cache";

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

  return { success: "User created!" };
}

export async function signin(values: z.infer<typeof SignInSchema>) {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    await signIn("credentials", values);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
  return { success: "Email sent!" };
}
