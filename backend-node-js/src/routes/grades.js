import Grade from "../models/Grade.js";

export default async function gradeRoutes(fastify, opts) {
  // Create grade
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
    async (request, reply) => {
      try {
        const grade = new Grade(request.body);
        await grade.save();
        return reply.code(201).send(grade);
      } catch (error) {
        return reply.code(400).send({ error: error.message });
      }
    }
  );

  // Get all grades
  fastify.get("/", async (request, reply) => {
    const grades = await Grade.find();
    return grades;
  });

  // Get grade by ID
  fastify.get("/:id", async (request, reply) => {
    try {
      const grade = await Grade.findOne({ _id: request.params.id });
      if (!grade) return reply.code(404).send({ error: "Grade not found" });
      return grade;
    } catch (error) {
      return reply.code(400).send({ error: error.message });
    }
  });

  // Update grade
  fastify.patch("/:id", async (request, reply) => {
    try {
      const grade = await Grade.findOneAndUpdate({ _id: request.params.id }, request.body, {
        new: true,
      });
      if (!grade) return reply.code(404).send({ error: "Grade not found" });
      return grade;
    } catch (error) {
      return reply.code(400).send({ error: error.message });
    }
  });

  // Delete grade
  fastify.delete("/:id", async (request, reply) => {
    try {
      const grade = await Grade.findOneAndDelete({ _id: request.params.id });
      if (!grade) return reply.code(404).send({ error: "Grade not found" });
      return { message: "Grade deleted" };
    } catch (error) {
      return reply.code(400).send({ error: error.message });
    }
  });

  // Delete multiple grades
  fastify.delete("/delete", async (request, reply) => {
    try {
      const ids = request.body.ids;
      const grades = await Grade.deleteMany({ _id: { $in: ids } });
      if (!grades.deletedCount) return reply.code(404).send({ error: "Grades not found" });
      return { message: "Grades deleted" };
    } catch (error) {
      return reply.code(400).send({ error: error.message });
    }
  });

  // Get average grade by student ID
  fastify.get("/average/:student_id", async (request, reply) => {
    try {
      const grades = await Grade.aggregate([
        { $match: { student_id: parseInt(request.params.student_id) } },
        { $group: { _id: "$student_id", average: { $avg: "$grade" }, count: { $sum: 1 } } },
        {
          $project: {
            _id: 0,
            student_id: "$_id",
            average: { $round: ["$average", 2] },
            grades_count: "$count",
          },
        },
      ]);
      if (!grades.length) return reply.code(404).send({ error: "Grades not found" });
      return grades[0];
    } catch (error) {
      return reply.code(400).send({ error: error.message });
    }
  });

  // Get top grade by student ID
  fastify.get("/top/:student_id", async (request, reply) => {
    try {
      const grade = await Grade.findOne({ student_id: parseInt(request.params.student_id) }).sort({
        grade: -1,
      });
      if (!grade) return reply.code(404).send({ error: "Grade not found" });
      return grade;
    } catch (error) {
      return reply.code(400).send({ error: error.message });
    }
  });

  // Get top 3 grades by subject
  fastify.get("/top3/:subject", async (request, reply) => {
    try {
      const grades = await Grade.find({ subject: request.params.subject })
        .sort({ grade: -1 })
        .limit(3);
      if (!grades.length) return reply.code(404).send({ error: "Grades not found" });
      return grades;
    } catch (error) {
      return reply.code(400).send({ error: error.message });
    }
  });

  // Get types of grades
  fastify.get("/types", async (request, reply) => {
    const types = await Grade.distinct("type");
    return types;
  });

  // Get subjects of grades
  fastify.get("/subjects", async (request, reply) => {
    const subjects = await Grade.distinct("subject");
    return subjects;
  });
}
