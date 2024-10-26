import { getPlanIdByName } from "@/src/db/queries/plans/select";
import { getRoleId } from "@/src/db/queries/roles/select";
import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}

export async function getDefaultUserSettings() {
  const defaultRoleId = await getRoleId("user"); // Default role "user"
  const defaultPlanId = await getPlanIdByName("basic"); // Default plan "basic"

  return { defaultRoleId, defaultPlanId };
}
