package com.example.study308.service;
import com.example.study308.domain.Comment;
import com.example.study308.domain.Member;
import com.example.study308.domain.Post;
import com.example.study308.dto.CommentForm;
import com.example.study308.dto.CommentResponse;
import com.example.study308.repository.CommentRepository;
import com.example.study308.repository.MemberRepository;
import com.example.study308.repository.PostRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {
  private final CommentRepository commentRepository;
  private final PostRepository postRepository;
  private final MemberRepository memberRepository;


  public List<CommentResponse> findByPostId(Long postId) {
    return commentRepository.findByPostIdAndParentIsNull(postId).stream()
        .map(CommentResponse::of)
        .toList();
  }


  public CommentResponse create(CommentForm form, String username) {
    Post post = postRepository.findById(form.postId())
        .orElseThrow(() -> new IllegalArgumentException("없는 게시글입니다."));

    Member member = memberRepository.findByUsername(username)
        .orElseThrow(() -> new IllegalArgumentException("없는 유저입니다."));


    Comment parent = null;
    if (form.parentId() != null) {
      parent = commentRepository.findById(form.parentId())
          .orElseThrow(() -> new IllegalArgumentException("없는 댓글입니다."));
    }

    Comment comment = Comment.builder()
        .post(post)
        .member(member)
        .content(form.content())
        .parent(parent)
        .build();

    return CommentResponse.of(commentRepository.save(comment));
  }


  public CommentResponse update(Long id, String content, String username) {
    Comment comment = commentRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("없는 댓글입니다."));

    if (!comment.getMember().getUsername().equals(username)) {
      throw new IllegalArgumentException("본인의 댓글만 수정할 수 있습니다.");
    }

    comment.update(content);
    return CommentResponse.of(comment);
  }


  public void delete(Long id, String username, String role) {
    Comment comment = commentRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("없는 댓글입니다."));

    if (!comment.getMember().getUsername().equals(username) && !role.equals("ROLE_ADMIN")) {
      throw new IllegalArgumentException("본인의 댓글만 삭제할 수 있습니다.");
    }

    commentRepository.deleteById(id);
  }
}
