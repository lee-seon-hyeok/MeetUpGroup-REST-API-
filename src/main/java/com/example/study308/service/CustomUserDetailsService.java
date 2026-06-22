package com.example.study308.service;


import com.example.study308.domain.Member;
import com.example.study308.dto.CustomUserDetails;
import com.example.study308.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService  {

  private final MemberRepository memberRepository;


  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

    Member member = memberRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("없는 유저입니다: " + username));

    return new CustomUserDetails(member);
  }
}
