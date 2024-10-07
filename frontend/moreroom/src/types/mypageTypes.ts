export const Ihashtags = [
  { id: 30, label: '리더쉽' },
  { id: 31, label: '쫄보' },
  { id: 32, label: '공포면역' },
  { id: 33, label: '고수예요' },
  { id: 34, label: '초보예요' },
  { id: 35, label: '활동적이에요' },
  { id: 36, label: '눈치가 빨라요' },
  { id: 37, label: '꼼꼼해요' },
  { id: 38, label: '적극적이에요' },
  { id: 39, label: '분석적이에요' },
  { id: 40, label: '스토리 좋아해요' },
  { id: 41, label: '분위기 메이커' },
];

type TGender = 'M' | 'F' | undefined;

export interface ISignUP {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  gender: TGender;
  birth: string;
  genreIdList: number[];
  regionId: string;
}

export interface IMyReview {
  reviewId: number;
  content: string;
  score: number;
  member: {
    memberName: string;
    memberProfile: string;
  };
  theme: {
    themeId: number;
    title: string;
    poster: string;
  };
  cafe: {
    brandName: string;
    branchName: string;
  };
  createdAt: string;
}
