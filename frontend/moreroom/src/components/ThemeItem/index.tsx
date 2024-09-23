/** @jsxImportSource @emotion/react */
import React from 'react';
import { ThemeItemProps } from './ThemeItem.types';
import {
  containerCss,
  contentCss,
  imgCss,
  infoCss,
  infoItemCss,
} from './ThemeItem.styles';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid';
import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { LabeledTypography } from '../LabeledTypography';

export const ThemeItem = ({
  theme,
  pattern = '',
  ...props
}: ThemeItemProps) => {
  return (
    <div css={containerCss} {...props}>
      <img css={imgCss} src={theme.poster} alt="포스터 사진" />
      <div css={infoCss}>
        <div css={infoItemCss}>
          <Icon color="primary" size={1}>
            <MapPinIcon />
          </Icon>
          <Typography color="grey" scale="500" size={0.8125} weight={500}>
            {theme.cafe.brandName} - {theme.cafe.branchName}
          </Typography>
        </div>
        <LabeledTypography
          normalColor="light"
          pattern={pattern}
          size={1}
          str={theme.title}
          weight={700}
        />
        <Typography
          css={contentCss}
          color="grey"
          scale="500"
          size={0.8125}
          weight={500}
        >
          {theme.playtime}분 /{' '}
          {theme.genreList.map(
            (genre: string, idx: number) =>
              genre + (idx === theme.genreList.length - 1 ? '' : ', '),
          )}
        </Typography>
        <div css={infoItemCss}>
          <Icon color="secondary" size={1}>
            <StarIcon />
          </Icon>
          <Typography color="grey" scale="500" size={0.8125} weight={500}>
            리뷰({theme.review.count})
          </Typography>
        </div>
      </div>
    </div>
  );
};
