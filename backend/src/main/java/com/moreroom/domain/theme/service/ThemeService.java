package com.moreroom.domain.theme.service;

import com.moreroom.domain.genre.repository.GenreRepository;
import com.moreroom.domain.history.repository.HistoryRepository;
import com.moreroom.domain.mapping.theme.repository.ThemeGenreMappingRepository;
import com.moreroom.domain.review.repository.ReviewRepository;
import com.moreroom.domain.theme.dto.request.ThemeListRequestDto;
import com.moreroom.domain.theme.dto.response.ThemeDetailResponseDto;
import com.moreroom.domain.theme.repository.ThemeQueryRepository;
import com.moreroom.domain.theme.repository.ThemeRepository;
import com.moreroom.global.dto.PageResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ThemeService {

    private final ThemeRepository themeRepository;
    private final ReviewRepository reviewRepository;
    private final HistoryRepository historyRepository;
    private final GenreRepository genreRepository;
    private final ThemeGenreMappingRepository themeGenreMappingRepository;

    private final ThemeQueryRepository themeQueryRepository;

    @Transactional(readOnly = true)
    public ThemeDetailResponseDto findThemeById(Integer themeId, Long memberId) {
        return themeQueryRepository.findThemeDetailById(themeId, memberId);

        /*
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
        List<ThemeGenreMapping> tgList = themeGenreMappingRepository.findAllByThemeThemeId(theme.getThemeId());
        List<Genre> genreMapping = genreRepository.findAll();
        List<String> genreList = tgList.stream()
            .map(tg -> genreMapping.stream()
                .filter(g -> g.getGenreId().equals(tg.getGenre().getGenreId()))
                .findFirst()
                .map(Genre::getGenreName)
                .orElse(null))
            .filter(Objects::nonNull) // null이 아닌 값들만 필터링
            .toList();
        // 5. Dto 변환 후 반환
        return ThemeDetailResponseDto.toDto(theme, reviewCount, reviewScore, playFlag, genreList);
        */
    }

    @Transactional(readOnly = true)
    public PageResponseDto findThemes(ThemeListRequestDto themeListRequestDto, Long memberId) {
        PageRequest pageRequest = PageRequest.of(themeListRequestDto.getPageNumber(),
            themeListRequestDto.getPageSize(), Sort.by("themeId").ascending());

        PageResponseDto pageResponseDto = themeQueryRepository.findAllByFilter(themeListRequestDto,
            pageRequest, memberId);

        return pageResponseDto;
    }
}
