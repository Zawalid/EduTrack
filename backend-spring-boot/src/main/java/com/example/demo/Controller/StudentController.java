package com.example.demo.Controller;

import com.example.demo.Model.Student;
import com.example.demo.Service.StudentSeedService;
import com.example.demo.Service.StudentService;
import com.example.demo.kafka.producer.KafkaMessageProducer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    public Student getStudentById(@PathVariable long id) {
        return service.getStudentById(id);
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return service.createStudent(student);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable long id, @RequestBody Student student) {
        return service.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable long id) {
        kafkaMessageProducer.sendMessage("student-deletion", String.valueOf(id));
        service.deleteStudent(id);
    }

    @DeleteMapping("/delete")
    public void deleteStudents(@RequestBody IdsWrapper idsWrapper) throws JsonProcessingException {
        String ids = objectMapper.writeValueAsString(idsWrapper.getIds());
        kafkaMessageProducer.sendMessage("student-deletion", ids);
        service.deleteStudents(idsWrapper.getIds());
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
