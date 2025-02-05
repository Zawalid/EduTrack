'use server'

const BASE_URL = 'http://localhost:8080/api/students';

export const createStudent = async (student: Student): Promise<{ data: Student | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error('Failed to create student');
    }
    const data: Student = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const updateStudent = async (id: string, student: Partial<Student>): Promise<{ data: Student | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error('Failed to update student');
    }
    const data: Student = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const deleteStudent = async (id: string): Promise<{ data: Student | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete student');
    }
    const data: Student = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};

export const seedStudents = async (number: number): Promise<{ data: Student[] | null; error: Error | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/seed/${number}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to seed students');
    }
    const data: Student[] = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
};