import { faker } from "@faker-js/faker";
import Grade from "../models/Grade.js";

const subjects = ["Math", "Science", "History", "English", "Art", "Physics", "Chemistry"];
const types = ["Exam", "Quiz", "Homework", "Project"];

const generateGrade = () => {
  const randomFloat = faker.number.float({ min: 0, max: 20 });
  return Math.round(randomFloat * 4) / 4;
};

export async function seedGrades(numRecords = 10, source = "cli") {
  try {
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
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}
