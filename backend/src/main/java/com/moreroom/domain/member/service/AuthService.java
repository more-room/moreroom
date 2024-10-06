package com.moreroom.domain.member.service;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public boolean authenticate(String email, String rawPassword) {
        // 이메일로 사용자 조회
        Member member = memberRepository.findByEmailAndDelFlagFalse(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return passwordEncoder.matches(rawPassword, member.getPassword());
    }
}