"use server";

const BASE_URL = process.env.STUDENTS_URL;

export const getAllStudents = async (): Promise<{
  data: Student[] | null;
  error: Error | null;
}> => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch students");
    }
    const data: Student[] = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const getStudentById = async (
  id: string
): Promise<{ data: Student | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch student");
    }
    const data: Student = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};
