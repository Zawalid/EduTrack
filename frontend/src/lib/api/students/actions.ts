"use server";

import { revalidatePath } from "next/cache";

const BASE_URL = "http://localhost:8080/api/students";

export const createStudent = async (
  student: Partial<Student>
): Promise<{ data: Student | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) throw new Error("Failed to create student");

    const data: Student = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const updateStudent = async (
  id: number,
  student: Partial<Student>
): Promise<{ data: Student | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) throw new Error("Failed to update student");

    const data: Student = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const deleteStudent = async (
  id: number
): Promise<{ data: Student | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete student");

    return { data: null, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const deleteStudents = async (
  ids: number[]
): Promise<{ data: Student[] | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}`, {
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
