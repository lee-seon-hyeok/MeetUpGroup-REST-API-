package com.example.study308.dto;

import com.example.study308.domain.Board;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardResponse {

  private Long id;
  private String name;
  private String description;
  private LocalDateTime createdAt;

  public static BoardResponse of (Board board){
    return BoardResponse.builder()
        .id(board.getId())
        .name(board.getName())
        .description(board.getDescription())
        .createdAt(board.getCreatedAt())
        .build();
  }
}
