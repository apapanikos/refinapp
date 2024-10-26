import { eq } from "drizzle-orm";
import { db } from "../../drizzle";
import { roles } from "../../schema";

// export async function getAllRoles(): Promise<Array<RoleType>> {
//   return db.select().from(roles);
// }

export async function getDefaultRole(): Promise<string | null> {
  try {
    const defaultRole = await db
      .select()
      .from(roles)
      .where(eq(roles.roleType, "basic_user"))
      .limit(1);
    return defaultRole.length > 0 ? defaultRole[0].roleType : null;
  } catch {
    return null;
  }
}

export async function getRoleById(id: number): Promise<string | null> {
  try {
    const role = await db.select().from(roles).where(eq(roles.id, id)).limit(1);
    return role.length > 0 ? role[0].roleType : null;
  } catch {
    return null;
  }
}

export async function getRoleId(roleType: string): Promise<number | null> {
  try {
    const role = await db
      .select()
      .from(roles)
      .where(eq(roles.roleType, roleType))
      .limit(1);
    return role.length > 0 ? role[0].id : null;
  } catch {
    return null;
  }
}
