import { db } from "@/src/db/drizzle";
import { InsertUser, users, userSchema } from "@/src/db/schemas/users";
import { getDefaultUserSettings } from "@/src/lib/auth/utils";

export async function createUser(data: InsertUser) {
  const { defaultRoleId, defaultPlanId } = await getDefaultUserSettings();

  const parsedDataWithRoleAndPlan = userSchema.parse({
    ...data,
    roleId: defaultRoleId,
    planId: defaultPlanId,
  });

  await db.insert(users).values(parsedDataWithRoleAndPlan);
}
