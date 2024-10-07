/** @jsxImportSource @emotion/react */
import React from 'react';
import { IParty } from '../../../../types/partyTypes';
import { chipCss, containerCss, imgCss } from './NotMatched/styles';
import { Chip } from '../../../../components/Chip';

interface PartyItemProps {
  party: IParty;
}

type Hashtag = {
  hashtagId: number;
  hashtagName: string;
};

export const PartyItem = ({ party }: PartyItemProps) => {
  return (
    <div css={containerCss}>
      <img css={imgCss} src={party.theme.poster} alt="" />
      <div>
        <div>{party.theme.title}</div>
        <div>{party.createdAt}</div>
        <div css={chipCss}>
          {party.partyHashtagList?.map((hashtag: Hashtag) => (
            <Chip
              key={hashtag.hashtagId}
              border={1}
              color="primary"
              fontSize={1}
              fontWeight={700}
            >
              {hashtag.hashtagName}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
};
