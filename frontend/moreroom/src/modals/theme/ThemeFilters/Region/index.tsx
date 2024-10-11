/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getRegions } from '../../../../apis/infoApi';
import { container, item, items, regionContainer } from './styles';
import { IRegionCommon, IRegionItem } from '../../../../types/infoTypes';
import { Typography } from '../../../../components/Typography';
import { Item } from '../Item';
import { useSearchThemesStore } from '../../../../stores/themeStore';

export const Region = () => {
  const regionQuery = useSuspenseQuery({
    queryKey: ['region'],
    queryFn: async () => await getRegions(),
  });

  const searchThemesStore = useSearchThemesStore();
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
      const after = { ...searchThemesStore.filters, region: regionId };
      searchThemesStore.setFilters(after);
    } else {
      const after = { ...searchThemesStore.filters };
      delete after.region;
      searchThemesStore.setFilters(after);
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
      <div css={item}>
        <Item
          item={selected.regionName + ' 전체'}
          fullWidth={true}
          selected={selected.regionId === searchThemesStore.filters.region}
          handler={() => {
            handleFilter(
              !(selected.regionId === searchThemesStore.filters.region),
              selected.regionId,
            );
          }}
        />
      </div>
      <Typography color="light" size={0.875} weight={700}>
        시/군/구
      </Typography>
      <div css={[item, items]}>
        {sigungu.map((s: IRegionCommon) => (
          <Item
            key={s.regionId}
            item={s.regionName}
            selected={s.regionId === searchThemesStore.filters.region}
            handler={() => {
              handleFilter(
                !(s.regionId === searchThemesStore.filters.region),
                s.regionId,
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};
