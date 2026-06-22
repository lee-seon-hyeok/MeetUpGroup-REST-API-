package com.example.study308.controller;


import com.example.study308.dto.LoginForm;
import com.example.study308.dto.MemberResponse;
import com.example.study308.dto.SignupForm;
import com.example.study308.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

  private final MemberService memberService;

  @PostMapping("/signup")
  @ResponseStatus(HttpStatus.CREATED)
  public MemberResponse signup(@RequestBody SignupForm form) {
    return memberService.signup(form);
  }


  @PostMapping("/login")
  @ResponseStatus(HttpStatus.OK)
  public String login(@RequestBody LoginForm form) {
    return memberService.login(form);
  }

}
