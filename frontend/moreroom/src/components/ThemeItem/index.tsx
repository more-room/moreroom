/** @jsxImportSource @emotion/react */
import React from 'react';
import { ThemeItemInfoProps } from './ThemeItem.types';
import { base, brandCss, contentCss, imgCss, titleCss } from './ThemeItem.style';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid';
import { Icon } from '../Icon';

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
    <div css={base} {...props}>
      <div >
        <img css = {imgCss} src={`${process.env.PUBLIC_URL}/2ways.jpg`} alt="포스터 사진" />
      </div>
      <div>
        <div css={base}>
          <Icon color="primary" size={1}>
            <MapPinIcon />
          </Icon>

          <div css={brandCss}>
            {brandName} - {branchName}
          </div>
        </div>
        <div css={[titleCss]}>{title}</div>
        <div css={[contentCss]}>
          {playtime} / {genreList.join(', ')}
        </div>
        <div css = {[base, contentCss]}>
        <Icon color="secondary" size={1}>
          <StarIcon />
        </Icon>
        <div>리뷰({review})</div>
        </div>
      </div>
    </div>
  );
};
