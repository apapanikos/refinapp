import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { transactions } from "./transactions";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions), // One category can have many transactions
}));

export type InsertCategories = typeof categories.$inferInsert;
export type SelectCategories = typeof categories.$inferSelect;
