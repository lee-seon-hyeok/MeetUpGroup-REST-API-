package com.example.study308.controller;


import com.example.study308.dto.CommentForm;
import com.example.study308.dto.CommentResponse;
import com.example.study308.dto.CustomUserDetails;
import com.example.study308.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
  private final CommentService commentService;


  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<CommentResponse> findByPostId(@RequestParam Long postId) {
    return commentService.findByPostId(postId);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public CommentResponse create(
      @RequestBody CommentForm form,
      @AuthenticationPrincipal CustomUserDetails userDetails) {
    return commentService.create(form, userDetails.getUsername());
  }


  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public CommentResponse update(
      @PathVariable Long id,
      @RequestBody String content,
      @AuthenticationPrincipal CustomUserDetails userDetails) {
    return commentService.update(id, content, userDetails.getUsername());
  }


  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(
      @PathVariable Long id,
      @AuthenticationPrincipal CustomUserDetails userDetails) {
    String role = userDetails.getAuthorities().iterator().next().getAuthority();
    commentService.delete(id, userDetails.getUsername(), role);
  }

}
