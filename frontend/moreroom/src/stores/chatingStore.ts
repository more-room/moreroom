import { create } from 'zustand';
import { 
  PartyPageStoreState,
  PartyPageStoreAction,
  SearchPartiesState,
  SearchPartiesAction,
  SearchPartyTitleStoreState,
  SearchPartyTitleStoreAction,
 } from '../types/chatingTypes'

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
