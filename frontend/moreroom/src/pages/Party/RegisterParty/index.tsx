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
  const [selectedMyHashtags, setSelectedMyHashtags] = useState<number[]>([]);
  const [selectedOtherHashtags, setSelectedOtherHashtags] = useState<number[]>(
    [],
  );
  const [selectedPartyHashtags, setSelectedPartyHashtags] = useState<number[]>(
    [],
  );
  const nav = useNavigate();
  const addNewParty = () => {
    const newParty: IParty = {
      id: 1,
      myPreference: selectedMyHashtags,
      otherPreference: selectedOtherHashtags,
      partyPreference: selectedPartyHashtags,
    };
    usePartyStore.getState().addParty(newParty);
    nav('/party');
  };

  const updatePartyPreferences = () => {
    usePartyStore.getState().updateParty(1, {
      myPreference: selectedMyHashtags,
      otherPreference: selectedOtherHashtags,
    });
  };

  const handleMyHashtagClick = (id: number) => {
    setSelectedMyHashtags((prev) =>
      prev.includes(id) ? prev.filter((tag) => tag !== id) : [...prev, id],
    );
  };

  const handleOtherHashtagClick = (id: number) => {
    setSelectedOtherHashtags((prev) =>
      prev.includes(id) ? prev.filter((tag) => tag !== id) : [...prev, id],
    );
  };

  const handlePartyHashtagClick = (id: number) => {
    setSelectedPartyHashtags((prev) =>
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
      <div css={themesCss} onClick={()=>nav('/themes')}>
        <Typography color="light" size={1} weight={400}>
          여기를 눌러 테마를 선택해주세요!
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
              selected={selectedPartyHashtags.includes(tag.id)}
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
              selected={selectedMyHashtags.includes(tag.id)}
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
              onClick={() => handleOtherHashtagClick(tag.id)}
              selected={selectedOtherHashtags.includes(tag.id)}
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
        {/* <button onClick={updatePartyPreferences}>파티 업데이트</button> */}
      </div>
    </div>
  );
};
