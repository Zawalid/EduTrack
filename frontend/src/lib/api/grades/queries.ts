"use server";

const BASE_URL = process.env.GRADES_URL

export const getAllGrades = async (): Promise<{ data: Grade[] | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) throw new Error("Failed to fetch grades");

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const getGradeById = async (
  id: string
): Promise<{ data: Grade | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch grade");

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const getAverageGrade = async (
  studentId: string
): Promise<{ data: number | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/average/${studentId}`);
    if (!response.ok) throw new Error("Failed to fetch average grade");

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const getTopGrade = async (
  studentId: string
): Promise<{ data: Grade | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/top/${studentId}`);
    if (!response.ok) throw new Error("Failed to fetch top grade");

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const getTop3Grades = async (
  subject: string
): Promise<{ data: Grade[] | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/top3/${subject}`);
    if (!response.ok) throw new Error("Failed to fetch top 3 grades");

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const getGradeTypes = async (): Promise<{ data: string[] | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/types`);
    if (!response.ok) throw new Error("Failed to fetch grade types");

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const getSubjects = async (): Promise<{ data: string[] | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/subjects`);
    if (!response.ok) throw new Error("Failed to fetch subjects");

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};
