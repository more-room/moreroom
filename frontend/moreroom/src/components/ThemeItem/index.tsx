/** @jsxImportSource @emotion/react */
import React from 'react';
import { ThemeItemInfoProps } from './ThemeItem.types';
import { containerCss, contentCss, imgCss, infoCss, infoItemCss } from './ThemeItem.style';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid';
import { Icon } from '../Icon';
import { Typography } from '../Typography';

export const ThemeItemInfo = ({
  poster,
  title,
  genreList = ['기타'],
  brandName,
  branchName,
  playtime,
  review,
  ...props
}: ThemeItemInfoProps) => {
  return (
    <div css={containerCss} {...props}>
      <div>
        <img
          css={imgCss}
          src={`${process.env.PUBLIC_URL}/2ways.jpg`}
          alt="포스터 사진"
        />
      </div>
      <div css={infoCss}>
        <div css={infoItemCss}>
          <Icon color="primary" size={1}>
            <MapPinIcon />
          </Icon>
          <Typography color="grey" scale="500" size={0.625} weight={600}>
            {brandName} - {branchName}
          </Typography>
        </div>
        <Typography css={contentCss} color="light" size={1} weight={700}>
          2Ways
        </Typography>
        <Typography css={contentCss} color="grey" scale="500" size={0.76} weight={400}>
          {playtime}분 / {genreList.join(', ')}
        </Typography>
        <div css={infoItemCss}>
          <Icon color="secondary" size={1}>
            <StarIcon />
          </Icon>
          <Typography color="grey" scale="500" size={0.76} weight={400}>
            리뷰({review})
          </Typography>
        </div>
      </div>
    </div>
  );
};