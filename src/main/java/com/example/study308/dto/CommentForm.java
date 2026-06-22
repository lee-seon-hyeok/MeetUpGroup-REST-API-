package com.example.study308.dto;

public record CommentForm (
  Long postId,
  Long parentId,
  String content
)
{

}
