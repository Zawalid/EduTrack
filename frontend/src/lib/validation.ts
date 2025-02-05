import { z } from "zod";
import { SEMESTERS } from "./constants";

export const studentSchema = z.object({
  id: z.number(),
  cne: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  className: z.string(),
  field: z.string(),
  average: z.number(),
});

export const createStudentSchema = studentSchema.omit({ id: true, average: true });

export const updateStudentSchema = createStudentSchema.partial();

export const gradeSchema = z.object({
  student_id: z.number(),
  subject: z.string(),
  semester: z.enum(SEMESTERS),
  type: z.string(),
  grade: z.number(),
});
