/** @jsxImportSource @emotion/react */
import React from 'react';
import { IThemeDetailItem } from '../../../../types/themeTypes';
import { container, rating, title } from './styles';
import { Typography } from '../../../../components/Typography';
import Rating from '../../../../components/Rating';
import { addComma } from '../../../../utils/priceUtils';
import { Button } from '../../../../components/Button';
import { ICafeThemeDetail } from '../../../../types/cafeTypes';

interface ThemeInfoProps {
  theme: IThemeDetailItem;
  cafe: ICafeThemeDetail;
}

export const ThemeInfo = ({ theme, cafe }: ThemeInfoProps) => {
  return (
    <div css={container}>
      <div css={title(theme.member?.playFlag)}>
        <Typography color="light" weight={700} size={1.25}>
          {theme.title}
        </Typography>
        {theme.member?.playFlag && (
          <Typography
            color="grey"
            weight={400}
            size={0.75}
            style={{ textDecoration: 'underline' }}
          >
            기록 보러가기
          </Typography>
        )}
      </div>
      <div css={rating}>
        <Rating
          count={5}
          value={theme.review.score}
          activeColor="secondary"
          size={1}
        />
        <Typography color="secondary" weight={400} size={0.8125}>
          {Number(theme.review.score).toFixed(1)}
        </Typography>
        <Typography color="secondary" weight={400} size={0.8125}>
          ({theme.review.count})
        </Typography>
      </div>
      <div>
        <Typography color="light">
          {theme.price ? addComma(theme.price) + '원' : '가격 미정'}
        </Typography>
        <Typography
          color="grey"
          size={0.75}
          weight={400}
          style={{ marginTop: '0.25rem' }}
        >
          2인 이용 시 1인가
        </Typography>
      </div>
      <Button handler={() => window.open(cafe.link)} rounded={0.5}>
        <Typography color="light" weight={500}>
          예약하러가기
        </Typography>
      </Button>
    </div>
  );
};
