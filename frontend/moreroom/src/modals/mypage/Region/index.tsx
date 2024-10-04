/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { container, item, items, regionContainer, cityListContainer } from './styles';
import { getRegions } from '../../../apis/infoApi';
import { IRegionCommon, IRegionItem } from '../../../types/infoTypes';
import { Typography } from '../../../components/Typography';
import { Item } from '../../theme/ThemeFilters/Item';
import { useRegionSelectionStore } from '../../../stores/signupStore';

export const Region = () => {
  const regionQuery = useSuspenseQuery({
    queryKey: ['region'],
    queryFn: async () => await getRegions(),
  });

  const {
    selectedRegionId,
    selectedRegion,
    selectedCity,
    setSelectedRegion,
    setSelectedCity,
    setSelectedRegionId, 
  } = useRegionSelectionStore();

  // 컴포넌트가 마운트될 때 '서울'이 미리 선택되도록 설정
  useEffect(() => {
    if (!selectedRegion) {
      const seoulRegion = regionQuery.data.data.regions.find(
        (region: IRegionItem) => region.regionName === '서울'
      );
      if (seoulRegion) {
        setSelectedRegion(seoulRegion.regionName);
        setSelectedRegionId(seoulRegion.regionId);
      }
    }
  }, [regionQuery.data.data.regions, setSelectedRegion, setSelectedRegionId]);

  useEffect(() => {
    if (selectedRegion) {
      const currentRegion = regionQuery.data.data.regions.find(
        (region: IRegionItem) => region.regionName === selectedRegion
      );
      if (currentRegion) {
        setSelectedCity(null); // 선택된 지역이 변경되면 도시 선택 초기화
      }
    }
  }, [selectedRegion, setSelectedCity, regionQuery.data.data.regions]);

  const handleRegionClick = (region: IRegionItem) => {
    setSelectedRegion(region.regionName);
    setSelectedRegionId(region.regionId); // 선택된 지역 ID 저장
  };

  return (
    <div css={container}>
      <div css={regionContainer}>
        {regionQuery.data.data.regions.map((region: IRegionItem) => (
          <Typography
            key={region.regionId}
            size={0.875}
            color={selectedRegion === region.regionName ? 'light' : 'grey'}
            weight={selectedRegion === region.regionName ? 600 : 400}
            onClick={() => handleRegionClick(region)} 
          >
            {region.regionName}
          </Typography>
        ))}
      </div>
      {selectedRegion && (
        <div css={cityListContainer}>
          <div css={item}>
            <Item
              item={`${selectedRegion} 전체`}
              fullWidth={true}
              selected={selectedCity === null}
              handler={() => setSelectedCity(null)}
            />
          </div>
          <Typography style={{marginTop:'1rem'}} color="light" size={0.875} weight={700}>
            시/군/구
          </Typography>
          <div css={[item, items]}>
            {regionQuery.data.data.regions
              .find((r: IRegionItem) => r.regionName === selectedRegion)
              ?.cities.map((city: IRegionCommon) => (
                <Item
                  key={city.regionId}
                  item={city.regionName}
                  selected={selectedCity === city.regionName}
                  handler={() => setSelectedCity(city.regionName)}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
