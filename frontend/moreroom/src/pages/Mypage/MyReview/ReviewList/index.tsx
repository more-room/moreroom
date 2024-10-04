/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  brandCss,
  containerCss,
  contentCss,
  headerCss,
  leftContentCss,
  posterCss,
  profileCss,
  themeCss,
  updatedAtCss,
} from './styles';
import Rating from '../../../../components/Rating';
import { Typography } from '../../../../components/Typography';
import { Icon } from '../../../../components/Icon';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

export const ReivewList = ({
  nickname,
  profileSrc,
  content,
  score,
  poster,
  themeId,
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
  themeId: number;
  themeTitle: string;
  cafeBrand?: string;
  cafeBranch?: string;
  updatedAt: string;
}) => {
  const nav = useNavigate();
  const handleClick = () => {
    nav(`/themes/${themeId}`);
  };
  return (
    <div css={containerCss}>
      <div css={headerCss}>
        <div css={leftContentCss}>
          <div css={profileCss}>
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
          <div css={themeCss} onClick={handleClick}>
            <Typography color="grey" scale="600" size={0.8} weight={600}>
              {themeTitle}
            </Typography>
            <div css={brandCss}>
              <Icon color="primary" size={1}>
                <MapPinIcon />
              </Icon>
              {cafeBrand ? (
                <Typography color="grey" scale="600" size={0.8} weight={500}>
                  {cafeBrand} - {cafeBranch}
                </Typography>
              ) : (
                <Typography color="grey" scale="600" size={0.8} weight={500}>
                  장소 정보 없음
                </Typography>
              )}
            </div>
          </div>
        </div>
        <div css={posterCss} onClick={handleClick}>
          <img src={poster} alt="방탈출 사진" />
        </div>
      </div>
      <div css={contentCss}>
        <Typography color="grey" scale="100" size={0.8} weight={500}>
          {content}
        </Typography>
        <Typography
          css={updatedAtCss}
          color="grey"
          scale="500"
          size={0.8}
          weight={500}
        >
          {updatedAt} 작성
        </Typography>
      </div>
    </div>
  );
};
