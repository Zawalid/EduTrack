"use client";

import * as React from "react";
import { BookPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { ComboboxForm } from "./ui/combobox-form";

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Literature",
];
const SEMESTERS = ["S1", "S2", "S3", "S4", "S5", "S6"] as const;
const GRADE_TYPES = ["Midterm", "Final", "Project", "Assignment", "Quiz"];

const gradeSchema = z.object({
  subject: z.string(),
  semester: z.enum(SEMESTERS),
  type: z.string(),
  className: z.string(),
  field: z.string(),
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

type GradeFormValues = z.infer<typeof gradeSchema>;

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  className: string;
  field: string;
}

interface InsertGradesDialogProps {
  students: Student[];
  classNames: string[];
  fields: string[];
  onGradesSubmit: (
    grades: {
      student_id: number;
      grade: number;
      subject: string;
      semester: string;
      type: string;
      className: string;
      field: string;
    }[]
  ) => Promise<void>;
}

export function InsertGradesDialog({ students, classNames, fields }: InsertGradesDialogProps) {
  const [open, setOpen] = React.useState(false);

  const form = useForm<GradeFormValues>({
    resolver: zodResolver(gradeSchema),
    defaultValues: {
      subject: SUBJECTS[0],
      semester: SEMESTERS[0],
      type: GRADE_TYPES[0],
      className: "",
      field: "",
      grades: [],
    },
  });

  const selectedClassName = form.watch("className");
  const selectedField = form.watch("field");

  React.useEffect(() => {
    if (selectedClassName && selectedField) {
      form.setValue(
        "grades",
        students
          .filter(
            (student) => student.className === selectedClassName && student.field === selectedField
          )
          .map((student) => ({
            student_id: student.id,
            studentName: `${student.firstName} ${student.lastName}`,
            grade: "",
          }))
      );
    } else {
      form.setValue("grades", []);
    }
  }, [selectedClassName, selectedField, students, form]);

  async function onSubmit(data: GradeFormValues) {
    try {
      const formattedGrades = data.grades.map((grade) => ({
        student_id: grade.student_id,
        grade: Number(grade.grade),
        subject: data.subject,
        semester: data.semester,
        type: data.type,
      }));

      console.log(formattedGrades);
      toast.success("Grades saved successfully");
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to save grades");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <BookPlus className="h-4 w-4" />
          Insert Grades
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Insert Grades</DialogTitle>
          <DialogDescription>Enter your student&apos;s grades</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <ComboboxForm form={form} name="className" label="Class" items={classNames} />
              <ComboboxForm form={form} name="field" label="Field" items={fields} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <ComboboxForm form={form} name="subject" label="Subject" items={SUBJECTS} />
              <ComboboxForm form={form} name="type" label="Type" items={GRADE_TYPES} />
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SEMESTERS.map((semester) => (
                          <SelectItem key={semester} value={semester}>
                            {semester}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {selectedClassName && selectedField && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead className="w-[150px]">Grade (0-20)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students
                    .filter(
                      (student) =>
                        student.className === selectedClassName && student.field === selectedField
                    )
                    .map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`grades.${index}.grade`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="number"
                                    min="0"
                                    max="20"
                                    step="0.01"
                                    className="w-[100px]"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!selectedClassName || !selectedField}>
                {/* { && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
                Save Grades
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
