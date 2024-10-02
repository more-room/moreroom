/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getMyPartyList, getPartyList } from "../../apis/chatApi";  // 파티 목록을 가져오는 API 호출
import { TopBar } from '../../components/TopBar';
import { BottomBar } from '../../components/BottomBar';
import {
  container, topbarcolor, themeCard, cardContent, posterImage, themeDetails,
  themeTitle, filterButton, filterContainer, iconcolors, chipstyle, iconcolors2,
  cardcontainer, roomname, bottombarcss
} from './styles';  // 스타일 정의

// 아이콘 임포트
import { MapPinIcon, ClockIcon, UserGroupIcon, EllipsisHorizontalCircleIcon, BellIcon } from '@heroicons/react/24/solid';
import { Chip } from "../../components/Chip";
import { Typography } from "../../components/Typography";
import { IParty } from '../../types/chatingTypes';

export const ChatingFetch = () => {
  const [selectedFilter, setSelectedFilter] = useState('속한 파티');  // '속한 파티'와 '일반 파티' 간의 필터를 결정하는 상태
  const navigate = useNavigate();

  // 일반 파티 불러오기
  const partyListQuery = useSuspenseQuery({
    queryKey: ['party-list'],
    queryFn: async () => await getPartyList(),
    // refetchOnWindowFocus: false,
  });

  // 내가 속한 파티 불러오기
  const myPartyListQuery = useSuspenseQuery({
    queryKey: ['myparty-list'],
    queryFn: async () => await getMyPartyList(),
    // refetchOnWindowFocus: false,
  });

  // 파티 목록을 불러오는 중 에러 처리
  if (partyListQuery.error && !partyListQuery.isFetching) {
    return <div>일반 파티 목록을 불러오는 중 에러가 발생했습니다.</div>;
  }

  if (myPartyListQuery.error && !myPartyListQuery.isFetching) {
    return <div>내가 속한 파티 목록을 불러오는 중 에러가 발생했습니다.</div>;
  }
  const myPartyList = myPartyListQuery.data.data.partyList
  const PartyList = partyListQuery.data.data.partyList

  // 선택된 필터에 따른 파티 목록
  const partiesToDisplay: IParty[] = selectedFilter === '속한 파티'
    ? myPartyList || []
    : PartyList || []; 

  // 파티 클릭 시 채팅방으로 이동
  const handlePartyClick = (partyId: number) => {
    console.log(`선택된 파티 ID: ${partyId}`);
    navigate(`/chatingroom/${partyId}`);  // 채팅방으로 이동
  };

  // 필터 변경 핸들러
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };
  console.log('내가 속한 파티',myPartyList)
  console.log('일반 파티',PartyList)
  return (
    <>
      <div>
        <TopBar css={topbarcolor}>
          <TopBar.Title
            type="default"
            defaultValue="파티 목록"
            title="채팅방 리스트 조회"
            backHandler={() => navigate(-1)}
          />
        </TopBar>
      </div>

      <div css={container}>
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
          {partiesToDisplay.length > 0 ? (
            partiesToDisplay.map((party: IParty, idx: number) => (
              <div key={idx} css={themeCard} onClick={() => handlePartyClick(party.partyId)}>
                {/* 파티 이미지 및 정보 렌더링 */}
                <img src={party.theme.poster} alt="포스터 이미지" css={posterImage} />
                <div css={cardContent}>
                  <h2 css={roomname}>{party.roomName}</h2>
                  <h3 css={themeTitle}>{party.theme.title}</h3>
                  <div css={themeDetails}>
                    <p>
                      <MapPinIcon css={iconcolors} style={{ width: '1rem', marginRight: '0.25rem' }} />
                      {party.theme.cafe.brandName}-{party.theme.cafe.branchName}
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

        <BottomBar
          css={bottombarcss}
          icons={[<BellIcon />, <BellIcon />, <BellIcon />]}
          menus={['메뉴1', '메뉴2', '메뉴3']}
          onHandleChange={() => console.log('바텀바 선택됨')}
        />
      </div>
    </>
  );
};
