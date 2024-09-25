/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { TopBar } from "../../components/TopBar";
import { BottomBar } from "../../components/BottomBar";
import {
  container,
  topbarcolor,
  themeCard,
  cardContent,
  posterImage,
  themeDetails,
  themeTitle,
  filterButton,
  filterContainer,
  iconcolors,
  chipstyle,
  iconcolors2,
  cardcontainer,
  ellipsisIconWrapper, // 오른쪽 상단 아이콘을 위한 스타일
  roomname,
  bottombarcss
} from "./styles"; // 스타일 파일

import { useSearchPartiesStore } from "../../stores/chatingStore"; // zustand store
import { getPartyList } from "../../apis/chatApi"; // getPartyList 함수 임포트

// 아이콘 임포트
import { MapPinIcon, ClockIcon, UserGroupIcon, EllipsisHorizontalCircleIcon, BellIcon } from '@heroicons/react/24/solid';
import { Chip } from "../../components/Chip";
import { Typography } from "../../components/Typography";
import { IParty } from '../../types/chatingTypes' // IParty 타입 임포트
import { Colors } from "../../styles/globalStyle";

export const Chating = () => {
  const [selectedFilter, setSelectedFilter] = useState('속한 파티'); // 필터 상태 ('속한 파티' or '일반 파티')
  const searchPartiesStore = useSearchPartiesStore(); // 파티 목록 store

  useEffect(() => {
    const fetchPartyList = async () => {
      try {
        const response = await getPartyList(); // API 호출
        const data = response.data;

        searchPartiesStore.setResults(data); // 파티 데이터를 store에 저장
      } catch (error) {
        console.error("파티 목록을 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchPartyList();
  }, [selectedFilter, searchPartiesStore]); // selectedFilter가 변경될 때마다 fetch

  // 데이터에서 카드 필터링
  const partyList: IParty[] = searchPartiesStore.results?.content || [];

  // 필터링 로직을 아이콘 렌더링 단계에서 처리
  const isIconTypeMatched = (iconType: 'ellipsis' | 'group') => {
    if (selectedFilter === '일반 파티') {
      return iconType === 'ellipsis'; // 일반 파티는 'ellipsis' 아이콘만 허용
    }
    if (selectedFilter === '속한 파티') {
      return iconType === 'group'; // 속한 파티는 'group' 아이콘만 허용
    }
    return false;
  };

  const handlechange = () => {
    console.log('1')
  }
  return (
    <div css={container}>
      <TopBar css={topbarcolor}>
        <TopBar.Title type="default" defaultValue="파티 목록" />
      </TopBar>

      {/* 필터 버튼 추가 */}
      <div css={filterContainer}>
        <button
          css={filterButton(selectedFilter === '속한 파티')}
          onClick={() => setSelectedFilter('속한 파티')}
        >
          <UserGroupIcon css={iconcolors} style={{ width: '1rem', marginRight: '0.25rem' }} />
          <Typography color="light" weight={600} size={0.9}>속한 파티</Typography>
        </button>
        <button
          css={filterButton(selectedFilter === '일반 파티')}
          onClick={() => setSelectedFilter('일반 파티')}
        >
          <EllipsisHorizontalCircleIcon css={iconcolors2} style={{ width: '1rem', marginRight: '0.25rem' }} />
          <Typography color="light" weight={600} size={0.9}>일반 파티</Typography>
        </button>
      </div>

      {/* 필터된 파티만 렌더링 */}
      <div css={cardcontainer}>
        {partyList.length > 0 ? (
          partyList.slice(0, 4).map((party: IParty, idx: number) => (
            <div key={idx} css={themeCard}>
              {/* 일반 파티일 때 'ellipsis' 아이콘 렌더링 */}
              {isIconTypeMatched('ellipsis') && (
                <div css={ellipsisIconWrapper}>
                  <EllipsisHorizontalCircleIcon css={iconcolors2} style={{ width: '1.5rem' }} />
                </div>
              )}
              {/* 속한 파티일 때 'group' 아이콘 렌더링 */}
              {isIconTypeMatched('group') && (
                <div css={ellipsisIconWrapper}>
                  <UserGroupIcon css={iconcolors} style={{ width: '1.5rem' }} />
                </div>
              )}

              <img src={party.theme.poster} alt="포스터 이미지" css={posterImage} />
              <div css={cardContent}>
                <h2 css={roomname}>{party.roomName}</h2>
                <h3 css={themeTitle}>{party.theme.title}</h3>
                <div css={themeDetails}>
                  <p>
                    <MapPinIcon css={iconcolors} style={{ width: '1rem', marginRight: '0.25rem' }} />
                    {party.cafeName}
                  </p>
                  <p>
                    <ClockIcon css={iconcolors} style={{ width: '1rem', marginRight: '0.25rem' }} />
                    {party.date}
                  </p>
                  <p>
                    <UserGroupIcon css={iconcolors} style={{ width: '1rem', marginRight: '0.25rem' }} />
                    {party.memberCount}/{party.maxMember} 명 참여
                  </p>
                  
                  <div >
                    {party.hashtags.map((tag) => (
                      <Chip css={chipstyle} border={0.6} fontSize={0.7} key={tag.hashtagId}>{tag.hashtagName}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>파티 목록이 없습니다.</div>
        )}
      </div>
      <BottomBar css={bottombarcss}
        icons={[<BellIcon />, <BellIcon />, <BellIcon />]}
        menus={['메뉴1', '메뉴2', '메뉴3']}
        onHandleChange={handlechange}>
      </BottomBar>
    </div>
  );
};
