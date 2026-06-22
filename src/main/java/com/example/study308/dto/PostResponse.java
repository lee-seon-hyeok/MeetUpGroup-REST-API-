package com.example.study308.dto;

import com.example.study308.domain.Post;
import lombok.*;
import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostResponse {

  private Long id;
  private Long boardId;
  private String boardName;
  private Long memberId;
  private String username;
  private String postTitle;
  private String content;
  private int viewCount;
  private boolean isHidden;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public static PostResponse of(Post post){
    return PostResponse.builder()
        .id(post.getId())
        .boardId(post.getBoard().getId())
        .boardName(post.getBoard().getName())
        .memberId(post.getMember().getId())
        .username(post.getMember().getUsername())
        .postTitle(post.getPostTitle())
        .content(post.getContent())
        .viewCount(post.getViewCount())
        .isHidden(post.isHidden())
        .createdAt(post.getCreatedAt())
        .updatedAt(post.getUpdatedAt())
        .build();
  }

}
