package com.moreroom.domain.member.controller;

import com.moreroom.domain.member.dto.request.MemberSignupRequestDTO;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.service.AuthService;
import com.moreroom.domain.member.service.CustomUserDetailsService;
import com.moreroom.domain.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/member")
public class MemberController {

    private final MemberService memberService;
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService customUserDetailsService;

    @PostMapping("")
    public ResponseEntity<Member> signup(@RequestBody MemberSignupRequestDTO memberSignupRequestDTO) {

        memberService.signup(memberSignupRequestDTO);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public void login(@RequestBody Map<String, String> loginRequest, HttpServletRequest request, HttpServletResponse response) {
        try {
            // AuthenticationManager를 통해 인증 시도
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.get("email"),
                    loginRequest.get("password")
                )
            );

            // 인증 성공 시 SecurityContextHolder에 인증 정보 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println(request.getSession().getId());
            System.out.println(SecurityContextHolder.getContext());
            response.setStatus(HttpServletResponse.SC_OK);
        } catch (Exception e) {
            // 인증 실패 시 처리
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().invalidate();  // 세션 무효화
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @GetMapping("/current-user")
    public String getCurrentUser(HttpServletRequest request) {
        // 세션에서 인증된 사용자 정보 가져오기

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        System.out.println(authentication);

        if (authentication != null && authentication.isAuthenticated()) {
            String sessionId = request.getSession().getId();
            return "Authenticated user: " + authentication.getName() + ", Session ID: " + sessionId;
        } else {
            return "Anonymous";
        }
    }
}
