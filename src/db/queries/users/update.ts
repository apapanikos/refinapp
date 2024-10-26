import { db } from "@/src/db/drizzle";
import { eq } from "drizzle-orm";
import { SelectUser, users } from "@/src/db/schemas/users";
import { User } from "@/src/lib/definitions";

export async function updateUser(
  id: SelectUser["id"],
  data: Partial<User>
): Promise<void> {
  await db
    .update(users)
    .set({ ...data })
    .where(eq(users.id, id));
}
