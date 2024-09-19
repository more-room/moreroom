/** @jsxImportSource @emotion/react */
import React from 'react';
import { ThemeItemInfoProps } from './ThemeItem.types';
import { base } from './ThemeItem.style';

export const ThemeItemInfo = ({
  poster,
  title,
  genreList,
  brandName,
  branchName,
  playtime,
  review,
  ...props
}:ThemeItemInfoProps) => {
  return (
    <div css={base} {...props}>
      
    </div>
  )
}