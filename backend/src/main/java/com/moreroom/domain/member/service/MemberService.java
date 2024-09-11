package com.moreroom.domain.member.service;

import com.moreroom.domain.member.dto.request.MemberSignupRequestDTO;
import com.moreroom.domain.member.dto.request.MemberUpdateRequestDTO;
import com.moreroom.domain.member.dto.response.MemberProfileResponseDTO;
import com.moreroom.domain.member.dto.response.MemberResponseDTO;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
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
            .regionId(memberSignupRequestDTO.getRegionId())
            .birth(memberSignupRequestDTO.getBirth())
            .build();

        memberRepository.save(member);
    }

    public MemberResponseDTO getMemberInformation() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        if (memberRepository.findByEmail(email).isPresent()) {
            return MemberResponseDTO.toDTO(memberRepository.findByEmail(email).get());
        }
        return null;
    }

    public MemberProfileResponseDTO getMemberProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        if (memberRepository.findByEmail(email).isPresent()) {
            return MemberProfileResponseDTO.toDTO(memberRepository.findByEmail(email).get());
        }
        return null;
    }

    public MemberProfileResponseDTO findByMemberId(Long memberId) {
        if (memberRepository.findById(memberId).isPresent()) {
            return MemberProfileResponseDTO.toDTO(memberRepository.findById(memberId).get());
        }
        return null;
    }

    @Transactional
    public void updateMemberInformation(MemberUpdateRequestDTO memberUpdateRequestDTO) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        if (memberRepository.findByEmail(email).isPresent()) {
            Member member = memberRepository.findByEmail(email).get();

            member.updateMember(memberUpdateRequestDTO);
        }
        else {
            throw new RuntimeException();
        }
    }
}
