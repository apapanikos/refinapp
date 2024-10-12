import { db } from "@/src/db/drizzle";
import { InsertUser, users, userSchema } from "@/src/db/schemas/users";

export async function createUser(data: InsertUser) {
  // Validate the request body using Zod
  const parsedData = userSchema.parse(data);
  await db.insert(users).values(parsedData);
}
