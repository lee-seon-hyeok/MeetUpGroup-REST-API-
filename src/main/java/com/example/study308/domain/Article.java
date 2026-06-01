package com.example.study308.domain;

import com.example.study308.dto.ArticleForm;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Article {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private String content;

	public static Article of (ArticleForm form){
		return Article.builder()
			.title(form.title())
			.content(form.content())
			.build();
	}
	public static Article update (ArticleForm form){
		return Article.builder()
			.title(form.title())
			.content(form.content())
			.build();
	}
}
