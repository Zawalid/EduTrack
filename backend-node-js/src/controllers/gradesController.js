import Grade from "../models/Grade.js";

export const getAllGrades = async (request, reply) => {
  const grades = await Grade.find();
  return grades;
};

export const getGradeById = async (request, reply) => {
  try {
    const grade = await Grade.findOne({ _id: request.params.id });
    if (!grade) return reply.code(404).send({ error: "Grade not found" });
    return grade;
  } catch (error) {
    return reply.code(400).send({ error: error.message });
  }
};

export const createGrade = async (request, reply) => {
  try {
    const grade = new Grade(request.body);
    await grade.save();
    return reply.code(201).send(grade);
  } catch (error) {
    return reply.code(400).send({ error: error.message });
  }
};

export const createMultipleGrades = async (request, reply) => {
  try {
    const grades = request.body;
    const insertedGrades = await Grade.insertMany(grades);
    return reply.code(201).send(insertedGrades);
  } catch (error) {
    return reply.code(400).send({ error: error.message });
  }
};

export const updateGrade = async (request, reply) => {
  try {
    const grade = await Grade.findOneAndUpdate({ _id: request.params.id }, request.body, {
      new: true,
    });
    if (!grade) return reply.code(404).send({ error: "Grade not found" });
    return grade;
  } catch (error) {
    return reply.code(400).send({ error: error.message });
  }
};

export const deleteGrade = async (request, reply) => {
  try {
    const grade = await Grade.findOneAndDelete({ _id: request.params.id });
    if (!grade) return reply.code(404).send({ error: "Grade not found" });
    return { message: "Grade deleted" };
  } catch (error) {
    return reply.code(400).send({ error: error.message });
  }
};

export const deleteMultipleGrades = async (request, reply) => {
  try {
    const ids = request.body.ids;
    const result = await Grade.deleteMany({ _id: { $in: ids } });
    if (result.deletedCount === 0) return reply.code(404).send({ error: "Grades not found" });
    return { message: "Grades deleted" };
  } catch (error) {
    return reply.code(400).send({ error: error.message });
  }
};

export const getStudentGrades = async (request, reply) => {
  try {
    const grades = await Grade.find({ student_id: parseInt(request.params.student_id) });
    if (!grades.length) return reply.code(404).send({ error: "Grades not found" });
    return grades;
  } catch (error) {
    return reply.code(400).send({ error: error.message });
  }
};

export const getAverageGradeByStudentId = async (request, reply) => {
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
};

export const getTopGradeByStudentId = async (request, reply) => {
  try {
    const grade = await Grade.findOne({ student_id: parseInt(request.params.student_id) }).sort({
      grade: -1,
    });
    if (!grade) return reply.code(404).send({ error: "Grade not found" });
    return grade;
  } catch (error) {
    return reply.code(400).send({ error: error.message });
  }
};

export const getTop3GradesBySubject = async (request, reply) => {
  try {
    const grades = await Grade.find({ subject: request.params.subject })
      .sort({ grade: -1 })
      .limit(3);
    if (!grades.length) return reply.code(404).send({ error: "Grades not found" });
    return grades;
  } catch (error) {
    return reply.code(400).send({ error: error.message });
  }
};

export const getGradeTypes = async (request, reply) => {
  const types = await Grade.distinct("type");
  return types;
};

export const getGradeSubjects = async (request, reply) => {
  const subjects = await Grade.distinct("subject");
  return subjects;
};