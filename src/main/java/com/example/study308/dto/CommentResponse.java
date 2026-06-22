package com.example.study308.dto;


import com.example.study308.domain.Comment;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponse {

  private Long id;
  private Long postId;
  private Long memberId;
  private String username;
  private String content;
  private Long parentId;
  private List<CommentResponse> replies;
  private boolean isHidden;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;


  public static CommentResponse of(Comment comment) {
    return CommentResponse.builder()
        .id(comment.getId())
        .postId(comment.getPost().getId())
        .memberId(comment.getMember().getId())
        .username(comment.getMember().getUsername())
        .content(comment.getContent())
        .parentId(comment.getParent() != null ? comment.getParent().getId() : null)
        .replies(comment.getReplies().stream()
            .map(CommentResponse::of)
            .toList())
        .isHidden(comment.isHidden())
        .createdAt(comment.getCreatedAt())
        .updatedAt(comment.getUpdatedAt())
        .build();
  }
}
