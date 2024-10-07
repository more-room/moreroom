package com.moreroom.domain.recommendations.service;

import com.moreroom.domain.history.entity.History;
import com.moreroom.domain.history.repository.HistoryRepository;
import com.moreroom.domain.mapping.member.repository.MemberGenreMappingRepository;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.exception.MemberNotFoundException;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.domain.recommendations.dto.response.GenreThemeResponseDto;
import com.moreroom.domain.recommendations.entity.DemographicsTheme;
import com.moreroom.domain.recommendations.entity.GenresTheme;
import com.moreroom.domain.recommendations.entity.SimilarMemberTheme;
import com.moreroom.domain.recommendations.entity.SimilarTheme;
import com.moreroom.domain.recommendations.exception.RecommendationNotFoundException;
import com.moreroom.domain.recommendations.repository.DemographicsThemeRepository;
import com.moreroom.domain.recommendations.repository.GenreThemeRepository;
import com.moreroom.domain.recommendations.repository.SimilarMemberThemeRepository;
import com.moreroom.domain.recommendations.repository.SimilarThemeRepository;
import com.moreroom.domain.theme.dto.response.ThemeListResponseDto;
import com.moreroom.domain.theme.repository.ThemeQueryRepository;
import com.moreroom.global.util.GlobalUtil;
import jakarta.persistence.Tuple;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final SimilarMemberThemeRepository similarMemberThemeRepository;
    private final SimilarThemeRepository similarThemeRepository;
    private final DemographicsThemeRepository demographicsThemeRepository;
    private final ThemeQueryRepository themeQueryRepository;
    private final MemberRepository memberRepository;
    private final HistoryRepository historyRepository;
    private final MemberGenreMappingRepository memberGenreMappingRepository;
    private final GenreThemeRepository genreThemeRepository;

    public ThemeListResponseDto getSimilarUserThemes(long memberId) {
        // 1. 유사 유저 테마 조회 (mongoDB)
        SimilarMemberTheme similarMemberTheme = similarMemberThemeRepository.findByMemberId(
            memberId);
        if (similarMemberTheme == null) {
            return ThemeListResponseDto.builder()
                .themeList(new ArrayList<>())
                .build();
        }
        // 2. 테마 상세 정보 조회
        ThemeListResponseDto themeListResponseDto = themeQueryRepository.findByThemeIds(
            similarMemberTheme.getSimilarMemberThemes(), memberId);
        return themeListResponseDto;
    }


    public ThemeListResponseDto getSimilarThemes(long memberId) {
        // 1. 마지막 방문 테마 조회
        Optional<History> optionalHistory = historyRepository.findTop1ByMemberMemberIdAndDelFlagIsFalseOrderByPlayDateDesc(
            memberId);
        Integer themeId = optionalHistory
            .map(history -> history.getTheme().getThemeId())
            .orElse(GlobalUtil.getRandomThemeId());
        // 2. 유사 테마 조회 (mongoDB)
        SimilarTheme similarTheme = similarThemeRepository.findByThemeId(themeId);
        // 3. 테마 상세 정보 조회
        ThemeListResponseDto themeListResponseDto = themeQueryRepository.findByThemeIds(
            similarTheme.getSimilarThemes(), memberId);

        return themeListResponseDto;
    }

    public ThemeListResponseDto getDemographicsThemes(Long memberId) {
        // 1. 유저 정보 조회
        Member member = memberRepository.findById(memberId)
            .orElseThrow(MemberNotFoundException::new);
        String groupId = String.format("%d_%d",
            (LocalDate.now().getYear() - member.getBirth().getYear()) / 10 * 10,
            member.getGender() ? 1 : 0);
        String totalGroupId = "Total";
        // 2. 인기 테마 조회 (mongoDB)
        DemographicsTheme demographicsTheme = demographicsThemeRepository.findByGroupId(groupId);
        if (demographicsTheme == null || demographicsTheme.getDemographicThemes().size() < 10) {
            demographicsTheme = demographicsThemeRepository.findByGroupId(totalGroupId);
        }
        // 3. 테마 상세 정보 조회
        List<Integer> themeList = demographicsTheme.getDemographicThemes();
        ThemeListResponseDto themeListResponseDto = themeQueryRepository.findByThemeIds(
            themeList, memberId);
        // 4. 인기 순으로 정렬 (원래 받았던 ID)
        themeListResponseDto.getThemeList()
            .sort(Comparator.comparingInt(o -> themeList.indexOf(o.getThemeId())));
        return themeListResponseDto;
    }

    public GenreThemeResponseDto getGenresThemes(Long memberId) {
        // 1. 유저 장르 정보 조회
        List<Tuple> genreList = memberGenreMappingRepository.getFrequentGenres(memberId);

        // 2. 인기/비인기 장르 조회 (mongoDB)
        GenresTheme genresThemeMost = null;
        GenresTheme genresThemeLeast = null;
        System.out.println("genreList = " + genreList);
        System.out.println("genreList.get(0) = " + genreList.get(0));
        if (genreList.size() >= 2) {
            System.out.println("genreList.size() = " + genreList.size());
            System.out.println(
                "genreThemeRepository.findByGroupId(\"1\") = " + genreThemeRepository.findByGroupId(
                    "1"));
            genresThemeMost = genreThemeRepository.findByGroupId(
                Integer.toString(genreList.get(0).get(0, Integer.class)));
            genresThemeLeast = genreThemeRepository.findByGroupId(
                Integer.toString(genreList.get(genreList.size() - 1).get(0, Integer.class)));

            System.out.println("genresThemeMost = " + genresThemeMost.getGenreTopThemes());
            System.out.println("genresThemeLeast = " + genresThemeLeast.getGenreTopThemes());
        } else if (genreList.size() == 1) {
            Long l = genreList.get(0).get(1, Long.class);
            if (l == null) {
                throw new RecommendationNotFoundException();
            }
            if (l > 0) {
                genresThemeMost = genreThemeRepository.findByGroupId(
                    Integer.toString(genreList.get(0).get(0, Integer.class)));
            } else {
                genresThemeLeast = genreThemeRepository.findByGroupId(
                    Integer.toString(genreList.get(genreList.size() - 1).get(0, Integer.class)));
            }
        }

        // 3. 테마 상세 정보 조회
        ThemeListResponseDto emptyListResponseDto = ThemeListResponseDto.builder()
            .themeList(new ArrayList<>()).build();
        ThemeListResponseDto themeListMostResponseDto =
            genresThemeMost != null ? themeQueryRepository.findByThemeIds(
                genresThemeMost.getGenreTopThemes(), memberId) : emptyListResponseDto;
        ThemeListResponseDto themeListLeastResponseDto =
            genresThemeLeast != null ? themeQueryRepository.findByThemeIds(
                genresThemeLeast.getGenreTopThemes(), memberId) : emptyListResponseDto;

        return GenreThemeResponseDto.builder()
            .mostGenreList(themeListMostResponseDto.getThemeList())
            .leastGenreList(themeListLeastResponseDto.getThemeList())
            .build();
    }
}
