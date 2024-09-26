import { create } from 'zustand';
import {
  ICafeList,
  ISearchCafesRequestParameter,
  ISearchNameResponse,
} from '../types/cafeTypes';

export type TCafePage = 'default' | 'search';

/* 카페 페이지 */
type CafePageStoreState = {
  type: TCafePage;
};

type CafePageStoreAction = {
  setType: (type: CafePageStoreState['type']) => void;
};

export const useCafePageStore = create<
  CafePageStoreState & CafePageStoreAction
>()((set) => ({
  type: 'default',
  setType: (type) => set(() => ({ type: type })),
}));

/* 카페 이름 검색 */
type SearchNameStoreState = {
  cafeName: string;
  results: ISearchNameResponse;
};

type SearchNameStoreAction = {
  setName: (cafeName: SearchNameStoreState['cafeName']) => void;
  setResults: (results: SearchNameStoreState['results']) => void;
};

export const useSearchNameStore = create<
  SearchNameStoreState & SearchNameStoreAction
>()((set) => ({
  cafeName: '',
  results: { cafeList: [] },
  setName: (cafeName) => set(() => ({ cafeName: cafeName })),
  setResults: (results) => set(() => ({ results: results })),
}));

/* 카페 목록 검색 */
type SearchCafesState = {
  filters: ISearchCafesRequestParameter;
  results: ICafeList;
};

type SearchCafesAction = {
  setFilters: (filters: SearchCafesState['filters']) => void;
  setResults: (results: SearchCafesState['results']) => void;
};

export const useSearchCafesStore = create<
  SearchCafesState & SearchCafesAction
>()((set) => ({
  filters: {},
  results: {
    cafeList: [],
  },
  setFilters: (filters) => set(() => ({ filters: filters })),
  setResults: (results) => set(() => ({ results: results })),
}));
