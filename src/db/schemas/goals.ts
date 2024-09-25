import { pgTable, serial, integer, text, numeric } from "drizzle-orm/pg-core";
import { users } from "./users";
import { sql } from "drizzle-orm";
import { z } from "zod";

export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  goalName: text("goal_name").notNull(),
  targetAmount: numeric("target_amount").notNull(),
  currentAmount: numeric("current_amount").default(sql`0`),
});

export const goalSchema = z.object({
  userId: z.number().positive(),
  goalName: z.string().min(1),
  targetAmount: z.number().positive(),
  currentAmount: z.number().min(0).default(0),
});

export type InsertGoal = typeof goals.$inferInsert;
export type SelectGoal = typeof goals.$inferSelect;
