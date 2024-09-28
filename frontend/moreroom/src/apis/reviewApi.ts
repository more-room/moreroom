import { IReviewList, IReviewListRequestParameter } from '../types/reviewTypes';
import { api } from './interceptors';

/* 내부 리뷰 조회 */
export const getReviewForTheme = (params: IReviewListRequestParameter) => {
  return api.get<IReviewList>('/api/review', { params: params });
};

