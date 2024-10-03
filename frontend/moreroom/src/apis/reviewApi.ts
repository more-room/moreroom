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

/* 리뷰 좋아요 추가/삭제 */
export const patchThumbsUp = (reviewId: number) => {
  return api.patch(`/api/review/thumbsup/${reviewId}`);
};

/* 리뷰 수정 */
export const reviewPatch = (reviewId: number, reviewData: { content: string, score: number }) => {
  return api.patch(`/api/review/${reviewId}`, reviewData)
}

/* 리뷰 삭제 */
export const reviewDelete = (reviewId: number) => {
  return api.delete(`/api/review/${reviewId}`)
}