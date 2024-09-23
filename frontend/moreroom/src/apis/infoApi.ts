import { IBrand, IGenre, IRegion } from '../types/infoTypes';
import { api } from './interceptors';

/* 지역 조회 */
export const getRegions = () => {
  return api.get<IRegion>('/api/info/region');
};

/* 장르 조회 */
export const getGenres = () => {
  return api.get<IGenre>('/api/info/genre');
};

/* 브랜드 조회 */
export const getBrands = () => {
  return api.get<IBrand>('/api/info/brand');
};
