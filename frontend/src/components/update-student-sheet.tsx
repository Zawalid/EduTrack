"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ComboboxForm } from "@/components/ui/combobox-form";
import { SelectForm } from "@/components/ui/select-form";

import { updateStudentSchema } from "@/lib/validation";
import { revalidate, updateStudent } from "@/lib/api/students/actions";
import { CLASSES } from "@/lib/constants";
import { Separator } from "./ui/separator";
import { UpdateStudentGrades } from "./update-student-grades-table";

interface UpdateStudentSheetProps extends React.ComponentPropsWithRef<typeof Sheet> {
  student: Student | null;
  fields: string[];
}

export function UpdateStudentSheet({ student, fields, ...props }: UpdateStudentSheetProps) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition();

  const form = useForm<UpdateStudentSchema>({ resolver: zodResolver(updateStudentSchema) });

  React.useEffect(() => {
    form.reset({
      cne: student?.cne ?? "",
      firstName: student?.firstName ?? "",
      lastName: student?.lastName ?? "",
      email: student?.email ?? "",
      className: student?.className ?? undefined,
      field: student?.field ?? "",
      grades: { grades: student?.grades ?? [], updated: [], deleted: [] },
    });
  }, [form, student]);

  function onSubmit(input: UpdateStudentSchema) {
    const updated = form
      .getValues("grades")
      .grades.filter(
        (grade) =>
          form.getValues("grades").updated.includes(grade._id) &&
          grade.grade !== student?.grades.find((g) => g._id === grade._id)?.grade
      );
    startUpdateTransition(async () => {
      if (!student) return;

      const { error } = await updateStudent(
        student.id,
        {
          className: input.className,
          firstName: input.firstName,
          lastName: input.lastName,
          cne: input.cne,
          email: input.email,
          field: input.field,
          average: student.average,
        },
        { updated, deleted: form.getValues("grades").deleted }
      );

      if (error) {
        toast.error(error.message);
        return;
      }

      form.reset();
      props.onOpenChange?.(false);
      toast.success("Student updated successfully");

      await revalidate();
    });
  }

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-lg overflow-auto">
        <SheetHeader className="text-left">
          <SheetTitle>Update Student</SheetTitle>
          <SheetDescription>Update the student details and save the changes</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cne"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNE</FormLabel>
                    <FormControl>
                      <Input placeholder="CNE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            <Separator />
            <div className="space-y-2 overflow-auto">
              <h3 className="text- font-semibold">Grades</h3>
              <UpdateStudentGrades form={form} />
            </div>
            <SheetFooter className="gap-2 mt-auto pt-2 sm:space-x-0">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button
                disabled={isUpdatePending || !form.formState.isDirty }
              >
                {isUpdatePending && (
                  <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />
                )}
                Save
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
