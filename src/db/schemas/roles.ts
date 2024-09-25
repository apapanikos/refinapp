import { relations, sql } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { z } from "zod";
import { userRoles } from "./userRoles";

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

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(userRoles), // Each role can have many users through userRoles
}));

export type InsertRole = typeof roles.$inferInsert;
export type SelectRole = typeof roles.$inferSelect;
