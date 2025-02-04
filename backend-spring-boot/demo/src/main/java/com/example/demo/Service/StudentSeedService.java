package com.example.demo.Service;

import com.example.demo.Entity.Student;
import com.example.demo.Repository.StudentRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;

@Service
public class StudentSeedService {
    private final StudentRepository repository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public StudentSeedService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> seedStudents(int count) {
        try {
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
}
