package com.example.study308.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.study308.domain.Article;
import com.example.study308.dto.ArticleForm;
import com.example.study308.dto.ArticleResponse;
import com.example.study308.repository.ArticleRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ArticleService {

    private final ArticleRepository articleRepository;

    public List<ArticleResponse> findAll() {
        return articleRepository.findAll().stream()
            .map(ArticleResponse::of)
            .toList();
    }

    public ArticleResponse findById(long id) {
        return ArticleResponse.of(
            articleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found: " + id))
        );
    }

    public ArticleResponse create(ArticleForm request) {
        return ArticleResponse.of(articleRepository.save(Article.of(request)));
    }

    public ArticleResponse update(long id, ArticleForm form) {
        Article article = articleRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("not found: " + id));

        article.update(form);

        return ArticleResponse.of(article);
    }

    public void delete(long id) {
        articleRepository.deleteById(id);
    }
}
