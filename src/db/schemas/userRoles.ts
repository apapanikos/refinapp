import { pgTable, integer } from "drizzle-orm/pg-core";
import { users } from "@/db/schemas/users";
import { roles } from "@/db/schemas/roles";
import { relations } from "drizzle-orm";

export const userRoles = pgTable("user_roles", {
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(), // FK to users table
  roleId: integer("role_id")
    .references(() => roles.id)
    .notNull(), // FK to roles table
});

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }), // Each userRole entry belongs to a user

  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }), // Each userRole entry belongs to a role
}));

export type InsertUserRole = typeof userRoles.$inferInsert;
export type SelectUserRole = typeof userRoles.$inferSelect;
