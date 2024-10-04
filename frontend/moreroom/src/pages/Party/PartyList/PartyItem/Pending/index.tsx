/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import {
  btnContainerCss,
  chipCss,
  containerCss,
  contentCss,
  imgCss,
  timeCss,
  topContentCss,
} from './styles';
import { Chip } from '../../../../../components/Chip';
import { IParty } from '../../../../../types/partyTypes';
import { Typography } from '../../../../../components/Typography';
import { Button } from '../../../../../components/Button';
import { Icon } from '../../../../../components/Icon';
import { ClockIcon } from '@heroicons/react/24/outline';
import { Toggle } from '../../../../../components/Toggle';
import { fontSize } from '../../../../../components/MenuTab/MenuTab.stories';
import { UserGroupIcon } from '@heroicons/react/24/solid';

interface PartyItemProps {
  party: IParty;
  // handler: () => void;
}

type Hashtag = {
  hashtagId: number;
  hashtagName: string;
};
export const Pending = ({ party}: PartyItemProps) => {
  return (
    <div css={containerCss}>
      <div css={topContentCss}>
        <img css={imgCss} src={party.theme.poster} alt="" />
        <div css={contentCss}>
          <Typography color="light" size={1.2} weight={700}>
            {party.theme.title}
          </Typography>
          <div css={timeCss}>
            <Icon color="primary" size={1}>
              <ClockIcon />
            </Icon>
            <Typography color="grey" scale="500" size={0.8} weight={700}>
              {party.createdAt}
            </Typography>
          </div>
          <div css={chipCss}>
            {party.hashtagList?.map((hashtag: Hashtag) => (
              <Chip
                key={hashtag.hashtagId}
                border={1}
                color="primary"
                fontSize={0.6}
                fontWeight={700}
              >
                {hashtag.hashtagName}
              </Chip>
            ))}
          </div>
        </div>
      </div>
      <div css={btnContainerCss}>
        <Button
          style={{ fontSize: '1rem' }}
          color="grey"
          scale="500"
          fullwidth
          rounded={0.5}
          variant="contained"
          handler={()=>{}}
        >
          수락 대기 중
        </Button>
      </div>
    </div>
  );
};
