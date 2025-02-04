import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";

import { DataTable } from "@/components/data-table/data-table";
import { studentSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";
import { NewStudentModal } from "@/components/new-student-modal";
import { InsertGradesDialog } from "@/components/insert-grades-dialog";

export const metadata: Metadata = { title: "Students" };

// Simulate a database read for students.
async function getStudents() {
  const data = await fs.readFile(path.join(process.cwd(), "src/data/students.json"));

  const students = JSON.parse(data.toString());

  return z.array(studentSchema).parse(students);
}

export default async function studentPage() {
  const students = await getStudents();
  const fields = Array.from(new Set(students?.map((student) => student.field)));
  const classNames = Array.from(new Set(students?.map((student) => student.className)));

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">Here&apos;s a list of your students</p>
        </div>
        <div className="flex gap-3">
          {/* <Button variant="ghost">
            <BookPlus />
            Insert Grades
          </Button> */}
          <InsertGradesDialog students={students} fields={fields} classNames={classNames} />
          <NewStudentModal fields={fields} classNames={classNames} />
        </div>
      </div>
      <DataTable data={students} fields={fields} classNames={classNames} />
    </div>
  );
}
