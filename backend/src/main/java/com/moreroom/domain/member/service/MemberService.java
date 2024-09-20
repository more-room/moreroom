package com.moreroom.domain.member.service;

import com.moreroom.domain.hashtag.entity.Hashtag;
import com.moreroom.domain.hashtag.repository.HashtagRepository;
import com.moreroom.domain.mapping.member.entity.MemberHashtagMapping;
import com.moreroom.domain.mapping.member.repository.MemberHashtagMappingRepository;
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
import com.moreroom.domain.member.exception.MemberPasswordNotMatchedException;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.domain.region.entity.Region;
import com.moreroom.domain.region.repository.RegionRepository;
import com.moreroom.global.util.FindMemberService;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final HashtagRepository hashtagRepository;
    private final RegionRepository regionRepository;
    private final MemberHashtagMappingRepository memberHashtagMappingRepository;
    private final PasswordEncoder passwordEncoder;
    private final FindMemberService findMemberService;

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
            .region(regionRepository.getReferenceById(memberSignupRequestDTO.getRegionId()))
            .birth(memberSignupRequestDTO.getBirth())
            .build();

        memberRepository.save(member);
    }

    public MemberResponseDTO getMemberInformation() {

        return MemberResponseDTO.toDTO(memberRepository.getReferenceById(findMemberService.findCurrentMember()));
    }

    public MemberProfileResponseDTO getMemberProfile() {

        return MemberProfileResponseDTO.toDTO(memberRepository.getReferenceById(findMemberService.findCurrentMember()));
    }

    public MemberProfileResponseDTO findByMemberId(Long memberId) {

        if (memberRepository.findById(memberId).isPresent()) {
            return MemberProfileResponseDTO.toDTO(memberRepository.findById(memberId).get());
        }
        throw new MemberNotFoundException();
    }

    @Transactional
    public void updateMemberInformation(MemberUpdateRequestDTO memberUpdateRequestDTO) {

        Member member = memberRepository.getReferenceById(findMemberService.findCurrentMember());
        Region region = regionRepository.getReferenceById(memberUpdateRequestDTO.getRegionId());
        member.updateMember(memberUpdateRequestDTO, region);
    }

    public Boolean checkExistEmail(String email) {

        return memberRepository.existsByEmail(email);
    }

    public Boolean checkExistNickname(String nickname) {

        return memberRepository.existsByNickname(nickname);
    }

    @Transactional
    public void passwordChange(PasswordChangeDTO passwordChangeDTO) {

        if (!passwordChangeDTO.getNewPassword().equals(passwordChangeDTO.getNewPasswordCheck())) {
            throw new MemberPasswordNotMatchedException();
        }

        Member member = memberRepository.getReferenceById(findMemberService.findCurrentMember());
        member.changePassword(passwordEncoder.encode(passwordChangeDTO.getNewPassword()));
    }

    @Transactional
    public void hashtagChange(HashtagDTO hashtagDTO) {

        Member member = memberRepository.getReferenceById(findMemberService.findCurrentMember());

        List<Integer> hashtagIdList = hashtagDTO.getHashtagList();

        List<Hashtag> hashtagList = hashtagRepository.findAllById(hashtagIdList);

        for (Hashtag hashtag : hashtagList) {
            if (memberHashtagMappingRepository.existsMemberHashtagMappingByMemberAndHashtag(member, hashtag)) {
                MemberHashtagMapping memberHashtagMapping = memberHashtagMappingRepository.findByMemberAndHashtag(member, hashtag);

                memberHashtagMappingRepository.delete(memberHashtagMapping);
            } else {
                MemberHashtagMapping memberHashtagMapping = MemberHashtagMapping.builder()
                    .member(member)
                    .hashtag(hashtag)
                    .build();
                memberHashtagMappingRepository.save(memberHashtagMapping);
            }
        }
    }
}
