package com.moreroom.domain.review.service;

import com.moreroom.domain.genre.entity.Genre;
import com.moreroom.domain.mapping.theme.entity.ThemeGenreMapping;
import com.moreroom.domain.mapping.theme.repository.ThemeGenreMappingRepository;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.domain.review.dto.request.ReviewRequestDTO;
import com.moreroom.domain.review.dto.request.ReviewUpdateRequestDTO;
import com.moreroom.domain.review.dto.response.ReviewMyPageResponseDTO;
import com.moreroom.domain.review.dto.response.ReviewResponseDTO;
import com.moreroom.domain.review.entity.Review;
import com.moreroom.domain.review.exception.ReviewNotFoundException;
import com.moreroom.domain.review.repository.ReviewRepository;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.domain.theme.repository.ThemeRepository;
import com.moreroom.global.dto.PageResponseDto;
import com.moreroom.global.util.FindMemberService;
import jakarta.transaction.Transactional;
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
    private final ThemeGenreMappingRepository themeGenreMappingRepository;

    @Transactional
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

    public PageResponseDto findAllByMine(int pageNumber, int pageSize) {

        Long memberId = findMemberService.findCurrentMember();

        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Review> reviewList = reviewRepository.findAllByMemberMemberId(memberId, pageable);

        List<Review> reviews = reviewRepository.findAllByMemberMemberId(memberId);

        List<ReviewMyPageResponseDTO> reviewMyPageResponseDTOList = reviews.stream()
            .map(review -> {
                Theme theme = review.getTheme();

                List<String> genreNameList = themeGenreMappingRepository.findAllByThemeThemeId(
                        theme.getThemeId())
                    .stream()
                    .map(ThemeGenreMapping::getGenre)
                    .map(Genre::getGenreName)
                    .toList();

                return ReviewMyPageResponseDTO.toDTO(review, genreNameList);
            })
            .toList();

        return PageResponseDto.builder()
            .content(reviewMyPageResponseDTOList)
            .pageNumber(pageNumber)
            .pageSize(pageSize)
            .totalElements(reviewList.getTotalElements())
            .totalPage((long) Math.ceil((double) reviewList.getTotalElements() / pageSize))
            .build();
    }

    @Transactional
    public void update(Long reviewId, ReviewUpdateRequestDTO reviewUpdateRequestDTO) {
        if (reviewRepository.findById(reviewId).isPresent()) {
            Review review = reviewRepository.findById(reviewId).get();

            review.updateReview(reviewUpdateRequestDTO);
        } else {
            throw new ReviewNotFoundException();
        }
    }

    @Transactional
    public void delete(Long reviewId) {
        if (reviewRepository.findById(reviewId).isPresent()) {
            Review review = reviewRepository.findById(reviewId).get();

            reviewRepository.delete(review);
        } else {
            throw new ReviewNotFoundException();
        }
    }
}
