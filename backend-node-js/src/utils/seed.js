import { faker } from "@faker-js/faker";
import Grade from "../models/Grade.js";

const subjects = ["Math", "Science", "History", "English", "Art", "Physics", "Chemistry"];
const types = ["Exam", "Quiz", "Homework", "Project"];

const students = [
  {
    id: 1,
    cne: "A303535058",
    firstName: "Aleen",
    lastName: "Kunde",
    email: "Ryley43@hotmail.com",
    className: "MASTER",
    field: "Science",
    average: 10.77,
  },
  {
    id: 2,
    cne: "E343699737",
    firstName: "Sheridan",
    lastName: "Marks",
    email: "Camren71@hotmail.com",
    className: "LICENCE",
    field: "Physical Education",
    average: 17.06,
  },
  {
    id: 3,
    cne: "U749120564",
    firstName: "Ella",
    lastName: "Heathcote",
    email: "Sharon.Fritsch27@hotmail.com",
    className: "LICENCE",
    field: "Physical Education",
    average: 10.32,
  },
  {
    id: 4,
    cne: "G663153723",
    firstName: "Jason",
    lastName: "Koss",
    email: "Autumn_Jacobson-Marvin@gmail.com",
    className: "PHD",
    field: "Art",
    average: 14.8,
  },
  {
    id: 5,
    cne: "T529533726",
    firstName: "Rita",
    lastName: "Stokes-Schoen",
    email: "Brooks.Tromp11@hotmail.com",
    className: "MASTER",
    field: "Literature",
    average: 11.81,
  },
];

const generateGrade = () => {
  const randomFloat = faker.number.float({ min: 0, max: 20 });
  return Math.round(randomFloat * 4) / 4;
};

export async function seedGrades() {
  try {
    await Grade.deleteMany({});
    console.log("Cleared existing grades");

    const grades = [];

    students.forEach((student) => {
      for (let i = 0; i < 5; i++) {
        const grade = {
          student_id: student.id,
          grade: generateGrade(),
          subject: faker.helpers.arrayElement(subjects),
          semester: `S${faker.number.int({ min: 1, max: 6 })}`,
          type: faker.helpers.arrayElement(types),
        };

        grades.push(grade);
      }
    });

    await Grade.insertMany(grades);
    console.log(`Inserted ${grades.length} grade records`);
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}