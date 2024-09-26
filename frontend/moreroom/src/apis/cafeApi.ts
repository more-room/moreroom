import { ICafeThemeDetail } from '../types/cafeTypes';
import { api } from './interceptors';

/* 카페 조회 - 테마 상세 조회용 */
export const getCafeForTheme = (themeId: number) => {
  return api.get<ICafeThemeDetail>(`/api/cafe/theme/${themeId}`);
};
