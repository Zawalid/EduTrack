"use server";

import { revalidatePath } from "next/cache";
import { deleteGrades, updateGrade } from "../grades/actions";

const BASE_URL = process.env.STUDENTS_URL

export const createStudent = async (
  student: Partial<Student>
): Promise<{ data: Student | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    if (!response.ok) throw new Error("Failed to add student");

    const data: Student = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const updateStudent = async (
  id: number,
  student: Partial<Student>,
  grades: { updated: Grade[]; deleted: string[] }
): Promise<{ data: Student | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    if (!response.ok) throw new Error("Failed to update student");

    // Grades
    if (grades.updated.length > 0) {
      await Promise.all(
        grades.updated.map(async (grade) => {
          await updateGrade(grade._id, grade);
        })
      );
      if (!response.ok) throw new Error("Failed to update student grades");
    }

    if (grades.deleted.length > 0) {
      await deleteGrades(grades.deleted);
      if (!response.ok) throw new Error("Failed to delete student grades");
    }

    const data: Student = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const deleteStudent = async (id: number): Promise<{ data: null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete student");

    return { data: null, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const deleteStudents = async (
  ids: number[]
): Promise<{ data: null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    if (!response.ok) throw new Error("Failed to delete students");

    return { data: null, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const revalidate = async () => revalidatePath("/students");
