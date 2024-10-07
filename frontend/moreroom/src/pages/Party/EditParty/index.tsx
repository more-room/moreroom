/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { TopBar } from '../../../components/TopBar';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '../../../components/Typography';
import {
  myHashtags,
  partyhastags,
  userHashtags,
  IParty,
  IHashtag,
} from '../../../types/partyTypes';
import { FilterChip } from '../../../components/FilterChip';
import { Button } from '../../../components/Button';
import { getHashtag, updateParty } from '../../../apis/partyApi'; // updateParty 임포트
import { containerCss } from '../styles';
import { contentCss, itemCss, themesCss } from '../RegisterParty/styles';
import { useQuery } from '@tanstack/react-query';
import { SelectedTheme } from '../RegisterParty/SectorTheme/SelectedTheme';

export const EditParty = () => {
  // URL에서 partyRequestId를 가져옴
  const { partyRequestId } = useParams<{ partyRequestId: string }>();

  const [currentPartyRequestId, setCurrentPartyRequestId] = useState<number>(
    Number(partyRequestId),
  );
  const [selectedMyHashtagIdList, setSelectedMyHashtagIdList] = useState<
    number[]
  >([]);
  const [selectedYourHashtagIdList, setSelectedYourHashtagIdList] = useState<
    number[]
  >([]);
  const [selectedPartyHashtagIdList, setSelectedPartyHashtagIdList] = useState<
    number[]
  >([]);
  const nav = useNavigate();

  const PartyQuery = useQuery({
    queryKey: ['partyHashtag'],
    queryFn: async () => {
      if (partyRequestId) {
        return await getHashtag(partyRequestId);
      } else {
        throw new Error('partyRequestId가 정의되지 않았습니다.');
      }
    },
  });

  if (PartyQuery.error && !PartyQuery.isFetching) {
    throw PartyQuery.error;
  }

  // 이미 선택된 해시태그를 상태로 설정
  useEffect(() => {
    if (PartyQuery.data) {
      const { partyHashtagList, myHashtagList, yourHashtagList } =
        PartyQuery.data.data;

      // 파티 해시태그 매칭
      const partyHashtagsIds = partyHashtagList.map(
        (hashtag: IHashtag) => hashtag.hashtagId,
      );
      setSelectedPartyHashtagIdList(partyHashtagsIds);

      // 내 해시태그 매칭
      const myHashtagsIds = myHashtagList.map(
        (hashtag: IHashtag) => hashtag.hashtagId,
      );
      setSelectedMyHashtagIdList(myHashtagsIds);

      // 유저 해시태그 매칭
      const yourHashtagsIds = yourHashtagList.map(
        (hashtag: IHashtag) => hashtag.hashtagId,
      );
      setSelectedYourHashtagIdList(yourHashtagsIds);
    }
  }, [PartyQuery.data]);

  // 선택 해제 핸들러
  const handlePartyHashtagClick = (id: number) => {
    setSelectedPartyHashtagIdList((prev) =>
      prev.includes(id) ? prev.filter((tag) => tag !== id) : [...prev, id],
    );
  };

  const handleMyHashtagClick = (id: number) => {
    setSelectedMyHashtagIdList((prev) =>
      prev.includes(id) ? prev.filter((tag) => tag !== id) : [...prev, id],
    );
  };

  const handleYourHashtagClick = (id: number) => {
    setSelectedYourHashtagIdList((prev) =>
      prev.includes(id) ? prev.filter((tag) => tag !== id) : [...prev, id],
    );
  };

  // 파티 수정 요청 핸들러
  const handleUpdateParty = async () => {
    try {
      const themeId = PartyQuery.data?.data.theme.themeId; // 선택된 테마 ID
      await updateParty(
        currentPartyRequestId,
        themeId,
        selectedPartyHashtagIdList,
        selectedMyHashtagIdList,
        selectedYourHashtagIdList,
      );
      nav('/', { state: { menu: 0 } }); // 수정 후 이동할 경로
    } catch (error) {
      console.error('파티 수정 중 오류 발생:', error);
      // 추가적인 에러 처리 로직을 여기에 작성할 수 있습니다.
    }
  };

  return (
    <div css={containerCss}>
      <TopBar>
        <TopBar.Title
          type="default"
          title="파티 요청 등록"
          backHandler={() => nav('/', { state: { menu: 0 } })}
        />
      </TopBar>

      {PartyQuery.data?.data.theme.themeId ? (
        <SelectedTheme
          poster={PartyQuery.data?.data.theme.poster}
          themeTitle={PartyQuery.data?.data.theme.title}
          brandName={PartyQuery.data?.data.theme.brandName}
          branchName={PartyQuery.data?.data.theme.branchName}
        />
      ) : (
        <div css={themesCss} onClick={() => nav('/party/addtheme')}>
          <Typography color="light" size={1} weight={400}>
            여기를 눌러 테마를 선택해주세요!
          </Typography>
        </div>
      )}

      <div css={contentCss}>
        <Typography color="light" size={1} weight={500}>
          희망하는 파티의 성향을 선택해주세요!
        </Typography>
        <div css={itemCss}>
          {partyhastags.map((tag) => (
            <FilterChip
              key={tag.id}
              selected={selectedPartyHashtagIdList.includes(tag.id)}
              onHandleClick={() => handlePartyHashtagClick(tag.id)}
            >
              {tag.label}
            </FilterChip>
          ))}
        </div>
        <Typography color="light" size={1} weight={500}>
          본인의 성향을 선택해주세요!
        </Typography>
        <div css={itemCss}>
          {myHashtags.map((tag) => (
            <FilterChip
              key={tag.id}
              selected={selectedMyHashtagIdList.includes(tag.id)}
              onHandleClick={() => handleMyHashtagClick(tag.id)}
            >
              {tag.label}
            </FilterChip>
          ))}
        </div>
        <Typography color="light" size={1} weight={500}>
          희망하는 파티원의 성향을 선택해주세요!
        </Typography>
        <div css={itemCss}>
          {userHashtags.map((tag) => (
            <FilterChip
              key={tag.id}
              selected={selectedYourHashtagIdList.includes(tag.id)}
              onHandleClick={() => handleYourHashtagClick(tag.id)}
            >
              {tag.label}
            </FilterChip>
          ))}
        </div>

        <Button
          color="primary"
          fullwidth
          rounded={0.5}
          variant="contained"
          handler={handleUpdateParty} // 수정 요청 핸들러
        >
          수정하기
        </Button>
      </div>
    </div>
  );
};
