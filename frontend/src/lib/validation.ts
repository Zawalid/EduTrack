import { z } from "zod";

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
