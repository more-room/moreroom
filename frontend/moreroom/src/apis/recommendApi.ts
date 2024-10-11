import {
  IThemeGenreRecommendList,
  IThemePositionRecommendList,
  IThemeRecommendList,
} from '../types/themeTypes';
import { api } from './interceptors';

/* 추천 테마 */
export const getRecommendThemes = (type: string) => {
  return api.get<IThemeRecommendList>(`/api/recommendations/${type}`);
};

export const getPosRecThemes = (lat: number, lon: number) => {
  return api.get<IThemePositionRecommendList>(
    '/api/recommendations/nearby-themes',
    {
      params: {
        lat: lat,
        lon: lon,
      },
    },
  );
};

export const getGenRecThemes = () => {
  return api.get<IThemeGenreRecommendList>(
    '/api/recommendations/genres-themes',
  );
};
