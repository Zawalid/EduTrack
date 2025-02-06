import {
  studentSchema,
  createStudentSchema,
  updateStudentSchema,
  gradeSchema,
  insertGradesSchema,
} from "@/lib/validation";
import { z } from "zod";

declare global {
  type Student = z.infer<typeof studentSchema> & { grades: Grade[] };
  type CreateStudentSchema = z.infer<typeof createStudentSchema>;
  type UpdateStudentSchema = z.infer<typeof updateStudentSchema>;

  type Grade = z.infer<typeof gradeSchema> & { _id: string };
  type InsertGradesSchema = z.infer<typeof insertGradesSchema>;

  interface DataTableRowAction<TData> {
    row: Row<TData>;
    type: "update" | "delete";
  }

  interface Option {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
    count?: number;
  }

  interface DataTableFilterField<TData> {
    id: StringKeyOf<TData>;
    label: string;
    placeholder?: string;
    options?: Option[];
  }
}
