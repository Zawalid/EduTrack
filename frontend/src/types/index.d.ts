import {
  studentSchema,
  createStudentSchema,
  updateStudentSchema,
  gradeSchema,
} from "@/lib/validation";
import { z } from "zod";

declare global {
  type Student = z.infer<typeof studentSchema>;
  type CreateStudentSchema = z.infer<typeof createStudentSchema>;
  type UpdateStudentSchema = z.infer<typeof updateStudentSchema>;

  type Grade = z.infer<typeof gradeSchema>;
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
