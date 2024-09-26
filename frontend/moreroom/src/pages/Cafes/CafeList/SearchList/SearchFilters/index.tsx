/** @jsxImportSource @emotion/react */
import React from 'react';
import { filterContainer } from './styles';
import { FilterChip } from '../../../../../components/FilterChip';
import { useModal } from '../../../../../hooks/useModal';
import { useQueries } from '@tanstack/react-query';
import { getBrands, getRegions } from '../../../../../apis/infoApi';
import {
  IBrandCommon,
  IRegionCommon,
  IRegionItem,
} from '../../../../../types/infoTypes';
import { useSearchCafesStore } from '../../../../../stores/cafeStore';
import {
  ISearchCafesRequestParameter,
  nameToKor,
} from '../../../../../types/cafeTypes';
import { CafeFilters } from '../../../../../modals/cafe/CafeFilters';

export const SearchFilters = () => {
  const modal = useModal();
  const searchCafesStore = useSearchCafesStore();
  const [regionQuery, brandQuery] = useQueries({
    queries: [
      { queryKey: ['region'], queryFn: async () => await getRegions() },
      { queryKey: ['brand'], queryFn: async () => await getBrands() },
    ],
  });

  const getSelected = (type: keyof ISearchCafesRequestParameter) => {
    if (searchCafesStore.filters[type]) return true;
    else return false;
  };
  const getText = (type: keyof ISearchCafesRequestParameter) => {
    let str = '';

    if (getSelected(type)) {
      if (type === 'region') {
        regionQuery.data?.data.regions.forEach((region: IRegionItem) => {
          if (region.regionId === searchCafesStore.filters.region) {
            str += region.regionName;
          } else {
            region.cities.forEach((city: IRegionCommon) => {
              if (city.regionId === searchCafesStore.filters.region) {
                str += city.regionName;
              }
            });
          }
        });
      } else {
        brandQuery.data?.data.brandList.forEach((brand: IBrandCommon) => {
          if (brand.brandId === searchCafesStore.filters.brandId) {
            str += brand.brandName;
          }
        });
      }
      return str;
    } else {
      return nameToKor[type];
    }
  };

  return (
    <div css={filterContainer}>
      {Object.keys(nameToKor).map((eng: string) => (
        <FilterChip
          key={eng}
          size={0.875}
          rounded={true}
          selected={getSelected(eng as keyof ISearchCafesRequestParameter)}
          onHandleClick={() => modal.show(<CafeFilters type={eng} />)}
        >
          {getText(eng as keyof ISearchCafesRequestParameter)}
        </FilterChip>
      ))}
    </div>
  );
};
