import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { roles } from "@/src/db/schemas/roles";
import { transactions } from "@/src/db/schemas/transactions";
import { goals } from "@/src/db/schemas/goals";
import { accounts } from "@/src/db/schemas/accounts";
import { plans } from "@/src/db/schemas/plans";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  password: text("password"),
  roleId: serial("role_id")
    .references(() => roles.id)
    .notNull(), // Reference to roles table
  planId: serial("plan_id").references(() => plans.id), // Reference to the plan table
  updatedAt: timestamp("updated_at"),
  createdAt: timestamp("created_at").defaultNow(),
  image: text("image"),
});

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
  roleId: z.number().min(1),
  planId: z.number().min(1),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  transactions: many(transactions), // One user can have many transactions
  goals: many(goals), // One user can have many goals
  accounts: many(accounts), // One user can have many accounts
}));

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
