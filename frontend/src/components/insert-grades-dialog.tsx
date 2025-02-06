"use client";

import * as React from "react";
import { BookPlus, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { insertGrades } from "@/lib/api/grades/actions";
import { revalidate } from "@/lib/api/students/actions";

const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "History", "Literature"];
const GRADE_TYPES = ["Midterm", "Final", "Project", "Assignment", "Quiz"];

interface InsertGradesDialogProps {
  students: Student[];
  fields: string[];
}

export function InsertGradesDialog({ students, fields }: InsertGradesDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isInsertPending, startInsertTransition] = React.useTransition();

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

  const searchedStudents = students.filter(
    (student) => student.className === selectedClassName && student.field === selectedField
  );

  async function onSubmit(data: InsertGradesSchema) {
    if (!searchedStudents.length) return;

    const formattedGrades = data.grades.map((grade) => ({
      student_id: grade.student_id,
      grade: Number(grade.grade),
      subject: data.subject,
      semester: data.semester,
      type: data.type,
    }));
    startInsertTransition(async () => {
      const { error } = await insertGrades(formattedGrades);

      if (error) {
        toast.error(error.message);
        return;
      }

      form.reset();
      setIsOpen(false);
      toast.success("Grades inserted successfully");

      await revalidate();
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                  {searchedStudents.length ? (
                    searchedStudents.map((student, index) => (
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
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="h-24 text-center">
                        No students found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}

            <DialogFooter className="gap-2 pt-2 sm:space-x-0 col-span-2">
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={
                  !form.formState.isDirty ||
                  !form.formState.isValid ||
                  isInsertPending ||
                  !searchedStudents.length
                }
              >
                {isInsertPending && (
                  <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />
                )}
                Save Grades
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
