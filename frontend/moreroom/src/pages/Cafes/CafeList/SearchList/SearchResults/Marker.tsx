/** @jsxImportSource @emotion/react */
import React from 'react';
import { ICafeListItem } from '../../../../../types/cafeTypes';
import { CustomOverlayMap, MapMarker, useMap } from 'react-kakao-maps-sdk';
import { MarkerInfo } from './MarkerInfo';

interface MarkerProps {
  cafe: ICafeListItem;
  vis: boolean;
  idx: number;
  handler: (idx: number) => void;
}

export const Marker = ({ cafe, vis, idx, handler }: MarkerProps) => {
  const map = useMap();

  return (
    <>
      <MapMarker
        position={{ lat: cafe.latitude, lng: cafe.longitude }}
        onClick={(marker) => {
          map.panTo(marker.getPosition());
          handler(idx);
        }}
      />
      {vis && (
        <CustomOverlayMap
          position={{ lat: cafe.latitude, lng: cafe.longitude }}
        >
          <MarkerInfo cafe={cafe} />
        </CustomOverlayMap>
      )}
    </>
  );
};
