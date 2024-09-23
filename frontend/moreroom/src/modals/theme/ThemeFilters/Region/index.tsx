/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getRegions } from '../../../../apis/infoApi';
import { container, items, regionContainer } from './styles';
import { IRegionCommon, IRegionItem } from '../../../../types/infoTypes';
import { Typography } from '../../../../components/Typography';
import { Item } from '../Item';

export const Region = () => {
  const regionQuery = useSuspenseQuery({
    queryKey: ['region'],
    queryFn: async () => await getRegions(),
  });

  const [selected, setSelected] = useState<IRegionCommon>(
    regionQuery.data.data.regions[0],
  );
  const [sigungu, setSigungu] = useState<IRegionCommon[]>(
    regionQuery.data.data.regions[0].cities,
  );

  const handler = (region: IRegionCommon) => {
    setSelected(region);
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
        <Item item={selected.regionName + ' 전체'} fullWidth={true} />
      </div>
      <Typography color="light" size={0.875} weight={700}>
        시/군/구
      </Typography>
      <div css={items}>
        {sigungu.map((s: IRegionCommon) => (
          <Item item={s.regionName} />
        ))}
      </div>
    </div>
  );
};
