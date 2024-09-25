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
import com.moreroom.domain.member.service.MemberService;
import com.moreroom.global.util.FindMemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final AuthenticationManager authenticationManager;
    private final FindMemberService findMemberService;

    @PostMapping("")
    public ResponseEntity<Member> signup(@RequestBody @Valid MemberSignupRequestDTO memberSignupRequestDTO) {

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

            // 쿠키 정보 저장
            Cookie idCookie = new Cookie("memberId",
                String.valueOf(findMemberService.findCurrentMember()));
            idCookie.setHttpOnly(true);
            idCookie.setSecure(true);
            idCookie.setMaxAge(60 * 60 * 24);
            idCookie.setPath("/");
            idCookie.setDomain("j11d206.p.ssafy.io");
            response.addCookie(idCookie);

            // 인증된 후 세션에 해당 인증 정보 저장
            HttpSession session = request.getSession(true);
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

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

        if (authentication != null && authentication.isAuthenticated()) {
            String sessionId = request.getSession().getId();
            return "Authenticated user: " + authentication.getName() + ", Session ID: " + sessionId;
        } else {
            return "Anonymous";
        }
    }

    @GetMapping("")
    public ResponseEntity<MemberResponseDTO> getCurrentMember() {

        MemberResponseDTO memberResponseDTO = memberService.getMemberInformation();

        if (memberResponseDTO != null) {
            return new ResponseEntity<>(memberResponseDTO,
                HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/mypage")
    public ResponseEntity<MemberProfileResponseDTO> getCurrentMemberProfile() {

        MemberProfileResponseDTO memberProfileResponseDTO = memberService.getMemberProfile();

        if (memberProfileResponseDTO != null) {
            return new ResponseEntity<>(memberProfileResponseDTO,
                HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<MemberProfileResponseDTO> getMemberById(@PathVariable(name = "memberId") Long memberId) {

        MemberProfileResponseDTO memberProfileResponseDTO = memberService.findByMemberId(memberId);

        if (memberProfileResponseDTO != null) {
            return new ResponseEntity<>(memberProfileResponseDTO,
                HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PatchMapping("")
    public ResponseEntity<Member> updateMember(@RequestBody @Valid MemberUpdateRequestDTO memberUpdateRequestDTO) {
        memberService.updateMemberInformation(memberUpdateRequestDTO);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/exist-email")
    public ResponseEntity<Map<String, String>> emailCheck(@RequestBody @Valid ExistEmailDTO emailDTO) {
        Map<String, String> response = new HashMap<>();

        if (memberService.checkExistEmail(emailDTO.getEmail()).equals(Boolean.TRUE)) {
            response.put("duplicated", "True");
            return new ResponseEntity<>(response, HttpStatus.OK);
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
            response.put("duplicated", "True");
            return new ResponseEntity<>(response, HttpStatus.OK);
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
}
