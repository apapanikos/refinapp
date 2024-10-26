import { db } from "@/src/db/drizzle";
import { eq } from "drizzle-orm";
import {
  SelectVerificationToken,
  verificationTokens,
} from "@/src/db/schemas/verificationTokens";

export async function deleteVerificationTokenByTokenId(
  id: SelectVerificationToken["id"]
) {
  await db.delete(verificationTokens).where(eq(verificationTokens.id, id));
}
