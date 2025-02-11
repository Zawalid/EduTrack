package com.example.demo.kafka.concumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaMessageConsumer {
    @KafkaListener(topics = "student-deletion")
    public void listen(String message) {
        System.out.println("Received Message : " + message);
    }
}
