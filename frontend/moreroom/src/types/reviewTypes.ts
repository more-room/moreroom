/* 테마 목록 & 테마 상세 조회 */
export interface IThemeReview {
  count: number;
  score: number;
}

/* 내부 리뷰 조회 - 요청 파라미터 */
export interface IReviewListRequestParameter {
  themeId: number;
  pageNumber: number;
  pageSize?: number;
  sortOrder?: string;
  sortBy?: string;
}

/* 내부 리뷰 조회 - 아이템 */
export interface IReviewListItem {
  reviewId: number;
  member: {
    memberId: number;
    memberName: string;
    memberProfile: number;
  };
  content: string;
  score: number;
  thumbsUp: number;
  createdAt: string;
  upFlag: boolean;
}

/* 내부 리뷰 조회 */
export interface IReviewList {
  content: IReviewListItem[];
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalElements: number;
}

// 리뷰 작성
export interface IReviewCreate {
  themeId: number;
  content: string;
  score: number;
}
