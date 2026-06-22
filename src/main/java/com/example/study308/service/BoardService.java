package com.example.study308.service;


import com.example.study308.domain.Board;
import com.example.study308.dto.BoardForm;
import com.example.study308.dto.BoardResponse;
import com.example.study308.repository.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {
  private final BoardRepository boardRepository;

  public List<BoardResponse> findAll(){
    return boardRepository.findAll().stream()
        .map(BoardResponse::of)
        .toList();
  }

  public BoardResponse findById(Long id){
    return BoardResponse.of(
        boardRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("not found:" + id))
    );
  }

  public BoardResponse create(BoardForm form){
    Board board = Board.builder()
        .name(form.name())
        .description(form.description())
        .build();
    return BoardResponse.of(boardRepository.save(board));
  }

  public void delete(Long id){
    boardRepository.deleteById(id);
  }
}
