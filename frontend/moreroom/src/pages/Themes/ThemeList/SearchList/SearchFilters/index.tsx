/** @jsxImportSource @emotion/react */
import React from 'react';
import { filterContainer } from './styles';
import {
  ISearchThemesRequestParameter,
  filterToKor,
} from '../../../../../types/themeTypes';
import { FilterChip } from '../../../../../components/FilterChip';
import { useModal } from '../../../../../hooks/useModal';
import { ThemeFilters } from '../../../../../modals/theme/ThemeFilters';
import { useSearchThemesStore } from '../../../../../stores/themeStore';
import { useQueries } from '@tanstack/react-query';
import { getBrands, getGenres, getRegions } from '../../../../../apis/infoApi';
import {
  IBrandCommon,
  IGenreCommon,
  IRegionCommon,
  IRegionItem,
} from '../../../../../types/infoTypes';

export const SearchFilters = () => {
  const modal = useModal();
  const searchThemesStore = useSearchThemesStore();
  const [genreQuery, regionQuery, brandQuery] = useQueries({
    queries: [
      { queryKey: ['genre'], queryFn: async () => await getGenres() },
      { queryKey: ['region'], queryFn: async () => await getRegions() },
      { queryKey: ['brand'], queryFn: async () => await getBrands() },
    ],
  });

  const getSelected = (type: keyof ISearchThemesRequestParameter) => {
    if (type === 'genreList') {
      if (searchThemesStore.filters.genreList.length) return true;
      else return false;
    } else {
      if (searchThemesStore.filters[type]) return true;
      else return false;
    }
  };
  const getText = (type: keyof ISearchThemesRequestParameter) => {
    let str = '';

    if (getSelected(type)) {
      if (type === 'genreList') {
        if (searchThemesStore.filters.genreList.length > 3)
          str = '장르 ' + searchThemesStore.filters.genreList.length;
        else {
          genreQuery.data?.data.genreList.forEach((genre: IGenreCommon) => {
            if (searchThemesStore.filters.genreList.includes(genre.genreId)) {
              str += genre.genreName + ', ';
            }
          });
          str = str.substring(0, str.length - 2);
        }
      } else if (type === 'people') {
        str += searchThemesStore.filters.people + '명 이하';
      } else if (type === 'region') {
        regionQuery.data?.data.regions.forEach((region: IRegionItem) => {
          if (region.regionId === searchThemesStore.filters.region) {
            str += region.regionName;
          } else {
            region.cities.forEach((city: IRegionCommon) => {
              if (city.regionId === searchThemesStore.filters.region) {
                str += city.regionName;
              }
            });
          }
        });
      } else if (type === 'level') {
        str += searchThemesStore.filters.level + '단계 이하';
      } else if (type === 'brandId') {
        brandQuery.data?.data.brandList.forEach((brand: IBrandCommon) => {
          if (brand.brandId === searchThemesStore.filters.brandId) {
            str += brand.brandName;
          }
        });
      } else if (type === 'playtime') {
        str += searchThemesStore.filters.playtime + '분 이하';
      } else {
        str += searchThemesStore.filters.price + '원 이하';
      }
      return str;
    } else {
      return filterToKor[type];
    }
  };

  return (
    <div css={filterContainer}>
      {Object.keys(filterToKor).map((eng: string) => (
        <FilterChip
          key={eng}
          size={0.875}
          rounded={true}
          selected={getSelected(eng as keyof ISearchThemesRequestParameter)}
          onHandleClick={() => modal.show(<ThemeFilters type={eng} />)}
        >
          {getText(eng as keyof ISearchThemesRequestParameter)}
        </FilterChip>
      ))}
    </div>
  );
};
