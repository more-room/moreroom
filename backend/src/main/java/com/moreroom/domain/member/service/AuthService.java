package com.moreroom.domain.member.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public boolean authenticate(String email, String rawPassword) {
        // 이메일로 사용자 조회
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // 사용자가 입력한 비밀번호(평문)와 데이터베이스의 암호화된 비밀번호 비교
        return passwordEncoder.matches(rawPassword, member.getPassword());
    }
}
