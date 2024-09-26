/** @jsxImportSource @emotion/react */
import React from 'react';
import { info, row } from './styles';
import { Typography } from '../../../../components/Typography';
import { ICafeDetail } from '../../../../types/cafeTypes';
import { Icon } from '../../../../components/Icon';
import { IThemeCommon } from '../../../../types/themeTypes';
import {
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  AtSymbolIcon,
} from '@heroicons/react/24/solid';

interface CafeInfoProps {
  cafe: ICafeDetail;
}

export const CafeInfo = ({ cafe }: CafeInfoProps) => {
  const getReviewSum = () => {
    let count = 0;
    cafe.themeList.forEach((theme: IThemeCommon) => {
      count += theme.review.count;
    });
    return count;
  };

  return (
    <div css={info}>
      <div css={row(0.5)}>
        <Typography color="light" weight={600} size={1.125}>
          {cafe.cafeName}
        </Typography>
        <div css={row(0.25)}>
          <Icon color="secondary" size={1}>
            <StarIcon />
          </Icon>
          <Typography color="secondary" weight={400} size={0.875}>
            리뷰({getReviewSum()})
          </Typography>
        </div>
      </div>
      <div css={row(0.5)}>
        <Icon>
          <MapPinIcon />
        </Icon>
        <Typography color="light" weight={400} size={0.875}>
          {cafe.address}
        </Typography>
      </div>
      <div css={row(0.5)}>
        <Icon>
          <PhoneIcon />
        </Icon>
        <Typography color="light" weight={400} size={0.875}>
          {cafe.tel}
        </Typography>
      </div>
      <div css={row(0.5)}>
        <Icon>
          <AtSymbolIcon />
        </Icon>
        <Typography color="light" weight={400} size={0.875}>
          {cafe.link}
        </Typography>
      </div>
    </div>
  );
};
