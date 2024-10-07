/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { TopBar } from '../../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { Typography } from '../../../components/Typography';
import { containerCss, contentCss, itemCss, themesCss } from './styles';
import { usePartyStore } from '../../../stores/partyStore';
import {
  myHashtags,
  partyhastags,
  userHashtags,
} from '../../../types/partyTypes';
import { FilterChip } from '../../../components/FilterChip';
import { Button } from '../../../components/Button';
import { SelectedTheme } from './SectorTheme/SelectedTheme';
import { addParty } from '../../../apis/partyApi';

export const RegisterParty = () => {
  const [selectedMyHashtagIdList, setSelectedMyHashtagIdList] = useState<
    number[]
  >([]);
  const [selectedYourHashtagIdList, setSelectedYourHashtagIdList] = useState<
    number[]
  >([]);
  const [selectedPartyHashtagIdList, setSelectedPartyHashtagIdList] = useState<
    number[]
  >([]);
  const partyStore = usePartyStore();
  const nav = useNavigate();

  // 테마 정보 가져오기
  useEffect(() => {
    console.log('Current partyStore state:', partyStore);
  }, [partyStore]);

  // 선택된 해시태그들을 스토어에 저장
  useEffect(() => {
    partyStore.setPartyData({
      myHashtagIdList: selectedMyHashtagIdList,
      yourHashtagIdList: selectedYourHashtagIdList,
      partyHashtagIdList: selectedPartyHashtagIdList,
    });
  }, [
    selectedMyHashtagIdList,
    selectedYourHashtagIdList,
    selectedPartyHashtagIdList,
  ]);

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

      partyStore.setPartyData({
        themeId: undefined,
        poster: undefined,
        themeTitle: undefined,
        brandName: undefined,
        branchName: undefined,
      });

      console.log(res);

      nav('/party');
    } catch (err) {
      console.log(err);
      alert('파티 등록에 실패했습니다. 다시 시도해주세요.');
    }
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

  const handlePartyHashtagClick = (id: number) => {
    setSelectedPartyHashtagIdList((prev) =>
      prev.includes(id) ? prev.filter((tag) => tag !== id) : [...prev, id],
    );
  };

  const backHandler = () => {
    partyStore.setPartyData({
      themeId: undefined,
      poster: undefined,
      themeTitle: undefined,
      brandName: undefined,
      branchName: undefined,
      partyHashtagIdList: [],
      myHashtagIdList: [],
      yourHashtagIdList: [],
    });
    nav('/', { state: { menu: 0 } });
  };

  return (
    <div css={containerCss}>
      <TopBar>
        <TopBar.Title
          type="default"
          title="파티 요청 등록"
          backHandler={backHandler}
        />
      </TopBar>

      {partyStore.themeId ? (
        <SelectedTheme
          poster={partyStore.poster}
          themeTitle={partyStore.themeTitle}
          brandName={partyStore.brandName}
          branchName={partyStore.branchName}
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
