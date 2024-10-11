/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getMyPartyList, getPartyList } from '../../apis/chatApi';
import { IParty } from '../../types/chatingTypes';
import {
  container,
  themeCard,
  posterImage,
  cardContent,
  themeDetails,
  themeTitle,
  filterButton,
  filterContainer,
  iconcolors,
  chipstyle,
  iconcolors2,
  cardcontainer,
  roomname,
  posterText
} from './styles';
import { MapPinIcon, ClockIcon, UserGroupIcon, EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';
import { Chip } from '../../components/Chip';
import { Typography } from '../../components/Typography';
import NoResult from '../../components/common/NoResult';

export const ChatingFetch = () => {
  const [selectedFilter, setSelectedFilter] = useState('속한 파티');
  const navigate = useNavigate();
  const [imgErrorMap, setImgErrorMap] = useState<{ [key: number]: boolean }>({}); // 각 파티의 이미지 에러 상태를 관리하는 상태

  // 일반 파티 불러오기
  const partyListQuery = useSuspenseQuery({
    queryKey: ['party-list'],
    queryFn: async () => await getPartyList(),
  });

  // 내가 속한 파티 불러오기
  const myPartyListQuery = useSuspenseQuery({
    queryKey: ['myparty-list'],
    queryFn: async () => await getMyPartyList(),
  });

  // 파티 목록을 불러오는 중 에러 처리
  if (partyListQuery.error && !partyListQuery.isFetching) {
    return <div>일반 파티 목록을 불러오는 중 에러가 발생했습니다.</div>;
  }

  if (myPartyListQuery.error && !myPartyListQuery.isFetching) {
    return <div>내가 속한 파티 목록을 불러오는 중 에러가 발생했습니다.</div>;
  }

  const partyList: IParty[] = partyListQuery.data.data.partyList || [];
  const mypartyList: IParty[] = myPartyListQuery.data.data.partyList || [];

  // 이미지 로드 오류 처리 함수
  const handleImageError = (partyId: number) => {
    setImgErrorMap((prevState) => ({ ...prevState, [partyId]: true }));
  };

  // 선택된 필터에 따른 파티 목록
  const partiesToDisplay: IParty[] =
    selectedFilter === '속한 파티' ? mypartyList : partyList;

  return (
    <>
      <div css={container}>
        {/* 필터 버튼 */}
        <div css={filterContainer}>
          <button
            css={filterButton(selectedFilter === '속한 파티')}
            onClick={() => setSelectedFilter('속한 파티')}
          >
            <UserGroupIcon
              css={iconcolors}
              style={{ width: '1rem', marginRight: '0.25rem' }}
            />
            <Typography color="light" weight={600} size={0.9}>
              속한 파티
            </Typography>
          </button>
          <button
            css={filterButton(selectedFilter === '일반 파티')}
            onClick={() => setSelectedFilter('일반 파티')}
          >
            <EllipsisHorizontalCircleIcon
              css={iconcolors2}
              style={{ width: '1rem', marginRight: '0.25rem' }}
            />
            <Typography color="light" weight={600} size={0.9}>
              일반 파티
            </Typography>
          </button>
        </div>

        {/* 필터에 맞는 파티 목록 렌더링 */}
        <div css={cardcontainer}>
          {partiesToDisplay.length > 0 ? (
            partiesToDisplay.map((party: IParty, idx: number) => (
              <div
                key={idx}
                css={themeCard}
                onClick={() => navigate(`/chatingroom/${party.partyId}`)}
              >
                {/* 이미지 또는 대체 텍스트 표시 */}
                {!imgErrorMap[party.partyId] ? (
                  <img
                    src={party.theme.poster}
                    alt="포스터 이미지"
                    css={posterImage}
                    onError={() => handleImageError(party.partyId)}  // 이미지 로드 오류 시 처리
                  />
                ) : (
                  <div css={posterText}>
                    <Typography color="light" weight={600} size={1}>
                      포스터를 <br></br>준비중입니다
                    </Typography>
                    
                  </div>
                )}

                <div css={cardContent}>
                  <h2 css={roomname}>{party.roomName}</h2>
                  <h3 css={themeTitle}>{party.theme.title}</h3>
                  <div css={themeDetails}>
                    <p>
                      <MapPinIcon
                        css={iconcolors}
                        style={{ width: '1rem', marginRight: '0.25rem' }}
                      />
                      {party.theme.cafe.brandName} - {party.theme.cafe.branchName}
                    </p>
                    <p>
                      <ClockIcon
                        css={iconcolors}
                        style={{ width: '1rem', marginRight: '0.25rem' }}
                      />
                      {party.date}
                    </p>
                    <p>
                      <UserGroupIcon
                        css={iconcolors}
                        style={{ width: '1rem', marginRight: '0.25rem' }}
                      />
                      {party.memberCount}/{party.maxMember} 명 참여
                    </p>
                    <div>
                      {party.hashtags.map((tag) => (
                        <Chip
                          css={chipstyle}
                          border={0.6}
                          fontSize={0.7}
                          key={tag.hashtagId}
                        >
                          {tag.hashtagName}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{height:'60vh'}}>
              <NoResult
                msg="현재 존재하는 채팅방이 없습니다."
                url='/'
                contents={{menu: 0}}
                btnmsg="파티 등록하러 가기"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
