/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { ThemeSimpleInfoProps } from './ThemeSimpleInfo.types';
import { base, imgCss } from './ThemeSimpleInfo.styles';
import { Typography } from '../Typography';

export const ThemeSimpleInfo = ({ theme, ...props }: ThemeSimpleInfoProps) => {
  const [imgErr, setImgErr] = useState<boolean>(false);

  return (
    <div css={base} {...props}>
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

      <Typography
        color="light"
        size={0.875}
        weight={500}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {theme.title}
      </Typography>
      <Typography
        color="grey"
        size={0.75}
        weight={400}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {theme.genreList.map(
          (genre: string, idx: number) =>
            genre + (idx === theme.genreList.length - 1 ? '' : ', '),
        )}
      </Typography>
    </div>
  );
};
