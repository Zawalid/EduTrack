"use client";

import * as React from "react";
import { BookPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import { ComboboxForm } from "@/components/ui/combobox-form";
import { SelectForm } from "@/components/ui/select-form";

import { CLASSES, SEMESTERS } from "@/lib/constants";
import { insertGradesSchema } from "@/lib/validation";

const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "History", "Literature"];
const GRADE_TYPES = ["Midterm", "Final", "Project", "Assignment", "Quiz"];

interface InsertGradesDialogProps {
  students: Student[];
  fields: string[];
}

export function InsertGradesDialog({ students, fields }: InsertGradesDialogProps) {
  const [open, setOpen] = React.useState(false);

  const form = useForm<InsertGradesSchema>({
    resolver: zodResolver(insertGradesSchema),
    defaultValues: {
      subject: SUBJECTS[0],
      semester: SEMESTERS[0],
      type: GRADE_TYPES[0],
      className: undefined,
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

  async function onSubmit(data: InsertGradesSchema) {
    try {
      const formattedGrades = data.grades.map((grade) => ({
        student_id: grade.student_id,
        grade: Number(grade.grade),
        subject: data.subject,
        semester: data.semester,
        type: data.type,
      }));

      
      form.reset();
      setOpen(false);
      toast.success("Grades saved successfully");
      
      console.log(formattedGrades);
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
              <SelectForm
                form={form}
                name="className"
                label="Class"
                items={CLASSES}
                placeholder="Select a class"
              />
              <ComboboxForm
                form={form}
                name="field"
                label="Field"
                items={fields}
                placeholder="Select a field"
              />
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
                                    step="0.25"
                                    className="w-[100px]"
                                    value={field.value ?? ""}
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
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  form.reset();
                }}
              >
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
