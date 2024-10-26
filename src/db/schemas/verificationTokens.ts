import { pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    id: serial("id").primaryKey(), // Auto-incrementing serial primary key
    email: text("email").notNull(), // Email as a text field
    token: text("token").notNull().unique(), // Token with unique constraint
    expires: timestamp("expires").notNull(), // Expiration timestamp
  },
  (table) => ({
    uniqueTokenEmail: unique().on(table.email, table.token), // Composite unique constraint
  })
);

export type InsertVerificationToken = typeof verificationTokens.$inferInsert;
export type SelectVerificationToken = typeof verificationTokens.$inferSelect;
