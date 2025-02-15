"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComboboxForm } from "@/components/ui/combobox-form";
import { SelectForm } from "@/components/ui/select-form";

import { CLASSES } from "@/lib/constants";
import { createStudentSchema } from "@/lib/validation";
import { createStudent, revalidate } from "@/lib/api/students/actions";

export function NewStudentModal({ fields }: { fields: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreatePending, startCreateTransition] = useTransition();
  const { data: session } = useSession();

  const form = useForm<CreateStudentSchema>({
    defaultValues: {
      cne: "",
      firstName: "",
      lastName: "",
      email: "",
      className: undefined,
      field: "",
    },
    resolver: zodResolver(createStudentSchema),
  });


  console.log(session?.user?.id)

  function onSubmit(input: CreateStudentSchema) {
    startCreateTransition(async () => {
      const { error } = await createStudent({ ...input, prof_id: session?.user?.id });

      if (error) {
        toast.error(error.message);
        return;
      }

      form.reset();
      setIsOpen(false);
      toast.success("Student added successfully");

      await revalidate();
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <UserPlus />
          New Student
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new student to the database.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
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
            <DialogFooter className="gap-2 pt-2 sm:space-x-0 col-span-2">
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={!form.formState.isDirty || isCreatePending}>
                {isCreatePending && (
                  <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />
                )}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
