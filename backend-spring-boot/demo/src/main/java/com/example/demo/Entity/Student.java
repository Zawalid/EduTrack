package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true)
    private String cne;
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String className;
    private String field;
    private float average;
}
