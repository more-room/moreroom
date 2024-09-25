/** @jsxImportSource @emotion/react */
import React from 'react';
import { ICafeListItem } from '../../../../../types/cafeTypes';
import { info, infoBox, row } from './styles';
import { Icon } from '../../../../../components/Icon';
import {
  ChevronRightIcon,
  LockOpenIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid';
import { Typography } from '../../../../../components/Typography';

interface MarkerInfoProps {
  cafe: ICafeListItem;
}

export const MarkerInfo = ({ cafe }: MarkerInfoProps) => {
  return (
    <div css={info}>
      <div css={infoBox}>
        <div css={row}>
          <Icon>
            <MapPinIcon />
          </Icon>
          <Typography color="light" weight={500} size={0.875}>
            {cafe.cafeName}
          </Typography>
        </div>
        <div css={row}>
          <Icon color="secondary">
            <LockOpenIcon />
          </Icon>
          <Typography color="light" weight={500} size={0.875}>
            {cafe.themeCount}개의 테마
          </Typography>
        </div>
      </div>
      <Icon color="light" size={1.5}>
        <ChevronRightIcon />
      </Icon>
    </div>
  );
};
