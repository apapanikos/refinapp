import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  planName: text("plan_name").notNull().unique(),
  features: text("features"), // You can store the features in JSON or a separate table
  price: text("price"), // Store price details
});
