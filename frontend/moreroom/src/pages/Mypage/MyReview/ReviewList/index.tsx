/** @jsxImportSource @emotion/react */
import React from 'react';
import { brandCss, containerCss, contentCss, posterCss, themeCss, userInfoCss } from './styles';
import Rating from '../../../../components/Rating';
import { Typography } from '../../../../components/Typography';
import { Icon } from '../../../../components/Icon';
import { MapPinIcon } from '@heroicons/react/24/solid';

export const ReivewList = ({
  nickname,
  profileSrc,
  content,
  score,
  poster,
  themeTitle,
  cafeBrand,
  cafeBranch,
  updatedAt,
}: {
  nickname: string;
  profileSrc: string;
  content: string;
  score: number;
  poster: string;
  themeTitle: string;
  cafeBrand?: string;
  cafeBranch?: string;
  updatedAt: string;
}) => {
  return (
    <div css={containerCss}>
      <div css={contentCss}>
        <div css={userInfoCss}>
          <img src={profileSrc} alt="프로필 사진" />
          <div>
            <Typography color="light" size={0.8} weight={500}>
              {nickname}
            </Typography>
            <Rating
              activeColor="secondary"
              count={5}
              disabled
              size={0.8}
              value={score}
            />
          </div>
        </div>
        <div css={themeCss}>
          <Typography color="light" size={0.8} weight={500}>
            {themeTitle}
          </Typography>
          {cafeBrand && (
            <div css={brandCss}>
              <Icon color="primary" size={1}>
                <MapPinIcon />
              </Icon>
              <Typography color="light" size={0.8} weight={500}>
                {cafeBrand} {cafeBranch}
              </Typography>
            </div>
          )}
        </div>
        <Typography color="grey" scale='100' size={1} weight={500}>
          {content}
        </Typography>
        <Typography style={{marginTop:'1rem'}} color="grey" scale='500' size={0.8} weight={500}>
          {updatedAt} 작성
        </Typography>
      </div>
      <div css={posterCss}>
        <img src={poster} alt="방탈출 사진" />
      </div>
    </div>
  );
};