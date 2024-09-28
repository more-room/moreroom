import { IReviewList, IReviewListRequestParameter, IReviewCreate } from '../types/reviewTypes';
import { api } from './interceptors';

/* 내부 리뷰 조회 */
export const getReviewForTheme = (params: IReviewListRequestParameter) => {
  return api.get<IReviewList>('/api/review', { params: params });
};

/* 내부 리뷰 작성 */
export const createReview = (data: IReviewCreate) => {
  return api.post('/api/review', data);
};