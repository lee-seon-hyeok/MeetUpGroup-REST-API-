package com.example.study308.dto;


import com.example.study308.domain.Member;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponse {

  private Long id;
  private String username;
  private String role;
  private LocalDateTime createdAt;

  public static MemberResponse of(Member member) {
    return MemberResponse.builder()
        .id(member.getId())
        .username(member.getUsername())
        .role(member.getRole().name())
        .createdAt(member.getCreatedAt())
        .build();
  }
}
