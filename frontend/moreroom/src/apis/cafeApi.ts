import {
  ICafeDetail,
  ICafeList,
  ICafeThemeDetail,
  ISearchCafesRequestParameter,
  ISearchNameResponse,
} from '../types/cafeTypes';
import { api } from './interceptors';

/* 카페 조회 - 테마 상세 조회용 */
export const getCafeForTheme = (themeId: number) => {
  return api.get<ICafeThemeDetail>(`/api/cafe/theme/${themeId}`);
};

/* 카페 이름 검색 */
export const getCafeNames = (cafeName: string) => {
  return api.get<ISearchNameResponse>('/api/cafe/search', {
    params: { name: cafeName },
  });
};

/* 카페 목록 검색 */
export const getCafes = (filters: ISearchCafesRequestParameter) => {
  return api.get<ICafeList>('/api/theme', {
    params: filters,
  });
};

/* 카페 상세 조회 */
export const getCafeDetail = (cafeId: number) => {
  return api.get<ICafeDetail>(`/api/theme/${cafeId}`);
};
