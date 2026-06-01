package com.example.study308.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.study308.domain.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
}
