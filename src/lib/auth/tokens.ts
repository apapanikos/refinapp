import { deleteVerificationTokenByTokenId } from "@/src/db/queries/verificationTokens/delete";
import { insertVerificationToken } from "@/src/db/queries/verificationTokens/insert";
import { getVerificationTokenByEmail } from "@/src/db/queries/verificationTokens/select";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const existingVerificationToken = await getVerificationTokenByEmail(email);

  if (existingVerificationToken) {
    await deleteVerificationTokenByTokenId(existingVerificationToken.id);
  }

  const verificationToken = await insertVerificationToken({
    email,
    token,
    expires,
  });

  return verificationToken;
};
