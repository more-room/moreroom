/** @jsxImportSource @emotion/react */
import React from 'react';
import { IParty } from '../../../../stores/partyStore';
import { brandCss, containerCss, contentCss, imgCss, titleCss } from './styles';
import { Typography } from '../../../../components/Typography';
import { Icon } from '../../../../components/Icon';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

interface ISelected {
  poster: string;
  themeTitle: string;
  brandName: string;
  branchName: string;
}

export const SelectedTheme = ({
  poster,
  themeTitle,
  brandName,
  branchName,
}: ISelected) => {
  const nav = useNavigate();
  return (
    <div css={containerCss} onClick={() => nav('/party/addtheme')}>
      <img css={imgCss} src={poster} alt="포스터 사진" />
      <div css={contentCss}>
        <Typography css={titleCss} color="light" size={1} weight={700}>
          {themeTitle}
        </Typography>
        <div css={brandCss}>
          <Icon color="primary" size={1}>
            <MapPinIcon />
          </Icon>
          {brandName ? (
            <Typography color="grey" scale="600" size={0.8} weight={500}>
              {brandName} - {branchName}
            </Typography>
          ) : (
            <Typography color="grey" scale="600" size={0.8} weight={500}>
              장소 정보 없음
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
