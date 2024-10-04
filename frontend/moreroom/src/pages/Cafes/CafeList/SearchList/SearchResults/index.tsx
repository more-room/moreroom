/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { useSearchCafesStore } from '../../../../../stores/cafeStore';
import { getCafes } from '../../../../../apis/cafeApi';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useSuspenseQuery } from '@tanstack/react-query';
import { container } from './styles';
import { Infos } from './Infos';
import { ICafeListItem } from '../../../../../types/cafeTypes';

export const SearchResults = () => {
  const searchCafesStore = useSearchCafesStore();
  const [selected, setSelected] = useState<number>(0);
  const position = useRef<{ lat: number; lng: number }>({
    lat: 37.5665851,
    lng: 126.9782038,
  });
  const cafeQuery = useSuspenseQuery({
    queryKey: ['cafes'],
    queryFn: async () => await getCafes(searchCafesStore.filters),
  });

  useEffect(() => {
    cafeQuery.refetch();
  }, [searchCafesStore.filters]);

  return (
    <>
      <Map
        css={container}
        center={{
          lat: cafeQuery.data.data.cafeList.length
            ? cafeQuery.data.data.cafeList[selected].latitude
            : position.current.lat,
          lng: cafeQuery.data.data.cafeList.length
            ? cafeQuery.data.data.cafeList[selected].longitude
            : position.current.lng,
        }}
        level={1}
      >
        {cafeQuery.data.data.cafeList.length &&
          cafeQuery.data.data.cafeList.map((cafe: ICafeListItem) => (
            <MapMarker
              key={cafe.cafeId}
              position={{
                lat: cafe.latitude,
                lng: cafe.longitude,
              }}
            />
          ))}
        <Infos
          cafeList={cafeQuery.data.data.cafeList}
          selected={selected}
          handler={setSelected}
        />
      </Map>
    </>
  );
};
