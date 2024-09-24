/** @jsxImportSource @emotion/react */
import React from 'react';
import { ThemeSimpleInfoProps } from './ThemeSimpleInfo.types';
import { base, imgCss } from './ThemeSimpleInfo.styles';
import { Typography } from '../Typography';
export const ThemeSimpleInfo = ({ theme, ...props }: ThemeSimpleInfoProps) => {
  return (
    <div css={base} {...props}>
      <img css={imgCss} src={theme.poster} alt="포스터 사진" />
      <Typography
        color="light"
        size={0.875}
        weight={500}
        style={{ whiteSpace: 'nowrap' }}
      >
        {theme.title}
      </Typography>
      <Typography color="grey" size={0.75} weight={400}>
        {theme.genreList.map(
          (genre: string, idx: number) =>
            genre + (idx === theme.genreList.length - 1 ? '' : ', '),
        )}
      </Typography>
    </div>
  );
};
