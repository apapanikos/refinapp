import { db } from "@/src/db/drizzle";
import { plans } from "@/src/db/schema";

export async function seedPlans() {
  const existingPlans = await db.select().from(plans);

  if (existingPlans.length > 0) {
    console.log("Plans already exist, skipping seeding...");
    return;
  }

  await db.insert(plans).values([
    { planName: "basic", features: "Basic features", price: "Free" },
    { planName: "premium", features: "Premium features", price: "$20/month" },
    {
      planName: "enterprise",
      features: "Enterprise features",
      price: "$50/month",
    },
  ]);

  console.log("Plans seeded successfully!");
}
