import { sql } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { z } from "zod";

export type RoleType = (typeof allowedRoles)[number];

export const allowedRoles = [
  "basic_user",
  "premium_user",
  "enterprise_user",
  "admin",
] as const;
export const roleSchema = z.enum(allowedRoles);

export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  roleType: text("role_type")
    .notNull()
    .unique()
    .default(sql`'basic_user'`),
});

export type InsertRole = typeof roles.$inferInsert;
export type SelectRole = typeof roles.$inferSelect;
