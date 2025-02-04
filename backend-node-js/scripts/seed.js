import { faker } from "@faker-js/faker";
import { connectDB } from "../src/db.js";
import Grade from "../src/models/Grade.js";

const subjects = ["Math", "Science", "History", "English", "Art", "Physics", "Chemistry"];
const types = ["Exam", "Quiz", "Homework", "Project"];

const generateGrade = () => {
  const randomFloat = faker.number.float({ min: 0, max: 20 });
  return Math.round(randomFloat * 4) / 4;
};

async function seedGrades(numRecords = 10) {
  try {
    await connectDB();

    // Clear existing data
    await Grade.deleteMany({});
    console.log("Cleared existing grades");

    const grades = [];

    for (let i = 1; i <= numRecords; i++) {
      const grade = {
        student_id: faker.number.int({ min: 1, max: 20 }),
        grade: generateGrade(),
        subject: faker.helpers.arrayElement(subjects),
        semester: `S${faker.number.int({ min: 1, max: 6 })}`,
        type: faker.helpers.arrayElement(types),
      };

      grades.push(grade);
    }

    await Grade.insertMany(grades);
    console.log(`Inserted ${numRecords} grade records`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

const numRecords = process.argv[2] ? parseInt(process.argv[2]) : 10;
seedGrades(numRecords);
