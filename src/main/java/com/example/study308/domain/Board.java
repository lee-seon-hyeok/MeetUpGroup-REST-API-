package com.example.study308.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Board {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@Column(nullable = false, unique = true)
private String name;
private String description;

@Column(nullable = false,updatable = false)
private LocalDateTime createdAt;

@PrePersist
  protected  void onCreate(){
  this.createdAt = LocalDateTime.now();
}
}
