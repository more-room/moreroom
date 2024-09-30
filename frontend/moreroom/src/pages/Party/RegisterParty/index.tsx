/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { TopBar } from '../../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { Typography } from '../../../components/Typography';
import { containerCss, contentCss, itemCss, themesCss } from './styles';
import { IParty, usePartyStore } from '../../../stores/partyStore';
import {
  ImyHashtags,
  Ipartyhastag,
  IuserHashtags,
} from '../../../types/partyTypes';
import { FilterChip } from '../../../components/FilterChip';
import { Button } from '../../../components/Button';

export const RegisterParty = () => {
  const [selectedMyHashtagIdList, setSelectedMyHashtagIdList] = useState<number[]>([]);
  const [selectedYourHashtagIdList, setSelectedYourHashtagIdList] = useState<number[]>([]);
  const [selectedPartyHashtagIdList, setSelectedPartyHashtagIdList] = useState<number[]>([]);
  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);
  const nav = useNavigate();

  const addNewParty = () => {
    if (selectedThemeId === null) {
      alert("테마를 선택해주세요!");
      return;
    }

    const newParty: IParty = {
      id: Date.now(), // 임시 ID, 실제로는 백엔드에서 생성된 ID를 사용해야 합니다
      themeId: selectedThemeId,
      myHashtagIdList: selectedMyHashtagIdList,
      yourHashtagIdList: selectedYourHashtagIdList,
      partyHashtagIdList: selectedPartyHashtagIdList,
    };
    usePartyStore.getState().addParty(newParty);
    nav('/party');
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

  return (
    <div css={containerCss}>
      <TopBar>
        <TopBar.Title
          type="default"
          title="파티 요청 등록"
          backHandler={() => nav(-1)}
        />
      </TopBar>
      <div css={themesCss} onClick={() => nav('/party/addtheme')}>
        <Typography color="light" size={1} weight={400}>
          {selectedThemeId ? '테마가 선택되었습니다!' : '여기를 눌러 테마를 선택해주세요!'}
        </Typography>
      </div>
      <div css={contentCss}>
        <Typography color="light" size={1} weight={500}>
          희망하는 파티의 성향을 선택해주세요!
        </Typography>
        <div css={itemCss}>
          {Ipartyhastag.map((tag) => (
            <FilterChip
              key={tag.id}
              onClick={() => handlePartyHashtagClick(tag.id)}
              selected={selectedPartyHashtagIdList.includes(tag.id)}
              onHandleClick={() => {}}
            >
              {tag.label}
            </FilterChip>
          ))}
        </div>
        <Typography color="light" size={1} weight={500}>
          본인의 성향을 선택해주세요!
        </Typography>
        <div css={itemCss}>
          {ImyHashtags.map((tag) => (
            <FilterChip
              key={tag.id}
              onClick={() => handleMyHashtagClick(tag.id)}
              selected={selectedMyHashtagIdList.includes(tag.id)}
              onHandleClick={() => {}}
            >
              {tag.label}
            </FilterChip>
          ))}
        </div>
        <Typography color="light" size={1} weight={500}>
          희망하는 파티원의 성향을 선택해주세요!
        </Typography>
        <div css={itemCss}>
          {IuserHashtags.map((tag) => (
            <FilterChip
              key={tag.id}
              onClick={() => handleYourHashtagClick(tag.id)}
              selected={selectedYourHashtagIdList.includes(tag.id)}
              onHandleClick={() => {}}
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
          handler={addNewParty}
        >
          파티 요청 등록하기
        </Button>
      </div>
    </div>
  );
};