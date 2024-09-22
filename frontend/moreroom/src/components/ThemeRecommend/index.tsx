/** @jsxImportSource @emotion/react */
import React from 'react';
import { ThemeRecommendProps } from './ThemeRecommend.types';
import {
  containerCss,
  contentCss,
  imgCss,
  infoCss,
  infoItemCss,
  lineCss,
  checkboxContainerCss,
  checkIconCss,
  titleCss,
  ratingCss,
  imgWrapperCss

} from './ThemeRecommend.styles';
import { StarIcon, CheckIcon } from '@heroicons/react/24/solid';
import { Icon } from '../Icon';
import { ExpectedRating } from '../ExpectedRating';
import { Typography } from '../Typography';
import { LabeledTypography } from '../LabeledTypography';

export const ThemeRecommend = ({
  theme,
  pattern = '',
  ...props
}: ThemeRecommendProps) => {
  return (
    <div css={containerCss} {...props}>
      {/* 포스터 출력 */}
       <div css={imgWrapperCss}>
        <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <img css={imgCss} src={theme?.poster} alt="포스터 사진" />

          {/* 예상 등급 */}
          <div css={ratingCss}>
            <ExpectedRating size={0.5}/>
          </div>
        </div>
          
          {/* 테마 제목 */}
        <div css={titleCss}>
          <LabeledTypography
            normalColor="light"
            pattern={pattern}
            size={1}
            str={theme?.title ?? '테마 없음'} // undefined일 경우 '테마 없음' 출력
            weight={700}
          />
        </div>

        {/* 포스터 밑에 정보 출력 */}
        <div css={infoCss}>
          {/* 위치 정보 */}
          <div css={infoItemCss}>
            <Typography color="grey" scale="500" size={0.625} weight={600}>
              {theme?.brandName} - {theme?.branchName}
            </Typography>
          </div>
          
          {/* 사용자 성향에 맞춘 추천 항목 */}
          <div css={infoItemCss}>
            <Icon color="dark" size={1}>
              <div css={checkboxContainerCss}>
                <CheckIcon css={checkIconCss} /> 
              </div>
            </Icon>
            <Typography color="light" scale="500" size={0.76} weight={300}>
               나와 비슷한 성향의 사용자가 좋아하는 테마
              <div css={lineCss}></div>
            </Typography>
          </div>
          

          {/* 테마와 유사한 높은 별점 테마 */}
          <div css={infoItemCss}>
            <Icon color="dark" size={1}>
              <div css={checkboxContainerCss}>
                <CheckIcon css={checkIconCss} /> 
              </div>
            </Icon>
            <Typography color="light" scale="500" size={0.76} weight={300}>
               높은 별점을 주신 'Bad Rob Bad'와 비슷한 테마
              <div css={lineCss}></div>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
