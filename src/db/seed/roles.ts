import { db } from "@/src/db/drizzle"; // Import your database instance
import { roles } from "@/src/db/schemas/roles"; // Import the roles schema

// Function to seed roles
export async function seedRoles() {
  const existingRoles = await db.select().from(roles);

  if (existingRoles.length > 0) {
    console.log("Roles already exist, skipping seeding...");
    return;
  }

  await db.insert(roles).values([{ roleType: "user" }, { roleType: "admin" }]);

  console.log("Roles seeded successfully!");
}
