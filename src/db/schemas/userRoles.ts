import { pgTable, integer } from "drizzle-orm/pg-core";
import { users } from "@/db/schemas/users";
import { roles } from "@/db/schemas/roles";

export const userRoles = pgTable("user_roles", {
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(), // FK to users table
  roleId: integer("role_id")
    .references(() => roles.id)
    .notNull(), // FK to roles table
});

export type InsertUserRole = typeof userRoles.$inferInsert;
export type SelectUserRole = typeof userRoles.$inferSelect;
