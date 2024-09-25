package com.moreroom.domain.review.service;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.domain.review.dto.request.ReviewRequestDTO;
import com.moreroom.domain.review.dto.response.ReviewResponseDTO;
import com.moreroom.domain.review.entity.Review;
import com.moreroom.domain.review.repository.ReviewRepository;
import com.moreroom.domain.theme.repository.ThemeRepository;
import com.moreroom.global.dto.PageResponseDto;
import com.moreroom.global.util.FindMemberService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public PageResponseDto findAll(Integer themeId, int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Review> reviewList = reviewRepository.findAllByThemeThemeId(themeId, pageable);

        List<ReviewResponseDTO> reviewResponseDTOList = reviewList.stream()
            .map(ReviewResponseDTO::toDTO)
            .toList();

        return PageResponseDto.builder()
            .content(reviewResponseDTOList)
            .pageNumber(pageNumber)
            .pageSize(pageSize)
            .totalElements(reviewList.getTotalElements())
            .totalPage((long) Math.ceil((double) reviewList.getTotalElements() / pageSize))
            .build();
    }
}
