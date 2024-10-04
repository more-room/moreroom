package com.moreroom.domain.review.service;

import com.moreroom.domain.genre.entity.Genre;
import com.moreroom.domain.mapping.member.entity.MemberReviewMapping;
import com.moreroom.domain.mapping.member.repository.MemberReviewMappingRepository;
import com.moreroom.domain.mapping.theme.entity.ThemeGenreMapping;
import com.moreroom.domain.mapping.theme.repository.ThemeGenreMappingRepository;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.domain.playLog.entity.PlayLog;
import com.moreroom.domain.playLog.repository.PlayLogRepository;
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
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final FindMemberService findMemberService;
    private final MemberRepository memberRepository;
    private final ThemeRepository themeRepository;
    private final ThemeGenreMappingRepository themeGenreMappingRepository;
    private final MemberReviewMappingRepository memberReviewMappingRepository;
    private final PlayLogRepository playLogRepository;

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

    public PageResponseDto findAll(Integer themeId, int pageNumber, int pageSize, String sortOrder,
        String sortBy) {
        Sort sort = sortOrder.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending()
            : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Long memberId = findMemberService.findCurrentMember();

        Page<Object[]> reviewList = reviewRepository.findAllByThemeThemeIdAndMemberMemberIdAndDelFlagFalse(
            themeId, memberId, pageable);

        List<ReviewResponseDTO> reviewResponseDTOList = reviewList.stream()
            .map(result -> {
                Review review = (Review) result[0];
                boolean upFlag = ((Integer) result[1]).equals(1);

                return ReviewResponseDTO.toDTO(review, upFlag);
            })
            .toList();

        return PageResponseDto.builder()
            .content(reviewResponseDTOList)
            .pageNumber(pageNumber)
            .pageSize(pageSize)
            .totalElements(reviewList.getTotalElements())
            .totalPage((long) Math.ceil((double) reviewList.getTotalElements() / pageSize))
            .build();
    }

    public PageResponseDto findAllByMine(int pageNumber, int pageSize, String sortOrder,
        String sortBy) {

        Long memberId = findMemberService.findCurrentMember();
        Sort sort = sortOrder.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending()
            : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<Review> reviewList = reviewRepository.findAllByMemberMemberIdAndDelFlagFalse(memberId,
            pageable);
        // fix: 쿼리 한번 호출
        List<Review> reviews = reviewList.getContent();

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

            review.deleteReview();
        } else {
            throw new ReviewNotFoundException();
        }
    }

    @Transactional
    public void like(Long reviewId) {
        Member member = memberRepository.getReferenceById(findMemberService.findCurrentMember());

        if (reviewRepository.findById(reviewId).isPresent()) {
            Review review = reviewRepository.findById(reviewId).get();

            if (memberReviewMappingRepository.existsMemberReviewMappingByMemberAndReview(member,
                review)) {

                MemberReviewMapping memberReviewMapping = memberReviewMappingRepository.findByMemberAndReview(
                    member, review);

                memberReviewMappingRepository.delete(memberReviewMapping);

                review.unlikeReview();

            } else {
                MemberReviewMapping memberReviewMapping = MemberReviewMapping.builder()
                    .member(member)
                    .review(review)
                    .build();

                memberReviewMappingRepository.save(memberReviewMapping);

                review.likeReview();
            }
        } else {
            throw new ReviewNotFoundException();
        }
    }

    @Transactional
    public void updatePlayLog(Integer themeId) {
        Long memberId = findMemberService.findCurrentMember();

        Optional<PlayLog> playLogOptional = playLogRepository.findByMemberIdAndThemeId(memberId,
            themeId);

        if (playLogOptional.isPresent()) {
            PlayLog playLog = playLogOptional.get();
            playLog.increasePlayCount();
        } else {
            PlayLog playLog = PlayLog.builder()
                .memberId(memberId)
                .themeId(themeId)
                .playCount(1)
                .build();

            playLogRepository.save(playLog);
        }
    }
}
