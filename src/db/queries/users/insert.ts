import { db } from "@/db/drizzle";
import { InsertUser, users } from "@/db/schemas/users";

export async function createUser(data: InsertUser) {
  await db.insert(users).values(data);
}
