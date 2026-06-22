package com.example.study308.service;



import com.example.study308.domain.Member;
import com.example.study308.dto.LoginForm;
import com.example.study308.dto.MemberResponse;
import com.example.study308.dto.SignupForm;
import com.example.study308.repository.MemberRepository;
import com.example.study308.jwt.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

  private final MemberRepository memberRepository;  // DB 접근 담당
  private final PasswordEncoder passwordEncoder;    // BCrypt 비밀번호 암호화 담당
  private final JWTUtil jwtUtil;                    // JWT 토큰 생성 담당


  public MemberResponse signup(SignupForm form) {

    if (memberRepository.existsByUsername(form.username())) {
      throw new IllegalArgumentException("이미 사용중인 아이디입니다.");
    }

    Member member = Member.builder()
        .username(form.username())
        .password(passwordEncoder.encode(form.password()))
        .role(Member.Role.valueOf(form.role().toUpperCase()))
        .build();

    return MemberResponse.of(memberRepository.save(member));
  }


  public String login(LoginForm form) {


    Member member = memberRepository.findByUsername(form.username())
        .orElseThrow(() -> new IllegalArgumentException("없는 아이디입니다."));


    if (!passwordEncoder.matches(form.password(), member.getPassword())) {
      throw new IllegalArgumentException("비밀번호가 틀렸습니다.");
    }


    return jwtUtil.createJwt(
        member.getUsername(),
        "ROLE_" + member.getRole().name(),
        60 * 60 * 1000L
    );
  }
}
