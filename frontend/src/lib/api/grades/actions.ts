"use server";

const BASE_URL = "http://localhost:3001/api/grades";

export const createGrade = async (
  grade: Grade
): Promise<{ data: Grade | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(grade),
    });
    if (!response.ok) {
      throw new Error("Failed to create grade");
    }
    const data: Grade = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const updateGrade = async (
  id: string,
  grade: Partial<Grade>
): Promise<{ data: Grade | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(grade),
    });
    if (!response.ok) {
      throw new Error("Failed to update grade");
    }
    const data: Grade = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const deleteGrade = async (id: string): Promise<{ data: null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete grade");

    return { data: null, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const deleteGrades = async (ids: string[]): Promise<{ data: null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    });
    if (!response.ok) throw new Error("Failed to delete grades");

    return { data: null, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};
