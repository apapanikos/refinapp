import {
  pgTable,
  serial,
  integer,
  text,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { z } from "zod";

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  amount: numeric("amount").notNull(),
  type: text("type").notNull(), // Could be 'income' or 'expense'
  categoryId: integer("category_id"), // Optional: link to category
  createdAt: timestamp("created_at").defaultNow(),
});

export const transactionSchema = z.object({
  userId: z.number().positive(),
  amount: z.number().positive(),
  type: z.enum(["income", "expense"]),
});

export type InsertTransaction = typeof transactions.$inferInsert;
export type SelectTransaction = typeof transactions.$inferSelect;
