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

export const gradeSchema = z.object({
  _id: z.string(),
  student_id: z.number(),
  subject: z.string().min(1, "Subject is required"),
  semester: z.enum(SEMESTERS, { message: "Semester is required" }),
  type: z.string().min(1, "Type is required"),
  grade: z
    .number()
    .min(0, "Grade must be a positive number")
    .max(20, "Grade must be less than or equal to 20"),
});

export const createStudentSchema = studentSchema.omit({ id: true, average: true });

export const updateStudentSchema = createStudentSchema.extend({ grades: z.array(gradeSchema) });

export const insertGradesSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  semester: z.enum(SEMESTERS, { message: "Semester is required" }),
  type: z.string().min(1, "Type is required"),
  className: z.enum(CLASSES, { message: "Class is required" }),
  field: z.string().min(1, "Field is required"),
  grades: z.array(
    z.object({
      student_id: z.number(),
      studentName: z.string(),
      grade: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 20, {
          message: "Grade must be a number between 0 and 20",
        }),
    })
  ),
});
