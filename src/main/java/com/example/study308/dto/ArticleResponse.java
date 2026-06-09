package com.example.study308.dto;

import com.example.study308.domain.Article;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArticleResponse {
	private Long id;
	private String title;
	private String content;

	public static ArticleResponse of(Article article){
		return ArticleResponse.builder()
			.id(article.getId())
			.title(article.getTitle())
			.content(article.getContent())
			.build();
	}
}
