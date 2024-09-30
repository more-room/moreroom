package com.moreroom.domain.member.service;

import com.moreroom.domain.genre.dto.response.GenreResponseDTO;
import com.moreroom.domain.genre.entity.Genre;
import com.moreroom.domain.genre.repository.GenreRepository;
import com.moreroom.domain.hashtag.dto.response.HashtagResponseDTO;
import com.moreroom.domain.hashtag.entity.Hashtag;
import com.moreroom.domain.hashtag.repository.HashtagRepository;
import com.moreroom.domain.mapping.member.entity.MemberGenreMapping;
import com.moreroom.domain.mapping.member.entity.MemberHashtagMapping;
import com.moreroom.domain.mapping.member.repository.MemberGenreMappingRepository;
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
    private final MemberGenreMappingRepository memberGenreMappingRepository;
    private final GenreRepository genreRepository;

    @Transactional
    public void signup(MemberSignupRequestDTO memberSignupRequestDTO) {

        if (!memberSignupRequestDTO.getPassword().equals(memberSignupRequestDTO.getPasswordCheck())) {
            throw new MemberPasswordNotMatchedException();
        }

        if (memberRepository.existsByEmailAndDelFlagFalse(memberSignupRequestDTO.getEmail())) {
            throw new MemberExistsEmailException();
        }

        if (memberRepository.existsByNicknameAndDelFlagFalse(
            memberSignupRequestDTO.getNickname())) {
            throw new MemberExistsNicknameException();
        }

        Member member = Member.builder()
            .email(memberSignupRequestDTO.getEmail())
            .password(passwordEncoder.encode(memberSignupRequestDTO.getPassword()))
            .nickname(memberSignupRequestDTO.getNickname())
            .gender(!memberSignupRequestDTO.getGender().equals("M"))
            .region(regionRepository.getReferenceById(memberSignupRequestDTO.getRegionId()))
            .birth(memberSignupRequestDTO.getBirth())
            .build();

        memberRepository.save(member);

        List<Integer> genreIdList = memberSignupRequestDTO.getGenreIdList();

        for (Integer genreId : genreIdList) {
            MemberGenreMapping memberGenreMapping = MemberGenreMapping.builder()
                .member(member)
                .genre(genreRepository.getReferenceById(genreId))
                .build();

            memberGenreMappingRepository.save(memberGenreMapping);
        }
    }

    public MemberResponseDTO getMemberInformation() {

        return MemberResponseDTO.toDTO(memberRepository.getReferenceById(findMemberService.findCurrentMember()));
    }

    public MemberProfileResponseDTO getMemberProfile() {

        Long memberId = findMemberService.findCurrentMember();

        Member member = memberRepository.getReferenceById(memberId);

        List<MemberHashtagMapping> hashtagMappingList = memberHashtagMappingRepository.findByMember(member);

        List<HashtagResponseDTO> hashtagList = hashtagMappingList.stream()
            .map(mapping -> {
                Hashtag hashtag = mapping.getHashtag();
                return HashtagResponseDTO.toDTO(hashtag);
            })
            .toList();

        List<MemberGenreMapping> genreMappingList = memberGenreMappingRepository.findByMember(member);

        List<GenreResponseDTO> genreList = genreMappingList.stream()
            .map(mapping -> {
                Genre genre = mapping.getGenre();
                return GenreResponseDTO.toDTO(genre);
            })
            .toList();

        return MemberProfileResponseDTO.toDTO(member, genreList, hashtagList);
    }

    public MemberProfileResponseDTO findByMemberId(Long memberId) {

        if (memberRepository.findById(memberId).isPresent()) {

            Member member = memberRepository.getReferenceById(memberId);

            List<MemberHashtagMapping> hashtagMappingList = memberHashtagMappingRepository.findByMember(member);

            List<HashtagResponseDTO> hashtagList = hashtagMappingList.stream()
                .map(mapping -> {
                    Hashtag hashtag = mapping.getHashtag();
                    return HashtagResponseDTO.toDTO(hashtag);
                })
                .toList();

            List<MemberGenreMapping> genreMappingList = memberGenreMappingRepository.findByMember(member);

            List<GenreResponseDTO> genreList = genreMappingList.stream()
                .map(mapping -> {
                    Genre genre = mapping.getGenre();
                    return GenreResponseDTO.toDTO(genre);
                })
                .toList();

            return MemberProfileResponseDTO.toDTO(member, genreList, hashtagList);
        }
        throw new MemberNotFoundException();
    }

    @Transactional
    public void updateMemberInformation(MemberUpdateRequestDTO memberUpdateRequestDTO) {

        Member member = memberRepository.getReferenceById(findMemberService.findCurrentMember());
        Region region = regionRepository.getReferenceById(memberUpdateRequestDTO.getRegionId());

        member.updateMember(memberUpdateRequestDTO, region);

        // 회원 정보 업데이트 시 장르 리스트 목록 업데이트(있으면 삭제, 없으면 생성)
        List<Integer> genreIdList = memberUpdateRequestDTO.getGenreIdList();
        for (Integer genreId : genreIdList) {
            Genre genre = genreRepository.getReferenceById(genreId);

            if (memberGenreMappingRepository.existsByMemberAndGenre(member, genre)) {
                MemberGenreMapping memberGenreMapping = memberGenreMappingRepository.findByMemberAndGenre(member, genre);

                memberGenreMappingRepository.delete(memberGenreMapping);
            } else {
                MemberGenreMapping memberGenreMapping = MemberGenreMapping.builder()
                    .member(member)
                    .genre(genre)
                    .build();

                memberGenreMappingRepository.save(memberGenreMapping);
            }
        }
    }

    public Boolean checkExistEmail(String email) {

        return memberRepository.existsByEmailAndDelFlagFalse(email);
    }

    public Boolean checkExistNickname(String nickname) {

        return memberRepository.existsByNicknameAndDelFlagFalse(nickname);
    }

    public Boolean checkMemberOut(Long memberId) {

        Member member = memberRepository.getReferenceById(memberId);

        if (member.getDelFlag().equals(Boolean.TRUE)) {
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
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

    @Transactional
    public void deleteMember() {
        Long memberId = findMemberService.findCurrentMember();

        Member member = memberRepository.getReferenceById(memberId);

        member.deleteMember();
    }
}
