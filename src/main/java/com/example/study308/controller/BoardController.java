package com.example.study308.controller;


import com.example.study308.dto.BoardForm;
import com.example.study308.dto.BoardResponse;
import com.example.study308.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {
  private final BoardService boardService;

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<BoardResponse> findAll(){
    return boardService.findAll();
  }

  @GetMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public BoardResponse findById(@PathVariable Long id){
    return boardService.findById(id);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public BoardResponse create(@RequestBody BoardForm form){
    return boardService.create(form);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id){
    boardService.delete(id);
  }
}
