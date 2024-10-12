import { db } from "@/src/db/drizzle";
import { eq } from "drizzle-orm";
import { SelectUser, users } from "@/src/db/schemas/users";

export async function deleteUser(id: SelectUser["id"]) {
  await db.delete(users).where(eq(users.id, id));
}
