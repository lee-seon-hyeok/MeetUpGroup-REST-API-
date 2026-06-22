package com.example.study308.controller;

import com.example.study308.domain.Post;
import com.example.study308.dto.PostForm;
import com.example.study308.dto.PostResponse;
import com.example.study308.dto.CustomUserDetails;
import com.example.study308.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

  private final PostService postService;

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<PostResponse> findByBoardId(@RequestParam Long boardId){
    return postService.findByBoardId(boardId);
  }

  @GetMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public PostResponse findById(@PathVariable Long id){
    return postService.findById(id);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public PostResponse create(
          @RequestBody PostForm form,
          @AuthenticationPrincipal CustomUserDetails userDetails){
          return postService.create(form, userDetails.getUsername());
  }


  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public PostResponse update(
    @PathVariable Long id,
    @RequestBody PostForm form,
    @AuthenticationPrincipal CustomUserDetails userDetails){
    return postService.update(id, form, userDetails.getUsername());
  }


  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(
      @PathVariable Long id,
      @AuthenticationPrincipal CustomUserDetails userDetails){
    String role = userDetails.getAuthorities().iterator().next().getAuthority();
    postService.delete(id, userDetails.getUsername(),role);
  }

  @PatchMapping("/{id}/hide")
  @ResponseStatus(HttpStatus.OK)
  public PostResponse hidePost(@PathVariable Long id){
    return postService.hidePost(id);
  }

  @PatchMapping("/{id}/show")
  @ResponseStatus(HttpStatus.OK)
  public PostResponse showPost(@PathVariable Long id) {
    return postService.showPost(id);
  }

}
