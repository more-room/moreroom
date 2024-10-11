/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { box, container, info, poster, row } from './styles';
import { Typography } from '../../../components/Typography';
import { IParty } from '../../../types/chatingTypes';
import dayjs from 'dayjs';
import { Button } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';

interface PartyListCardProps {
  party: IParty;
}

export const PartyListCard = ({ party }: PartyListCardProps) => {
  const nav = useNavigate();
  const [imgErr, setImgErr] = useState<boolean>(false);

  return (
    <div css={container}>
      {!imgErr ? (
        <img
          css={poster(imgErr)}
          src={party.theme.poster}
          onError={() => setImgErr(true)}
        />
      ) : (
        <div css={poster(imgErr)}>
          <Typography color="light" weight={500} size={0.75}>
            포스터를
          </Typography>
          <Typography color="light" weight={500} size={0.75}>
            준비중입니다
          </Typography>
        </div>
      )}
      <div css={box}>
        <div css={info}>
          <div css={row(0.25)}>
            <Typography
              color="light"
              size={1}
              weight={700}
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {party.theme.title}
            </Typography>
            <Typography color="grey" size={0.75}>
              {party.memberCount}명 / {party.maxMember}명
            </Typography>
          </div>
          <div css={row(0.25)}>
            <Typography color="light" weight={500} size={0.875}>
              {dayjs(party.date).format('MM월 DD일(ddd) HH시mm분')}
            </Typography>
          </div>
        </div>
        <Button
          rounded={0.5}
          handler={() => nav(`/chatingroom/${party.partyId}`)}
          style={{ whiteSpace: 'nowrap' }}
        >
          채팅방 이동
        </Button>
      </div>
    </div>
  );
};
