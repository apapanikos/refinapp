import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { SelectUser, users } from "@/db/schemas/users";

export async function getAllUsers(): Promise<
  Array<{
    id: number;
    name: string;
    email: string;
    password: string | null;
    updatedAt: Date | null;
    createdAt: Date | null;
  }>
> {
  return db.select().from(users);
}

export async function getUserById(id: SelectUser["id"]): Promise<
  Array<{
    id: number;
    name: string;
    email: string;
    password: string | null;
    updatedAt: Date | null;
    createdAt: Date | null;
  }>
> {
  return db.select().from(users).where(eq(users.id, id));
}
