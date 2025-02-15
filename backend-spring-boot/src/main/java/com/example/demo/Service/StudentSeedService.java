package com.example.demo.Service;

import com.example.demo.Model.Student;
import com.example.demo.Repository.StudentRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;

import java.io.InputStream;
import java.util.List;

@Service
public class StudentSeedService {
    private final StudentRepository repository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PersistenceContext
    private EntityManager entityManager;

    public StudentSeedService(StudentRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public ResponseEntity<Object> seedStudents(int count) {
        try {
            repository.deleteAll();
            resetIdSequence();

            // Load the data from the students.json file
            InputStream inputStream = getClass().getResourceAsStream("/students.json");
            List<Student> students = objectMapper.readValue(inputStream, new TypeReference<List<Student>>() {});
            
            // Validate the count to not exceed the list size
            if (count > students.size()) {
                count = students.size();
            }

            // Save the required number of students
            List<Student> savedStudents = repository.saveAll(students.subList(0, count));
            return new ResponseEntity<>(savedStudents, HttpStatus.OK);

        } catch (Exception e) {
            // Handle the exception gracefully and return a meaningful error message
            return new ResponseEntity<>("Failed to read students.json or seed data: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void resetIdSequence() {
        // Reset the auto-increment sequence after deleting all records
        entityManager.createNativeQuery("ALTER TABLE students AUTO_INCREMENT = 1").executeUpdate();
    }
}
