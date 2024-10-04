/** @jsxImportSource @emotion/react */
import React from 'react';
import { ICafeThemeDetail } from '../../../../types/cafeTypes';
import { Typography } from '../../../../components/Typography';
import { container, map, row } from './styles';
import { Icon } from '../../../../components/Icon';
import { AtSymbolIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface ThemeCafeProps {
  cafe: ICafeThemeDetail;
}

export const ThemeCafe = ({ cafe }: ThemeCafeProps) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <Typography
        color="light"
        weight={700}
        size={1}
        style={{ marginLeft: '1rem' }}
      >
        지점 정보
      </Typography>
      <div css={container}>
        <Typography color="light" size={0.875} weight={400}>
          {cafe.brandName ? cafe.brandName : ''} {cafe.branchName}
        </Typography>
        <Map
          center={{ lat: cafe.latitude, lng: cafe.longitude }}
          css={map}
          level={2}
          draggable={false}
          zoomable={false}
        >
          <MapMarker position={{ lat: cafe.latitude, lng: cafe.longitude }} />
        </Map>
        <div css={row}>
          <Icon size={1}>
            <MapPinIcon />
          </Icon>
          <Typography color="light" size={0.8125} weight={400}>
            {cafe.address}
          </Typography>
        </div>
        <div css={row}>
          <Icon size={1}>
            <PhoneIcon />
          </Icon>
          <Typography color="light" size={0.8125} weight={400}>
            {cafe.tel}
          </Typography>
        </div>
        <div css={row}>
          <Icon size={1} style={{ minWidth: '1rem' }}>
            <AtSymbolIcon />
          </Icon>
          <Typography
            color="light"
            size={0.8125}
            weight={400}
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textDecoration: 'underline',
            }}
            onClick={() => window.open(cafe.link)}
          >
            {cafe.link}
          </Typography>
        </div>
      </div>
    </div>
  );
};
