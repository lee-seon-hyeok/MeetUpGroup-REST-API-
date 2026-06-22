package com.example.study308.config;


import com.example.study308.service.CustomUserDetailsService;
import com.example.study308.jwt.JWTFilter;
import com.example.study308.jwt.JWTUtil;
import com.example.study308.jwt.LoginFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.http.HttpMethod;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final JWTUtil jwtUtil;
  private final CustomUserDetailsService customUserDetailsService;


  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }


  @Bean
  public AuthenticationManager authenticationManager(
      AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

  @Bean
  public OpenAPI openAPI() {
    SecurityScheme securityScheme = new SecurityScheme()
        .type(SecurityScheme.Type.HTTP)
        .scheme("bearer")
        .bearerFormat("JWT")
        .name("Authorization");

    SecurityRequirement securityRequirement = new SecurityRequirement()
        .addList("Authorization");

    return new OpenAPI()
        .components(new Components()
            .addSecuritySchemes("Authorization", securityScheme))
        .addSecurityItem(securityRequirement);
  }


  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http,
                                         AuthenticationManager authenticationManager) throws Exception {
    http
        // CSRF 비활성화 (JWT 방식은 세션 안 쓰므로 불필요)
        .csrf(csrf -> csrf.disable())

        // 폼 로그인 비활성화 (REST API라 불필요)
        .formLogin(form -> form.disable())

        // HTTP Basic 인증 비활성화
        .httpBasic(basic -> basic.disable())

        // 세션 비활성화 (JWT는 Stateless)
        .sessionManagement(session ->
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

        // URL별 접근 권한 설정
        .authorizeHttpRequests(auth -> auth
            // 회원가입, 로그인, Swagger는 누구나 접근 가능
            .requestMatchers(
                "/api/members/signup",
                "/api/members/login",
                "/swagger-ui/**",
                "/v3/api-docs/**"
            ).permitAll()
            // Board 생성/삭제는 ADMIN만 가능
            .requestMatchers("/api/boards").hasRole("ADMIN")
            // POST는 ADMIN만 가능
            .requestMatchers(HttpMethod.POST, "/api/boards").hasRole("ADMIN")
            // DELETE는 ADMIN만 가능
            .requestMatchers(HttpMethod.DELETE, "/api/boards/**").hasRole("ADMIN")
            // 나머지는 로그인한 유저만 접근 가능
            .requestMatchers(HttpMethod.PATCH, "/api/posts/*/hide").hasRole("ADMIN")
            .requestMatchers(HttpMethod.PATCH, "/api/posts/*/show").hasRole("ADMIN")
            .anyRequest().authenticated()
        )

        // JWT 필터 등록 (LoginFilter 앞에 JwtFilter 실행)
        .addFilterBefore(new JWTFilter(jwtUtil),
            UsernamePasswordAuthenticationFilter.class)

        // 로그인 필터 등록
        .addFilterAt(new LoginFilter(authenticationManager, jwtUtil),
            UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

}
