"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var faker_1 = require("@faker-js/faker");
var fields = [
    "Mathematics",
    "Science",
    "History",
    "Art",
    "Physical Education",
    "Music",
    "Literature",
];
var classes = ["DUT", "LICENCE", "MASTER", "ENGINEERING", "PHD", "BACHELOR"];
var idCounter = 1;
var students = Array.from({ length: 100 }, function () { return ({
    id: idCounter++,
    cne: "".concat(faker_1.faker.string.alpha({ length: 1, casing: "upper" })).concat(faker_1.faker.string.numeric(9)),
    firstName: faker_1.faker.person.firstName(),
    lastName: faker_1.faker.person.lastName(),
    email: faker_1.faker.internet.email(),
    className: classes[Math.floor(Math.random() * classes.length)],
    field: fields[Math.floor(Math.random() * fields.length)],
    average: parseFloat((10 + Math.random() * 10).toFixed(2)),
}); });
fs_1.default.writeFileSync(path_1.default.join(__dirname, "students.json"), JSON.stringify(students, null, 2));
console.log("✅ students data generated.");
