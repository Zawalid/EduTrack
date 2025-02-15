package com.example.demo.Model;

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
    private String prof_id;
    @Column(unique = true)
    private String cne;
    private String userId;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String email;
    private String className;
    private String field;
    private double average;
}
