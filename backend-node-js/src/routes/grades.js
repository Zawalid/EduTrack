import {
  getAllGrades,
  getGradeById,
  createGrade,
  createMultipleGrades,
  updateGrade,
  deleteGrade,
  deleteMultipleGrades,
  getStudentGrades,
  getAverageGradeByStudentId,
  getTopGradeByStudentId,
  getTop3GradesBySubject,
  getGradeTypes,
  getGradeSubjects,
} from "../controllers/gradesController.js";

export default async function gradeRoutes(fastify, opts) {
  fastify.get("/", getAllGrades);
  fastify.get("/:id", getGradeById);
  fastify.post(
    "/",
    {
      schema: {
        body: {
          type: "object",
          required: ["student_id", "grade", "subject", "semester", "type"],
          properties: {
            student_id: { type: "number" },
            grade: { type: "number" },
            subject: { type: "string" },
            semester: { type: "string" },
            type: { type: "string" },
          },
        },
      },
    },
    createGrade
  );
  fastify.post(
    "/bulk",
    {
      schema: {
        body: {
          type: "array",
          items: {
            type: "object",
            required: ["student_id", "grade", "subject", "semester", "type"],
            properties: {
              student_id: { type: "number" },
              grade: { type: "number" },
              subject: { type: "string" },
              semester: { type: "string" },
              type: { type: "string" },
            },
          },
        },
      },
    },
    createMultipleGrades
  );
  fastify.patch("/:id", updateGrade);
  fastify.delete("/:id", deleteGrade);
  fastify.delete("/delete", deleteMultipleGrades);
  fastify.get("/student/:student_id", getStudentGrades);
  fastify.get("/student/:student_id/average", getAverageGradeByStudentId);
  fastify.get("/student/:student_id/top", getTopGradeByStudentId);
  fastify.get("/top3/:subject", getTop3GradesBySubject);
  fastify.get("/types", getGradeTypes);
  fastify.get("/subjects", getGradeSubjects);
}
