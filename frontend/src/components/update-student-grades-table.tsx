import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FilePenLine, Save, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

export function UpdateStudentGrades({ form }: { form: UseFormReturn<UpdateStudentSchema> }) {
  const [editGradeId, setEditGradeId] = useState<string | null>(null);
  const [editGradeValue, setEditGradeValue] = useState<string>("");

  const grades = form.getValues("grades").grades ?? [];

  const handleEditClick = (grade: Grade) => {
    setEditGradeId(grade._id);
    setEditGradeValue(grade.grade.toString());
  };

  const handleSaveClick = (gradeId: string) => {
    form.setValue(
      "grades.grades",
      grades.map((grade) =>
        grade._id === gradeId ? { ...grade, grade: parseFloat(editGradeValue) } : grade
      ),
      { shouldDirty: true, shouldValidate: true }
    );

    form.setValue(
      "grades.updated",
      Array.from(new Set([...form.getValues("grades").updated, gradeId]))
    );

    setEditGradeId(null);
    setEditGradeValue("");
  };

  const handleDeleteClick = (gradeId: string) => {
    form.setValue(
      "grades.grades",
      grades.filter((grade) => grade._id !== gradeId),
      { shouldDirty: true, shouldValidate: true }
    );

    form.setValue("grades.deleted", [...form.getValues("grades").deleted, gradeId]);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Subject</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Semester</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {grades.map((grade, index) => (
          <TableRow key={grade._id}>
            <TableCell>{grade.subject}</TableCell>
            <TableCell>{grade.type}</TableCell>
            <TableCell>
              <FormField
                control={form.control}
                name={`grades.grades.${index}.grade`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        max="20"
                        step="0.25"
                        className={`w-20 ${
                          editGradeId === grade._id ? "border" : "border-none pointer-events-none"
                        }`}
                        readOnly={editGradeId !== grade._id}
                        value={editGradeId === grade._id ? editGradeValue : grade.grade}
                        onChange={(e) => setEditGradeValue(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TableCell>
            <TableCell>{grade.semester}</TableCell>
            <TableCell>
              {editGradeId === grade._id ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSaveClick(grade._id)}
                >
                  <Save />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditClick(grade)}
                >
                  <FilePenLine />
                </Button>
              )}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteClick(grade._id)}
              >
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
