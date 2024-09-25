/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo } from 'react';
import { ICafeListItem } from '../../../../../types/cafeTypes';
import { useMap } from 'react-kakao-maps-sdk';

interface ResetMapBoundsProps {
  cafeList: ICafeListItem[];
}

export const ResetMapBounds = ({ cafeList }: ResetMapBoundsProps) => {
  const map = useMap();
  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    cafeList.forEach((cafe) => {
      bounds.extend(new kakao.maps.LatLng(cafe.latitude, cafe.longitude));
    });
    return bounds;
  }, [cafeList]);

  useEffect(() => {
    map.setBounds(bounds);
  }, []);

  return <></>;
};
