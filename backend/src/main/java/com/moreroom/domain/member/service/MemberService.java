package com.moreroom.domain.member.service;

import com.moreroom.domain.member.dto.request.MemberSignupRequestDTO;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void signup(MemberSignupRequestDTO memberSignupRequestDTO) {

        if (!memberSignupRequestDTO.getPassword().equals(memberSignupRequestDTO.getPasswordCheck())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        if (memberRepository.existsByEmail(memberSignupRequestDTO.getEmail())) {
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }

        if (memberRepository.existsByNickname(memberSignupRequestDTO.getNickname())) {
            throw new RuntimeException("이미 존재하는 닉네임입니다.");
        }


        Member member = Member.builder()
            .email(memberSignupRequestDTO.getEmail())
            .password(passwordEncoder.encode(memberSignupRequestDTO.getPassword()))
            .nickname(memberSignupRequestDTO.getNickname())
            .gender(memberSignupRequestDTO.getGender())
            .birth(memberSignupRequestDTO.getBirth())
            .clearRoom(memberSignupRequestDTO.getClearRoom())
            .build();

        memberRepository.save(member);
    }
}
