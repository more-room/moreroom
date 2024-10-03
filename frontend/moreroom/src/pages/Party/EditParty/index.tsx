/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { TopBar } from '../../../components/TopBar';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '../../../components/Typography';
import { usePartyStore } from '../../../stores/partyStore';
import {
  myHashtags,
  partyhastags,
  userHashtags,
  IParty,
  IHashtag,
} from '../../../types/partyTypes';
import { FilterChip } from '../../../components/FilterChip';
import { Button } from '../../../components/Button';
import { addParty, getPartyList } from '../../../apis/partyApi';
import { containerCss } from '../styles';
import { contentCss, itemCss, themesCss } from '../RegisterParty/styles';
import { useQuery } from '@tanstack/react-query';
import { SelectedTheme } from '../RegisterParty/SectorTheme/SelectedTheme';

export const EditParty = () => {
  // URL에서 partyRequestId를 가져옴
  const { partyRequestId } = useParams<{ partyRequestId: string }>();

  const [currentPartyRequestId, setCurrentPartyRequestId] = useState<number>(Number(partyRequestId));
  const [selectedMyHashtagIdList, setSelectedMyHashtagIdList] = useState<number[]>([]);
  const [selectedYourHashtagIdList, setSelectedYourHashtagIdList] = useState<number[]>([]);
  const [selectedPartyHashtagIdList, setSelectedPartyHashtagIdList] = useState<number[]>([]);
  const partyStore = usePartyStore();
  const nav = useNavigate();

  const PartyQuery = useQuery({
    queryKey: ['party'],
    queryFn: async () => await getPartyList(),
  });

  if (PartyQuery.error && !PartyQuery.isFetching) {
    throw PartyQuery.error;
  }

  const matchedParty = PartyQuery.data?.data?.requestList?.find(
    (party: IParty) => party.partyRequestId === currentPartyRequestId,
  );

  console.log('matchedParty:',matchedParty);

  // 이미 선택된 해시태그를 상태로 설정
  useEffect(() => {
    if (matchedParty?.hashtagList) {
      matchedParty.hashtagList.forEach((hashtag: IHashtag) => {
        const hashtagId = hashtag.hashtagId;

        if (hashtagId <= 5) {
          setSelectedPartyHashtagIdList((prev) => [...prev, hashtagId]);
        } else if (hashtagId >= 6 && hashtagId <= 17) {
          setSelectedMyHashtagIdList((prev) => [...prev, hashtagId]);
        } else if (hashtagId >= 18) {
          setSelectedYourHashtagIdList((prev) => [...prev, hashtagId]);
        }
      });

      console.log('파티 해시태그', selectedPartyHashtagIdList);
      console.log('내 해시태그', selectedMyHashtagIdList);
      console.log('유저 해시태그', selectedYourHashtagIdList);
    }
  }, [matchedParty]);

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

  const addNewParty = async () => {
    if (!partyStore.themeId) {
      alert('테마를 선택해주세요!');
      return;
    }

    console.log('현재 데이터:', partyStore);

    try {
      const res = await addParty(
        partyStore.themeId,
        partyStore.partyHashtagIdList,
        partyStore.myHashtagIdList,
        partyStore.yourHashtagIdList,
      );
      console.log(res);
      nav('/party');
    } catch (err) {
      console.log(err);
      alert('파티 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div css={containerCss}>
      <TopBar>
        <TopBar.Title
          type="default"
          title="파티 요청 등록"
          backHandler={() => nav(-1)}
        />
      </TopBar>

      {matchedParty.theme.themeId ? (
        <SelectedTheme
          poster={matchedParty.theme.poster}
          themeTitle={matchedParty.theme.title}
          brandName={matchedParty.brandName}
          branchName={matchedParty.branchName}
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
        <Button
          color="primary"
          fullwidth
          rounded={0.5}
          variant="contained"
          handler={addNewParty}
        >
          파티 요청 등록하기
        </Button>
        </div>

      </div>
    </div>
  );
};
