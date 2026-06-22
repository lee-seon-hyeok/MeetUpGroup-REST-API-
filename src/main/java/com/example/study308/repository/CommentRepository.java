package com.example.study308.repository;


import com.example.study308.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>{
  List<Comment> findByPostIdAndParentIsNull(Long postId);
}
