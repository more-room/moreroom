package com.moreroom.domain.member.service;

import com.moreroom.domain.member.dto.request.MemberSignupRequestDTO;
import com.moreroom.domain.member.dto.request.MemberUpdateRequestDTO;
import com.moreroom.domain.member.dto.request.PasswordChangeDTO;
import com.moreroom.domain.member.dto.response.MemberProfileResponseDTO;
import com.moreroom.domain.member.dto.response.MemberResponseDTO;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.exception.MemberExistsEmailException;
import com.moreroom.domain.member.exception.MemberExistsNicknameException;
import com.moreroom.domain.member.exception.MemberNotFoundException;
import com.moreroom.domain.member.exception.MemberPasswordNotMatchedException;
import com.moreroom.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void signup(MemberSignupRequestDTO memberSignupRequestDTO) {

        if (!memberSignupRequestDTO.getPassword().equals(memberSignupRequestDTO.getPasswordCheck())) {
            throw new MemberPasswordNotMatchedException();
        }

        if (memberRepository.existsByEmail(memberSignupRequestDTO.getEmail())) {
            throw new MemberExistsEmailException();
        }

        if (memberRepository.existsByNickname(memberSignupRequestDTO.getNickname())) {
            throw new MemberExistsNicknameException();
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
        throw new MemberNotFoundException();
    }

    public MemberProfileResponseDTO getMemberProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        if (memberRepository.findByEmail(email).isPresent()) {
            return MemberProfileResponseDTO.toDTO(memberRepository.findByEmail(email).get());
        }
        throw new MemberNotFoundException();
    }

    public MemberProfileResponseDTO findByMemberId(Long memberId) {
        if (memberRepository.findById(memberId).isPresent()) {
            return MemberProfileResponseDTO.toDTO(memberRepository.findById(memberId).get());
        }
        throw new MemberNotFoundException();
    }

    @Transactional
    public void updateMemberInformation(MemberUpdateRequestDTO memberUpdateRequestDTO) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        if (memberRepository.findByEmail(email).isPresent()) {
            Member member = memberRepository.findByEmail(email).get();

            member.updateMember(memberUpdateRequestDTO);
        }
        else {
            throw new MemberNotFoundException();
        }
    }

    public Boolean checkExistEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

    public Boolean checkExistNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    @Transactional
    public void passwordChange(PasswordChangeDTO passwordChangeDTO) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        if (!passwordChangeDTO.getNewPassword().equals(passwordChangeDTO.getNewPasswordCheck())) {
            throw new MemberPasswordNotMatchedException();
        }

        if (memberRepository.findByEmail(email).isPresent()) {
            Member member = memberRepository.findByEmail(email).get();
            member.changePassword(passwordEncoder.encode(passwordChangeDTO.getNewPassword()));
        }
    }
}
