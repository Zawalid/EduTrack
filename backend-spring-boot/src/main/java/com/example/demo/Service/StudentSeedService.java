package com.example.demo.Service;

import com.example.demo.Model.Student;
import com.example.demo.Repository.StudentRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

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
    public List<Student> seedStudents(int count) {
        try {
            repository.deleteAll();
            resetIdSequence();

            InputStream inputStream = getClass().getResourceAsStream("/students.json");
            List<Student> students = objectMapper.readValue(inputStream, new TypeReference<List<Student>>() {});
            if (count > students.size()) {
                count = students.size();
            }
            
            return repository.saveAll(students.subList(0, count));
        } catch (Exception e) {
            throw new RuntimeException("Failed to read students.json", e);
        }
    }

    private void resetIdSequence() {
        entityManager.createNativeQuery("ALTER TABLE Students AUTO_INCREMENT = 1").executeUpdate();
    }
}
