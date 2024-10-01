import { create } from 'zustand';

// 파티 데이터 인터페이스
export interface IParty {
  themeId: number;
  myHashtagIdList: number[];
  yourHashtagIdList: number[];
  partyHashtagIdList: number[];
  themeTitle: string;
  poster: string;
  brandName: string;
  branchName: string;
}

// 파티 액션 인터페이스
export interface PartyAction {
  setPartyData: (data: Partial<IParty>) => void;
}

// Zustand 스토어 생성
export const usePartyStore = create<IParty & PartyAction>()((set) => ({
  themeId: 0,
  myHashtagIdList: [],
  yourHashtagIdList: [],
  partyHashtagIdList: [],
  themeTitle: '',
  poster: '',
  brandName: '',
  branchName: '',

  // 입력된 파티 데이터를 업데이트하는 함수
  setPartyData: (data) =>
    set((state) => ({
      ...state,
      ...data,
      // themeId: data.themeId,
      // myHashtagIdList: data.myHashtagIdList,
      // yourHashtagIdList: data.yourHashtagIdList,
      // partyHashtagIdList: data.partyHashtagIdList,
    })),
}));
