/** @jsxImportSource @emotion/react */
import React from 'react';
import { ThemeSimpleInfoProps } from './ThemeSimpleInfo.types';
import { base, genreCss, imgCss, titleCss } from './ThemeSimpleInfo.styles';
export const ThemeSimpleInfo = ({
  theme,
  ...props
}: ThemeSimpleInfoProps) => {
  return (
    <div css={base} {...props}>
      <img css={imgCss} src={theme?.poster} alt="포스터 사진" />
      <div css={titleCss}>{theme?.title}</div>
      <div css={genreCss}>{theme?.genrename}</div>
    </div>
  );
};
