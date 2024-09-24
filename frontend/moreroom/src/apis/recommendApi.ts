import { IThemeRecommendList } from '../types/themeTypes';
import { api } from './interceptors';

/* 추천 테마 */
export const getRecommendThemes = (type: string) => {
  return api.get<IThemeRecommendList>(`/api/recommendations/${type}`);
};
