/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchCafesStore } from '../../../../../stores/cafeStore';
import { getCafes } from '../../../../../apis/cafeApi';
import { ICafeListItem } from '../../../../../types/cafeTypes';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useSuspenseQuery } from '@tanstack/react-query';
import { container } from './styles';
import { ResetMapBounds } from './ResetMapBounds';
import { Marker } from './Marker';

export const SearchResults = () => {
  const nav = useNavigate();
  const searchCafesStore = useSearchCafesStore();
  const [vis, setVis] = useState<number>(0);
  const cafeQuery = useSuspenseQuery({
    queryKey: ['cafes'],
    queryFn: async () => await getCafes(searchCafesStore.filters),
  });
  const handler = (idx: number) => setVis(idx);

  useEffect(() => {
    cafeQuery.refetch();
  }, [searchCafesStore.filters]);

  return (
    <Map
      css={container}
      center={{
        lat: cafeQuery.data.data.cafeList[0].latitude,
        lng: cafeQuery.data.data.cafeList[0].longitude,
      }}
      level={14}
    >
      {cafeQuery.data.data.cafeList.map((cafe: ICafeListItem, idx: number) => {
        return (
          <Marker
            key={cafe.cafeId}
            cafe={cafe}
            vis={vis === idx}
            idx={idx}
            handler={handler}
          />
        );
      })}
      <ResetMapBounds cafeList={cafeQuery.data.data.cafeList} />
    </Map>
  );
};
