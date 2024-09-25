package com.moreroom.domain.review.service;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.domain.review.dto.request.ReviewRequestDTO;
import com.moreroom.domain.review.dto.response.ReviewResponseDTO;
import com.moreroom.domain.review.entity.Review;
import com.moreroom.domain.review.repository.ReviewRepository;
import com.moreroom.domain.theme.repository.ThemeRepository;
import com.moreroom.global.util.FindMemberService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final FindMemberService findMemberService;
    private final MemberRepository memberRepository;
    private final ThemeRepository themeRepository;

    public void save(ReviewRequestDTO reviewRequestDTO) {

        Long memberId = findMemberService.findCurrentMember();

        Member member = memberRepository.getReferenceById(memberId);

        Review review = Review.builder()
            .member(member)
            .theme(themeRepository.getReferenceById(reviewRequestDTO.getThemeId()))
            .content(reviewRequestDTO.getContent())
            .score(reviewRequestDTO.getScore())
            .build();

        reviewRepository.save(review);
    }

    public List<ReviewResponseDTO> findAll(Integer themeId) {
        return reviewRepository.findAllByThemeThemeId(themeId).stream()
            .map(ReviewResponseDTO::toDTO)
            .toList();
    }
}
