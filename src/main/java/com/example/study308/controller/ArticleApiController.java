package com.example.study308.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.study308.dto.ArticleForm;
import com.example.study308.dto.ArticleResponse;
import com.example.study308.service.ArticleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleApiController {

    private final ArticleService articleService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ArticleResponse> findAllArticles() {
        return articleService.findAll();

    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ArticleResponse findArticle(@PathVariable long id) {
        return articleService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ArticleResponse addArticle(@RequestBody ArticleForm request) {
        return articleService.create(request);
    }
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ArticleResponse updateArticle(@PathVariable long id,
        @RequestBody ArticleForm request) {
        return articleService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteArticle(@PathVariable long id) {
        articleService.delete(id);
    }
}
