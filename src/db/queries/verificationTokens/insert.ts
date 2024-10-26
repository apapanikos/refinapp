import { db } from "@/src/db/drizzle";
import {
  InsertVerificationToken,
  verificationTokens,
} from "@/src/db/schemas/verificationTokens";

export async function insertVerificationToken({
  email,
  token,
  expires,
}: InsertVerificationToken): Promise<{
  email: string;
  token: string;
  expires: Date;
}> {
  await db.insert(verificationTokens).values({
    email,
    token,
    expires,
  });
  return { email, token, expires };
}
