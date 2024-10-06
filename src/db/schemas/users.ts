import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { transactions } from "./transactions";
import { goals } from "./goals";
import { userRoles } from "./userRoles";
import { accounts } from "./accounts";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  password: text("password"),
  updatedAt: timestamp("updated_at"),
  createdAt: timestamp("created_at").defaultNow(),
  image: text("image"),
});

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
});

export const usersRelations = relations(users, ({ many }) => ({
  transactions: many(transactions), // One user can have many transactions
  goals: many(goals), // One user can have many goals
  roles: many(userRoles), // One user can have many roles through the userRoles junction table
  accounts: many(accounts),
}));

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
