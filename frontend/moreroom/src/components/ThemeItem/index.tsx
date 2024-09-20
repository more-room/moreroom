/** @jsxImportSource @emotion/react */
import React from 'react';
import { ThemeItemInfoProps } from './ThemeItem.types';
import {
  containerCss,
  contentCss,
  imgCss,
  infoCss,
  infoItemCss,
  lineCss,
} from './ThemeItem.style';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid';
import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { LabeledTypography } from '../LabeledTypography';

export const ThemeItemInfo = ({
  theme,
  pattern='',
  ...props
}: ThemeItemInfoProps) => {
  return (
    <div css={containerCss} {...props}>
      <div >
        <img
          css={imgCss}
          src={theme?.poster}
          alt="포스터 사진"
        />
      </div>
      <div css={infoCss}>
        <div css={infoItemCss}>
          <Icon color="primary" size={1}>
            <MapPinIcon />
          </Icon>
          <Typography color="grey" scale="500" size={0.625} weight={600}>
            {theme?.brandName} - {theme?.branchName}
          </Typography>
        </div>
          <LabeledTypography
            normalColor="light"
            pattern={pattern}
            size={1}
            str={theme?.title ?? '테마 없음'} // undefined일 경우 '테마 없음' 출력
            weight={700}
          />
        <Typography
          css={contentCss}
          color="grey"
          scale="500"
          size={0.76}
          weight={400}
        >
          {theme?.playtime}분 / {theme?.genrename}
        </Typography>
        <div css={infoItemCss}>
          <Icon color="secondary" size={1}>
            <StarIcon />
          </Icon>
          <Typography color="grey" scale="500" size={0.76} weight={400}>
            리뷰({theme?.reviewCount})
          </Typography>
        </div>
        <div css={lineCss}></div>
      </div>
    </div>
  );
};