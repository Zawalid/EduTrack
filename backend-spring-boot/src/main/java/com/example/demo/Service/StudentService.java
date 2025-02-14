package com.example.demo.Service;

import com.example.demo.Model.Student;
import com.example.demo.Repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student getStudentById(long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public Student createStudent(Student student) {
        return repository.save(student);
    }

    public Student updateStudent(long id, Student newStudent) {
        return repository.findById(id).map(student -> {
            student.setCne(newStudent.getCne());
            student.setFirstName(newStudent.getFirstName());
            student.setLastName(newStudent.getLastName());
            student.setEmail(newStudent.getEmail());
            student.setClassName(newStudent.getClassName());
            student.setField(newStudent.getField());
            student.setAverage(newStudent.getAverage());
            return repository.save(student);
        }).orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public void updateAverage(long studentId, double average) {
        repository
                .findById(studentId)
                .map(student -> {
                    student.setAverage(average);
                    return repository.save(student);
                })
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public void deleteStudent(long id) {
        repository.deleteById(id);
    }

    public void deleteStudents(List<Long> ids) {
        repository.deleteAllById(ids);
    }


}
