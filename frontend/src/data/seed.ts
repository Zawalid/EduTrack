import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { CLASSES } from "@/lib/constants";

const fields = [
  "Mathematics",
  "Science",
  "History",
  "Art",
  "Physical Education",
  "Music",
  "Literature",
];


let idCounter = 1;

const students: Student[] = Array.from({ length: 100 }, () => ({
  id: idCounter++,
  cne: `${faker.string.alpha({ length: 1, casing: "upper" })}${faker.string.numeric(9)}`,
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  className: CLASSES[Math.floor(Math.random() * CLASSES.length)],
  field: fields[Math.floor(Math.random() * fields.length)],
  average: parseFloat((10 + Math.random() * 10).toFixed(2)), 
}));

fs.writeFileSync(path.join(__dirname, "students.json"), JSON.stringify(students, null, 2));

console.log("✅ students data generated.");
