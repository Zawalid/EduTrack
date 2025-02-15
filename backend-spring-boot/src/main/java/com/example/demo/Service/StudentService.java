package com.example.demo.Service;

import com.example.demo.Model.Student;
import com.example.demo.Repository.StudentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Object getStudentById(long id) {
        Optional<Student> student = repository.findById(id);
        if (student.isPresent()) {
            return student.get();
        } else {
            return new ErrorResponse("Student with ID " + id + " not found", HttpStatus.NOT_FOUND.value());
        }
    }

    public Object createStudent(Student student) {
        if (student == null) {
            return new ErrorResponse("Invalid student data", HttpStatus.BAD_REQUEST.value());
        }
        return repository.save(student);
    }

    public Object updateStudent(long id, Student newStudent) {
        Optional<Student> existingStudent = repository.findById(id);
        if (existingStudent.isPresent()) {
            Student student = existingStudent.get();
            student.setCne(newStudent.getCne());
            student.setFirstName(newStudent.getFirstName());
            student.setLastName(newStudent.getLastName());
            student.setEmail(newStudent.getEmail());
            student.setClassName(newStudent.getClassName());
            student.setField(newStudent.getField());
            student.setAverage(newStudent.getAverage());
            return repository.save(student);
        } else {
            return new ErrorResponse("Student with ID " + id + " not found", HttpStatus.NOT_FOUND.value());
        }
    }

    public Object updateAverage(long studentId, double average) {
        Optional<Student> student = repository.findById(studentId);
        if (student.isPresent()) {
            student.get().setAverage(average);
            repository.save(student.get());
            return new SuccessResponse("Average updated successfully for student ID " + studentId, HttpStatus.OK.value());
        } else {
            return new ErrorResponse("Student with ID " + studentId + " not found", HttpStatus.NOT_FOUND.value());
        }
    }

    public Object deleteStudent(long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return new SuccessResponse("Student with ID " + id + " deleted successfully", HttpStatus.OK.value());
        } else {
            return new ErrorResponse("Student with ID " + id + " not found", HttpStatus.NOT_FOUND.value());
        }
    }

    public Object deleteStudents(List<Long> ids) {
        if (ids.isEmpty()) {
            return new ErrorResponse("No valid student IDs provided", HttpStatus.BAD_REQUEST.value());
        } else {
            repository.deleteAllById(ids);
            return new SuccessResponse("Students with the following IDs deleted: " + ids, HttpStatus.OK.value());
        }
    }
}

class ErrorResponse {
    private String message;
    private int status;

    public ErrorResponse(String message, int status) {
        this.message = message;
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public int getStatus() {
        return status;
    }
}

class SuccessResponse {
    private String message;
    private int status;

    public SuccessResponse(String message, int status) {
        this.message = message;
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public int getStatus() {
        return status;
    }
}
