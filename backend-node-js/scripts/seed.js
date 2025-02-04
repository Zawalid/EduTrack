import { connectDB } from "../src/db.js";
import { seedGrades } from "../src/utils/seed.js";

export async function seed(numRecords = 10) {
  try {
    await connectDB();
    await seedGrades();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

const numRecords = process.argv[2] ? parseInt(process.argv[2]) : 10;
seed(numRecords);
