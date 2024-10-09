/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
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
import { css } from '@emotion/react';

export const ThemeItem = ({
  theme,
  pattern = '',
  ...props
}: ThemeItemProps) => {
  const [imgErr, setImgErr] = useState<boolean>(false);

  return (
    <div css={containerCss} {...props}>
      {!imgErr ? (
        <img
          css={imgCss(imgErr)}
          src={theme.poster}
          alt="포스터 사진"
          onError={() => setImgErr(true)}
        />
      ) : (
        <div css={imgCss(imgErr)}>
          <Typography color="light" weight={500} size={0.75}>
            포스터를
          </Typography>
          <Typography color="light" weight={500} size={0.75}>
            준비중입니다
          </Typography>
        </div>
      )}
      <div css={infoCss}>
        <div css={infoItemCss}>
          <div>
            <Icon color="primary" size={1}>
              <MapPinIcon />
            </Icon>
          </div>
          <Typography
            color="grey"
            scale="500"
            size={0.8125}
            weight={500}
            css={css`
              @media (max-width: 300px) {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            `}
          >
            {theme.cafe.branchName
              ? theme.cafe.brandName + ' - ' + theme.cafe.branchName
              : theme.cafe.cafeName}
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
