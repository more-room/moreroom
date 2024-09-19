/** @jsxImportSource @emotion/react */
import React from 'react';
import { ThemeSimpleInfoProps } from './ThemeSimpleInfo.types';
import './2ways.jpg'
import { base, genreCss, imgCss, titleCss } from './ThemeSimpleInfo.styles';
export const ThemeSimpleInfo = ({
  poster = '/2ways.jpg',
  title = '2ways',
  genreList = ['기타', '미스테리'],
  ...props
}: ThemeSimpleInfoProps) => {
  return (
    <div css={base} {...props}>
      <img css={imgCss} src={`${process.env.PUBLIC_URL}/2ways.jpg`} alt="포스터 사진" />
      <div css={titleCss}>{title}</div>
      <div css={genreCss}>{genreList.join(', ')}</div>
    </div>
  );
};
