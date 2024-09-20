package com.moreroom.domain.theme.service;

import com.moreroom.domain.history.repository.HistoryRepository;
import com.moreroom.domain.review.entity.Review;
import com.moreroom.domain.review.repository.ReviewRepository;
import com.moreroom.domain.theme.dto.request.ThemeListRequestDto;
import com.moreroom.domain.theme.dto.response.ThemeDetailResponseDto;
import com.moreroom.domain.theme.dto.response.ThemeListResponseDto;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.domain.theme.exception.ThemeNotFoundException;
import com.moreroom.domain.theme.repository.ThemeRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ThemeService {

    private final ThemeRepository themeRepository;
    private final ReviewRepository reviewRepository;
    private final HistoryRepository historyRepository;

    public ThemeDetailResponseDto findThemeById(Integer themeId, Long memberId) {
        // 1. theme 조회
        Theme theme = themeRepository.findById(themeId).orElseThrow(
            ThemeNotFoundException::new);
        // 2. review 정보 합산
        List<Review> reviewList = reviewRepository.findAllByThemeThemeId(theme.getThemeId());
        int reviewCount = reviewList.size();
        double reviewScore = reviewList.stream().mapToDouble(Review::getScore).average().orElse(0);
        // 3. 플레이 여부 확인 (기록)
        boolean playFlag =
            !historyRepository.findAllByMemberMemberIdAndThemeThemeId(memberId, themeId).isEmpty();
        // 4. 장르 정보

        // 5. Dto 변환 후 반환
        return ThemeDetailResponseDto.toDto(theme, reviewCount, reviewScore, playFlag);
    }

    public ThemeListResponseDto findThemes(ThemeListRequestDto themeListRequestDto) {
        PageRequest pageRequest = PageRequest.of(themeListRequestDto.getPageNumber(),
            themeListRequestDto.getPageSize(), Sort.by("themeId").ascending());

        return null;
    }
}
