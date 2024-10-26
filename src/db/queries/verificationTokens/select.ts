import { eq } from "drizzle-orm";
import { db } from "../../drizzle";
import { SelectVerificationToken, verificationTokens } from "../../schema";

export async function getVerificationTokenByToken(
  token: string
): Promise<SelectVerificationToken | null> {
  try {
    const verificationToken = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.token, token))
      .limit(1);
    return verificationToken.length > 0 ? verificationToken[0] : null;
  } catch {
    return null;
  }
}

export async function getVerificationTokenByEmail(
  email: string
): Promise<SelectVerificationToken | null> {
  try {
    const verificationToken = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.email, email))
      .limit(1);
    return verificationToken.length > 0 ? verificationToken[0] : null;
  } catch {
    return null;
  }
}
