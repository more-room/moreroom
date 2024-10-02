import { StoryIndex } from 'storybook/internal/types';

export const Ipartyhastag = [
  { id: 1, label: '뉴비친화' },
  { id: 2, label: '타임어택' },
  { id: 3, label: '노힌트' },
  { id: 4, label: '과몰입' },
  { id: 5, label: '편하게 와요' },
];

export const ImyHashtags = [
  { id: 6, label: '리더쉽' },
  { id: 7, label: '쫄보' },
  { id: 8, label: '공포면역' },
  { id: 9, label: '고수예요' },
  { id: 10, label: '초보예요' },
  { id: 11, label: '활동적이에요' },
  { id: 12, label: '눈치가 빨라요' },
  { id: 13, label: '꼼꼼해요' },
  { id: 14, label: '적극적이에요' },
  { id: 15, label: '분석적이에요' },
  { id: 16, label: '스토리 좋아해요' },
  { id: 17, label: '분위기 메이커' },
];

export const IuserHashtags = [
  { id: 18, label: '리더쉽' },
  { id: 19, label: '쫄보' },
  { id: 20, label: '공포면역' },
  { id: 21, label: '고수예요' },
  { id: 22, label: '초보예요' },
  { id: 23, label: '활동적이에요' },
  { id: 24, label: '눈치가 빨라요' },
  { id: 25, label: '꼼꼼해요' },
  { id: 26, label: '적극적이에요' },
  { id: 27, label: '분석적이에요' },
  { id: 28, label: '스토리 좋아해요' },
  { id: 29, label: '분위기 메이커' },
];

export interface IMember {
  memberId: number;
  nickname: string;
  photo: string;
  memberHashtag: {
    hashtagId: number;
    hashtagName: string;
  };
}

export interface IParty {
  partyRequestId: number;
  status: {
    statusId: number;
    statusName: string;
    members: null | IMember;
  };
  theme: {
    themeId: number;
    poster: string;
    title: string;
  };
  createdAt: string;
  hashtagList: {
    hashtagId: number;
    hashtagName: string;
  }[];
}
