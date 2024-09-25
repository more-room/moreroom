import { create } from 'zustand';
import { IPartyResponse } from '../types/chatingTypes';

/* 파티 페이지 스토어 */
export type PartyPageStoreState = {
  type: 'default' | 'search'; // 파티 페이지 유형 ('default' | 'search')
};

export type PartyPageStoreAction = {
  setType: (type: PartyPageStoreState['type']) => void; // 페이지 유형 설정
};

/* 파티 목록 검색 스토어 */
export type SearchPartiesState = {
  filters: any; // 필터 파라미터 (필요에 따라 세부적으로 정의 가능)
  results: IPartyResponse; // 파티 검색 결과
};

export type SearchPartiesAction = {
  setFilters: (filters: SearchPartiesState['filters']) => void; // 필터 설정
  setResults: (results: SearchPartiesState['results']) => void; // 결과 설정
};

/* 파티 제목 검색 스토어 */
export type SearchPartyTitleStoreState = {
  title: string; // 검색할 파티 제목
  results: IPartyResponse; // 제목 검색 결과
};

export type SearchPartyTitleStoreAction = {
  setTitle: (title: SearchPartyTitleStoreState['title']) => void; // 제목 설정
  setResults: (results: SearchPartyTitleStoreState['results']) => void; // 결과 설정
};
export const usePartyPageStore = create<PartyPageStoreState & PartyPageStoreAction>()((set) => ({
  type: 'default',
  setType: (type) => set(() => ({ type: type })),
}));

export const useSearchPartiesStore = create<SearchPartiesState & SearchPartiesAction>()((set) => ({
  filters: {
    genreList: [], // 예시로 기본 필터
  },
  results: {
    content: [], // 파티 리스트 초기화
    pageable: null,
    totalElements: 0,
    totalPages: 0,
    last: true,
  },
  setFilters: (filters) => set(() => ({ filters: filters })),
  setResults: (results) => set(() => ({ results: results })),
}));


export const useSearchPartyTitleStore = create<
  SearchPartyTitleStoreState & SearchPartyTitleStoreAction
>()((set) => ({
  title: '',
  results: {
    content: [],
    pageable: null,
    totalElements: 0,
    totalPages: 0,
    last: true,
  },
  setTitle: (title) => set(() => ({ title: title })),
  setResults: (results) => set(() => ({ results: results })),
}));

