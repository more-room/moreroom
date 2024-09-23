/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { TopBar } from "../../components/TopBar";
import { container, themeCard, cardContent, posterImage, themeDetails, themeTitle, filterButton, filterContainer, iconcolors, chipstyle } from "./styles"; // 스타일 파일
import { useSearchThemesStore, useSearchTitleStore } from "../../stores/themeStore"; // zustand store
import { getThemes } from "../../apis/themeApi"; // getThemes 함수 임포트

// 아이콘 임포트
import { MapPinIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { Chip } from "../../components/Chip";

export const Chating = () => {
  const [selectedFilter, setSelectedFilter] = useState('속한 파티'); // 필터 상태 ('속한 파티' or '일반 파티')
  const searchThemesStore = useSearchThemesStore(); // 테마 목록 store
  const searchTitleStore = useSearchTitleStore(); // 검색된 테마 제목 store

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const filters = {
          pageNumber: 0,
          pageSize: 10, // API 호출은 10개로 하되, 렌더링은 4개만
          genreList: [],
          regionId: '',
          type: selectedFilter, // 필터 상태에 따른 요청 데이터
        };

        const response = await getThemes(filters);
        const data = response.data;

        searchThemesStore.setResults(data);
      } catch (error) {
        console.error("테마 목록을 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchThemes();
  }, [selectedFilter, searchThemesStore]); // selectedFilter가 변경될 때마다 fetch

  const themeList = searchThemesStore.results?.content?.themeList || [];

  return (
    <div css={container}>
      <TopBar>
        <TopBar.Title type="default" defaultValue={searchTitleStore.title} />
      </TopBar>

      {/* 필터 버튼 추가 */}
      <div css={filterContainer}>
        <button
          css={filterButton(selectedFilter === '속한 파티')}
          onClick={() => setSelectedFilter('속한 파티')}
        >
          <UserGroupIcon css={iconcolors} style={{ width: '1rem', marginRight: '0.25rem' }} />
          속한 파티
        </button>
        <button
          css={filterButton(selectedFilter === '일반 파티')}
          onClick={() => setSelectedFilter('일반 파티')}
        >
          <span style={{ fontSize: '1rem', marginRight: '0.25rem' }}>•••</span>
          일반 파티
        </button>
      </div>

      {/* 4개의 테마만 렌더링 */}
      <div>
        {themeList.length > 0 ? (
          themeList.slice(0, 4).map((theme, idx) => (
            <div key={idx} css={themeCard}>
              <img src={theme.poster} alt="포스터 이미지" css={posterImage} />
              <div css={cardContent}>
                <h3 css={themeTitle}>뉴비만 오세요</h3>
                <p>{theme.title}</p>
                <div css={themeDetails}>
                  <p>
                    <MapPinIcon css={iconcolors} style={{ width: '1rem', marginRight: '0.25rem' }} />
                    {theme.cafe.brandName} - {theme.cafe.branchName}
                  </p>
                  <p>
                    <ClockIcon css={iconcolors} style={{ width: '1rem', marginRight: '0.25rem' }} />
                    {theme.playtime}분
                  </p>
                  <p>
                    <UserGroupIcon css={iconcolors} style={{ width: '1rem', marginRight: '0.25rem' }} />
                    {theme.review.count}명 참여
                  </p>
                  
                  <div css={chipstyle}>
                    <Chip>즐겜</Chip>
                    <Chip>대구</Chip>
                  </div>
                  
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>테마 목록이 없습니다.</div>
        )}
      </div>
    </div>
  );
};
