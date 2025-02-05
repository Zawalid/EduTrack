import { z } from "zod";
import { CLASSES, SEMESTERS } from "./constants";

export const studentSchema = z.object({
  id: z.number(),
  cne: z.string().regex(/^[A-Z]\d{9}$/, "CNE must follow the format A123456789"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  className: z.enum(CLASSES, { message: "Class is required" }),
  field: z.string().min(1, "Field is required"),
  average: z
    .number()
    .min(0, "Average must be a positive number")
    .max(20, "Average must be less than or equal to 20"),
});

export const createStudentSchema = studentSchema.omit({ id: true, average: true });

export const gradeSchema = z.object({
  student_id: z.number(),
  subject: z.string(),
  semester: z.enum(SEMESTERS),
  type: z.string(),
  grade: z.number(),
});
