package com.example.study308.service;

import com.example.study308.domain.Board;
import com.example.study308.domain.Member;
import com.example.study308.domain.Post;
import com.example.study308.dto.PostForm;
import com.example.study308.dto.PostResponse;
import com.example.study308.repository.PostRepository;
import com.example.study308.repository.MemberRepository;
import com.example.study308.repository.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {
  private final PostRepository postRepository;
  private final BoardRepository boardRepository;
  private final MemberRepository memberRepository;

  public List<PostResponse> findByBoardId(Long boardId){
    return postRepository.findByBoardId(boardId).stream()
        .map(PostResponse::of)
        .toList();
  }

  public PostResponse findById(Long id) {
    Post post = postRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("not found: " + id));
    return PostResponse.of(post);
  }

  public PostResponse create(PostForm form, String username){
    Board board = boardRepository.findById(form.boardId())
        .orElseThrow(() -> new IllegalArgumentException("없는 게시판입니다."));

    Member member = memberRepository.findByUsername(username)
        .orElseThrow(()-> new IllegalArgumentException("없는 유저입니다."));

    Post post = Post.builder()
        .board(board)
        .member(member)
        .postTitle(form.postTitle())
        .content(form.content())
        .build();

    return PostResponse.of(postRepository.save(post));
  }


  public PostResponse update(Long id, PostForm form, String username){
    Post post = postRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("not found :" + id));

    if (!post.getMember().getUsername().equals(username)){
      throw new IllegalArgumentException("본인의 게시글만 수정할 수 있습니다.");

    }
    post.update(form.postTitle(), form.content());
    return PostResponse.of(post);
  }

  public void delete(Long id, String username, String role){
    Post post = postRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("not found" + id));

    if(!post.getMember().getUsername().equals(username) && !role.equals("ROLE_ADMIN")){
      throw new IllegalArgumentException("관리자 또는 본인 게시글만 삭제할 수 있습니다.");
    }
    postRepository.deleteById(id);
  }

  public PostResponse hidePost(Long id){
    Post post = postRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("not found" + id));
    post.hide();
    return  PostResponse.of(post);
  }

  public PostResponse showPost(Long id) {
    Post post = postRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("not found: " + id));
    post.show();
    return PostResponse.of(post);
  }

}
