package com.moreroom.domain.member.security.config;

import com.moreroom.domain.member.security.fliter.RequestProcessingFilter;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/**", "/").permitAll()
                .anyRequest().permitAll()
            )
            .sessionManagement(session -> session
                .maximumSessions(1) // 한 사용자당 세션 하나만 허용
                .maxSessionsPreventsLogin(true)) // 중복 로그인 방지;
            .cors(c -> {
                CorsConfigurationSource source = request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(
                        Arrays.asList("http://localhost:8080", "http://localhost:8081", "http://localhost:3000",
                            "https://localhost:443", "http://localhost:80"));
                    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE"));
                    config.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type", "*"));
                    config.setAllowCredentials(true);
                    return config;
                };
                c.configurationSource(source);
            })
            .csrf(AbstractHttpConfigurer::disable)
            .httpBasic(AbstractHttpConfigurer::disable)
            .formLogin(AbstractHttpConfigurer::disable)
            .addFilterBefore(requestProcessingFilter(http), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();  // 세션 만료 이벤트 처리
    }

    @Bean
    public AuthenticationManager authenticationManager(
        AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public RequestProcessingFilter requestProcessingFilter(HttpSecurity http) throws Exception {

        AuthenticationManager authenticationManager = http.getSharedObject(
            AuthenticationManagerBuilder.class).build();

        RequestProcessingFilter rpf = new RequestProcessingFilter("/ssoLogin.html");
        rpf.setAuthenticationManager(authenticationManager);
        return rpf;
    }
}
