import {
  ISearchThemesRequestParameter,
  ISearchTitleResponse,
  IThemeDetail,
  IThemeList,
} from '../types/themeTypes';
import { api } from './interceptors';

/* 테마 제목 검색 */
export const getThemeTitles = (title: string) => {
  return api.get<ISearchTitleResponse>('/api/theme/search', {
    params: { title: title },
  });
};

/* 테마 목록 검색 */
export const getThemes = (
  filters: ISearchThemesRequestParameter,
  pageNumber: number,
) => {
  const params: { [key: string]: string | number | number[] | undefined } = {};

  Object.keys(filters).map((k: string) => {
    if (filters[k as keyof ISearchThemesRequestParameter]) {
      if (k === 'genreList') {
        if (filters['genreList'].length) {
          params['genreList'] = filters['genreList'].join(',');
        }
      } else {
        params[k] = filters[k as keyof ISearchThemesRequestParameter];
      }
    }
  });
  params['pageNumber'] = pageNumber;

  return api.get<IThemeList>('/api/theme', {
    params: params,
  });
};

/* 테마 상세 조회 */
export const getThemeDetail = (themeId: number) => {
  return api.get<IThemeDetail>(`/api/theme/${themeId}`);
};
