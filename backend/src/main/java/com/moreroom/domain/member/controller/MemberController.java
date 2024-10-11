package com.moreroom.domain.member.controller;

import com.moreroom.domain.member.dto.request.ExistEmailDTO;
import com.moreroom.domain.member.dto.request.ExistNicknameDTO;
import com.moreroom.domain.member.dto.request.HashtagDTO;
import com.moreroom.domain.member.dto.request.MemberSignupRequestDTO;
import com.moreroom.domain.member.dto.request.MemberUpdateRequestDTO;
import com.moreroom.domain.member.dto.request.PasswordChangeDTO;
import com.moreroom.domain.member.dto.response.MemberProfileResponseDTO;
import com.moreroom.domain.member.dto.response.MemberResponseDTO;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.exception.MemberExistsEmailException;
import com.moreroom.domain.member.exception.MemberExistsNicknameException;
import com.moreroom.domain.member.exception.MemberNotFoundException;
import com.moreroom.domain.member.service.AuthService;
import com.moreroom.domain.member.service.MemberService;
import com.moreroom.global.util.FindMemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/member")
public class MemberController {

    private final MemberService memberService;
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final FindMemberService findMemberService;

    @PostMapping()
    public ResponseEntity<Member> signup(@RequestBody @Valid MemberSignupRequestDTO memberSignupRequestDTO) {

        memberService.signup(memberSignupRequestDTO);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public void login(@RequestBody Map<String, String> loginRequest, HttpServletRequest request, HttpServletResponse response) {
        try {
            boolean isAuthenticated = authService.authenticate(loginRequest.get("email"),
                loginRequest.get("password"));

            if (!isAuthenticated) {
                // 비밀번호 불일치 처리
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"wrong password\"}");
                return;
            }

            // AuthenticationManager를 통해 인증 시도
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.get("email"),
                    loginRequest.get("password")
                )
            );

            // 인증 성공 시 SecurityContextHolder에 인증 정보 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);

            Long memberId = findMemberService.findCurrentMember();
            if (memberService.checkMemberOut(memberId).equals(Boolean.TRUE)) {
                throw new MemberNotFoundException();
            }

            // 쿠키 정보 저장
            Cookie idCookie = new Cookie("memberId",
                String.valueOf(memberId));
            idCookie.setHttpOnly(true);
            idCookie.setSecure(true);
            idCookie.setMaxAge(60 * 60 * 24);
            idCookie.setPath("/");
            idCookie.setDomain("localhost");
            // 개발 환경 연결시 아래 코드로 수정
//            idCookie.setDomain("j11d206.p.ssafy.io");
            response.addCookie(idCookie);

            // 인증된 후 세션에 해당 인증 정보 저장
            HttpSession session = request.getSession(true);
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            response.setStatus(HttpServletResponse.SC_OK);
        } catch (UsernameNotFoundException e) {
            // 이메일 불일치 처리
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            try {
                response.getWriter().write("{\"error\": \"wrong email\"}");
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        } catch (MemberNotFoundException e) {
            // 탈퇴한 회원에 대한 예외 처리
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            try {
                response.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        } catch (Exception e) {
            // 일반적인 예외 처리
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            try {
                response.getWriter().write("{\"error\": \"Authentication failed.\"}");
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        }
    }


    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        // 기존 세션이 있으면 가져오고, 세션이 있으면 무효화
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();  // 세션 무효화
        }

        // JSESSIONID 쿠키 삭제
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setMaxAge(0); // 쿠키를 만료시켜 삭제
        cookie.setPath("/"); // 애플리케이션의 루트 경로
        response.addCookie(cookie); // 클라이언트에 쿠키 삭제 명령 전송

        // 상태 코드 설정
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @GetMapping("/current-user")
    public String getCurrentUser(HttpServletRequest request) {
        // 세션에서 인증된 사용자 정보 가져오기

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            String sessionId = request.getSession().getId();
            return "Authenticated user: " + authentication.getName() + ", Session ID: " + sessionId;
        } else {
            return "Anonymous";
        }
    }

    @GetMapping()
    public ResponseEntity<MemberResponseDTO> getCurrentMember() {

        MemberResponseDTO memberResponseDTO = memberService.getMemberInformation();

        if (memberResponseDTO != null) {
            return new ResponseEntity<>(memberResponseDTO, HttpStatus.OK);
        }
        throw new MemberNotFoundException();
    }

    @GetMapping("/mypage")
    public ResponseEntity<MemberProfileResponseDTO> getCurrentMemberProfile() {

        MemberProfileResponseDTO memberProfileResponseDTO = memberService.getMemberProfile();

        if (memberProfileResponseDTO != null) {
            return new ResponseEntity<>(memberProfileResponseDTO,
                HttpStatus.OK);
        }
        throw new MemberNotFoundException();
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<MemberProfileResponseDTO> getMemberById(@PathVariable(name = "memberId") Long memberId) {

        MemberProfileResponseDTO memberProfileResponseDTO = memberService.findByMemberId(memberId);

        if (memberProfileResponseDTO != null) {
            return new ResponseEntity<>(memberProfileResponseDTO, HttpStatus.OK);
        }
        throw new MemberNotFoundException();
    }

    @PatchMapping()
    public ResponseEntity<Member> updateMember(@RequestBody @Valid MemberUpdateRequestDTO memberUpdateRequestDTO) {
        memberService.updateMemberInformation(memberUpdateRequestDTO);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/exist-email")
    public ResponseEntity<Map<String, String>> emailCheck(@RequestBody @Valid ExistEmailDTO emailDTO) {
        Map<String, String> response = new HashMap<>();

        if (memberService.checkExistEmail(emailDTO.getEmail()).equals(Boolean.TRUE)) {
            throw new MemberExistsEmailException();
        }
        else {
            response.put("duplicated", "False");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @PostMapping("/exist-nickname")
    public ResponseEntity<Map<String, String>> nicknameCheck(@RequestBody @Valid ExistNicknameDTO nicknameDTO) {
        Map<String, String> response = new HashMap<>();

        if (memberService.checkExistNickname(nicknameDTO.getNickname()).equals(Boolean.TRUE)) {
            throw new MemberExistsNicknameException();
        } else {
            response.put("duplicated", "False");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @PostMapping("/password-change")
    public ResponseEntity<Member> passwordChange(@RequestBody @Valid PasswordChangeDTO passwordChangeDTO) {
        memberService.passwordChange(passwordChangeDTO);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/hashtag")
    public ResponseEntity<Member> hashtagChange(@RequestBody HashtagDTO hashtagDTO) {
        memberService.hashtagChange(hashtagDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<Member> deleteMember() {
        memberService.deleteMember();

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
