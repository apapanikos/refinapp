import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  updatedAt: timestamp("updated_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
