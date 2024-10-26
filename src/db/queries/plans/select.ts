import { eq } from "drizzle-orm";
import { db } from "@/src/db/drizzle";
import { plans, SelectPlan } from "@/src/db/schema";

export async function getPlanIdByName(
  name: SelectPlan["planName"]
): Promise<number | null> {
  try {
    const plan = await db
      .select()
      .from(plans)
      .where(eq(plans.planName, name))
      .limit(1);
    return plan.length > 0 ? plan.map((p) => p.id)[0] : null;
  } catch {
    return null;
  }
}
