import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    student_id: { type: Number, required: true },
    grade: { type: Number, required: true },
    subject: { type: String, required: true },
    semester: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;
