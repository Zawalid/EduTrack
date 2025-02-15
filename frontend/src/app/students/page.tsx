import { Metadata } from "next";
import { DataTable } from "@/components/data-table/data-table";
import { NewStudentModal } from "@/components/new-student-modal";
import { InsertGradesDialog } from "@/components/insert-grades-dialog";
import { getAllStudents } from "@/lib/api/students/queries";
import { getAllGrades } from "@/lib/api/grades/queries";

export const metadata: Metadata = { title: "Students" };

export default async function studentPage() {
  const { data: students, error } = await getAllStudents();
  const { data: grades, error: error2 } = await getAllGrades();

  // TODO : Fetch types and subjects as well
  

  if (error || error2) {
    return <div className="">Error : 
    </div>;
  }

  const studentsWithGrades = students?.map((student) => {
    const studentGrades = grades?.filter((grade) => grade.student_id === student.id);
    return { ...student, grades: studentGrades || [] };
  });

  const fields = Array.from(new Set(students?.map((student) => student.field).filter(Boolean)));


  console.log(fields)
  

  return (
    <div className="container hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">Here&apos;s a list of your students</p>
        </div>
        <div className="flex gap-3">
          <InsertGradesDialog students={students || []} fields={fields} />
          <NewStudentModal fields={fields} />
        </div>
      </div>
      <DataTable data={studentsWithGrades || []} fields={fields} />
    </div>
  );
}
