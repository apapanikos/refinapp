import { seedRoles } from "@/src/db/seed/roles";
import { seedPlans } from "@/src/db/seed/plans";

async function runSeed() {
  await seedRoles();
  await seedPlans();
  console.log("Seeding complete.");
  process.exit();
}

runSeed();
