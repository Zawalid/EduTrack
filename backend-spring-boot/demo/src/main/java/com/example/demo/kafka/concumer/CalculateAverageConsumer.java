package com.example.demo.kafka.concumer;

import com.example.demo.Service.StudentService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class CalculateAverageConsumer {
    private final StudentService studentService;

    public CalculateAverageConsumer(StudentService studentService) {
        this.studentService = studentService;
    }

    @KafkaListener(topics = "calculate-average")
    public void listen(String message) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            JsonNode jsonNode = objectMapper.readTree(message);
            long studentId = jsonNode.get("student_id").asLong();
            double average = jsonNode.get("average").asDouble();

            studentService.updateAverage(studentId, average);
            System.out.println("Student with id " + studentId + " average updated to " + average);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
