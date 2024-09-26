/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { container, items, regionContainer } from './styles';
import { Item } from '../Item';
import { useSearchCafesStore } from '../../../../stores/cafeStore';
import { getRegions } from '../../../../apis/infoApi';
import { IRegionCommon, IRegionItem } from '../../../../types/infoTypes';
import { Typography } from '../../../../components/Typography';

export const Region = () => {
  const regionQuery = useSuspenseQuery({
    queryKey: ['region'],
    queryFn: async () => await getRegions(),
  });

  const searchCafesStore = useSearchCafesStore();
  const [selected, setSelected] = useState<IRegionCommon>(
    regionQuery.data.data.regions[0],
  );
  const [sigungu, setSigungu] = useState<IRegionCommon[]>(
    regionQuery.data.data.regions[0].cities,
  );

  const handler = (region: IRegionCommon) => {
    setSelected(region);
  };
  const handleFilter = (isAdd: boolean, regionId: string) => {
    if (isAdd) {
      const after = { ...searchCafesStore.filters, region: regionId };
      searchCafesStore.setFilters(after);
    } else {
      const after = { ...searchCafesStore.filters };
      delete after.region;
      searchCafesStore.setFilters(after);
    }
  };

  useEffect(() => {
    regionQuery.data.data.regions.forEach((region: IRegionItem) => {
      if (region.regionName === selected.regionName) {
        setSigungu(() => region.cities);
      }
    });
  }, [selected]);

  return (
    <div css={container}>
      <div css={regionContainer}>
        {regionQuery.data.data.regions.map((region: IRegionItem) => {
          return (
            <Typography
              key={region.regionId}
              size={0.875}
              color={
                selected.regionName === region.regionName ? 'light' : 'grey'
              }
              weight={selected.regionName === region.regionName ? 600 : 400}
              onClick={() => handler(region)}
            >
              {region.regionName}
            </Typography>
          );
        })}
      </div>
      <div css={items}>
        <Item
          item={selected.regionName + ' 전체'}
          fullWidth={true}
          selected={selected.regionId === searchCafesStore.filters.region}
          handler={() => {
            handleFilter(
              !(selected.regionId === searchCafesStore.filters.region),
              selected.regionId,
            );
          }}
        />
      </div>
      <Typography color="light" size={0.875} weight={700}>
        시/군/구
      </Typography>
      <div css={items}>
        {sigungu.map((s: IRegionCommon) => (
          <Item
            key={s.regionId}
            item={s.regionName}
            selected={s.regionId === searchCafesStore.filters.region}
            handler={() => {
              handleFilter(
                !(s.regionId === searchCafesStore.filters.region),
                s.regionId,
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};
