/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { HistoryCardProps } from './HistoryCard.types';
import { base, box, header, img, info } from './HistoryCard.styles';
import {
  ChevronRightIcon,
  ClockIcon,
  LightBulbIcon,
} from '@heroicons/react/24/solid';
import { Icon } from '../Icon';
import { Typography } from '../Typography';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const HistoryCard = ({
  history,
  bgColor = 'grey',
  bgColorScale = '800',
  children,
  ...props
}: HistoryCardProps) => {
  const [imgErr, setImgErr] = useState<boolean>(false);

  return (
    <div css={base(bgColor, bgColorScale)} {...props}>
      <div css={box}>
        {!imgErr ? (
          <img
            src={history.theme.poster}
            alt={history.theme.title}
            css={img(imgErr)}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div css={img(imgErr)}>
            <Typography color="light" weight={500} size={0.75}>
              포스터를
            </Typography>
            <Typography color="light" weight={500} size={0.75}>
              준비중입니다
            </Typography>
          </div>
        )}
        <div css={info}>
          <div>
            <Typography color="light" weight={500} size={1}>
              {history.theme.title}
            </Typography>
            <Typography color="grey" size={0.75} weight={400}>
              {history.theme.cafeName}
            </Typography>
            <Typography color="grey" size={0.75} weight={400}>
              {dayjs(history.date).format('YYYY년 M월 D일(ddd) HH:mm')}
            </Typography>
          </div>
          <div css={box}>
            <div css={header}>
              <Icon>
                <ClockIcon />
              </Icon>
              <Typography color="light" size={0.875} weight={400}>
                {Math.floor(history.memberPlayTime / 60)}분{' '}
                {history.memberPlayTime % 60}초
              </Typography>
            </div>
            <div css={header}>
              <Icon>
                <LightBulbIcon />
              </Icon>
              <Typography color="light" size={0.875} weight={400}>
                {history.hintCount}개
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <Icon color="light" size={1.5}>
        <ChevronRightIcon />
      </Icon>
      {children}
    </div>
  );
};
