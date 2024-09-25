/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';  // STOMP.js 사용
import { getPartyList } from "../../apis/chatApi";  // 파티 목록을 가져오는 API 호출
import { useSearchPartiesStore } from "../../stores/chatingStore";  // zustand store 사용
import { IParty } from '../../types/chatingTypes';  // 타입 정의
import { TopBar } from '../../components/TopBar';
import { BottomBar } from '../../components/BottomBar';
import {
  container, topbarcolor, themeCard, cardContent, posterImage, themeDetails,
  themeTitle, filterButton, filterContainer, iconcolors, chipstyle, iconcolors2,
  cardcontainer, ellipsisIconWrapper, roomname, bottombarcss
} from './styles';  // 스타일 정의

// 아이콘 임포트
import { MapPinIcon, ClockIcon, UserGroupIcon, EllipsisHorizontalCircleIcon, BellIcon } from '@heroicons/react/24/solid';
import { Chip } from "../../components/Chip";
import { Typography } from "../../components/Typography";

export const Chating = () => {
  const [selectedFilter, setSelectedFilter] = useState('속한 파티');
  const searchPartiesStore = useSearchPartiesStore();
  const navigate = useNavigate();
  const client = useRef<StompJs.Client | null>(null);  // WebSocket client
  const [roomId, setRoomId] = useState<number | null>(null);  // 현재 채팅방 ID

  useEffect(() => {
    const fetchPartyList = async () => {
      try {
        const response = await getPartyList();
        searchPartiesStore.setResults(response.data);
      } catch (error) {
        console.error("파티 목록을 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchPartyList();
  }, [searchPartiesStore]);

  // 파티 목록 가져오기
  const partyList: IParty[] = searchPartiesStore.results?.content || [];

  // 파티 클릭 시 채팅방으로 이동하고 WebSocket 연결
  const handlePartyClick = (partyId: number) => {
    console.log(`선택된 파티 ID: ${partyId}`);
    setRoomId(partyId);  // 선택된 파티 ID 설정
    navigate(`/chatingroom/${partyId}`);  // 채팅방으로 이동
    
  };


  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <div css={container}>
      <TopBar css={topbarcolor}>
        <TopBar.Title type="default" defaultValue="파티 목록" title='채팅방 리스트 조회' />
      </TopBar>

      {/* 필터 버튼 추가 */}
      <div css={filterContainer}>
        <button
          css={filterButton(selectedFilter === '속한 파티')}
          onClick={() => handleFilterChange('속한 파티')}
        >
          <UserGroupIcon css={iconcolors} style={{ width: '1rem', marginRight: '0.25rem' }} />
          <Typography color="light" weight={600} size={0.9}>속한 파티</Typography>
        </button>
        <button
          css={filterButton(selectedFilter === '일반 파티')}
          onClick={() => handleFilterChange('일반 파티')}
        >
          <EllipsisHorizontalCircleIcon css={iconcolors2} style={{ width: '1rem', marginRight: '0.25rem' }} />
          <Typography color="light" weight={600} size={0.9}>일반 파티</Typography>
        </button>
      </div>

      {/* 필터된 파티만 렌더링 */}
      <div css={cardcontainer}>
        {partyList.length > 0 ? (
          partyList.map((party: IParty, idx: number) => (
            <div key={idx} css={themeCard} onClick={() => handlePartyClick(party.partyId)}>
              {/* 파티 이미지 및 정보 렌더링 */}
              <img src={party.theme.poster} alt="포스터 이미지" css={posterImage} />
              <div css={cardContent}>
                <h2 css={roomname}>{party.roomName}</h2>
                <h3 css={themeTitle}>{party.theme.title}</h3>
                <div css={themeDetails}>
                  <p>
                    <MapPinIcon css={iconcolors} style={{ width: '1rem', marginRight: '0.25rem' }} />
                    {party.theme.cafe.cafeName}
                  </p>
                  <p>
                    <ClockIcon css={iconcolors} style={{ width: '1rem', marginRight: '0.25rem' }} />
                    {party.date}
                  </p>
                  <p>
                    <UserGroupIcon css={iconcolors} style={{ width: '1rem', marginRight: '0.25rem' }} />
                    {party.memberCount}/{party.maxMember} 명 참여
                  </p>
                  <div>
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
        onHandleChange={() => console.log('바텀바 선택됨')}
      />
    </div>
  );
};
