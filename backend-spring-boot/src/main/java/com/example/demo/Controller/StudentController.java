package com.example.demo.Controller;

import com.example.demo.Model.Student;
import com.example.demo.Service.StudentSeedService;
import com.example.demo.Service.StudentService;
import com.example.demo.kafka.producer.KafkaMessageProducer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentService service;
    private final StudentSeedService seedService;
    private final KafkaMessageProducer kafkaMessageProducer;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public StudentController(StudentService service, StudentSeedService seedService, KafkaMessageProducer kafkaMessageProducer) {
        this.service = service;
        this.seedService = seedService;
        this.kafkaMessageProducer = kafkaMessageProducer;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getStudentById(@PathVariable long id) {
        Object response = service.getStudentById(id);
        if (response instanceof ErrorResponse) {
            return ResponseEntity.status(((ErrorResponse) response).getStatus()).body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping
    public ResponseEntity<Object> createStudent(@RequestBody Student student) {
        Object response = service.createStudent(student);
        if (response instanceof ErrorResponse) {
            return ResponseEntity.status(((ErrorResponse) response).getStatus()).body(response);
        } else {
            return ResponseEntity.status(201).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateStudent(@PathVariable long id, @RequestBody Student student) {
        Object response = service.updateStudent(id, student);
        if (response instanceof ErrorResponse) {
            return ResponseEntity.status(((ErrorResponse) response).getStatus()).body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteStudent(@PathVariable long id) {
        kafkaMessageProducer.sendMessage("student-deletion", String.valueOf(id));
        Object response = service.deleteStudent(id);
        if (response instanceof ErrorResponse) {
            return ResponseEntity.status(((ErrorResponse) response).getStatus()).body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteStudents(@RequestBody IdsWrapper idsWrapper) throws JsonProcessingException {
        String ids = objectMapper.writeValueAsString(idsWrapper.getIds());
        kafkaMessageProducer.sendMessage("student-deletion", ids);
        Object response = service.deleteStudents(idsWrapper.getIds());
        if (response instanceof ErrorResponse) {
            return ResponseEntity.status(((ErrorResponse) response).getStatus()).body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/seed/{count}")
    public List<Student> seedStudents(@PathVariable int count) {
        return seedService.seedStudents(count);
    }
}

class IdsWrapper {
    private List<Long> ids;

    public List<Long> getIds() {
        return ids;
    }

    public void setIds(List<Long> ids) {
        this.ids = ids;
    }
}
