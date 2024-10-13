import { eq } from "drizzle-orm";
import { db } from "@/src/db/drizzle";
import { SelectUser, users } from "@/src/db/schemas/users";
import { User } from "@/src/lib/definitions";

export async function getAllUsers(): Promise<Array<User>> {
  return db.select().from(users);
}

export async function getUserByEmail(
  email: SelectUser["email"]
): Promise<Array<User> | null> {
  try {
    const user = db.select().from(users).where(eq(users.email, email)).limit(1);
    return user;
  } catch {
    return null;
  }
}

export async function getUserById(
  id: SelectUser["id"]
): Promise<Array<User> | null> {
  try {
    const user = db.select().from(users).where(eq(users.id, id));
    return user;
  } catch {
    return null;
  }
}
