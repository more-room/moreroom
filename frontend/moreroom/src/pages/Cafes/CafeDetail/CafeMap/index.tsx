/** @jsxImportSource @emotion/react */
import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { ICafeDetail } from '../../../../types/cafeTypes';
import { map } from './styles';

interface CafeMapProps {
  cafe: ICafeDetail;
}

export const CafeMap = ({ cafe }: CafeMapProps) => {
  return (
    <Map
      center={{
        lat: cafe.latitude,
        lng: cafe.longitude,
      }}
      level={1}
      draggable={false}
      zoomable={false}
      css={map}
    >
      <MapMarker
        position={{
          lat: cafe.latitude,
          lng: cafe.longitude,
        }}
      />
    </Map>
  );
};
