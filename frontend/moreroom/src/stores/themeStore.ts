import { create } from 'zustand';
import {
  ISearchThemesRequestParameter,
  ISearchTitleResponse,
  IThemeList,
} from '../types/themeTypes';

/* 테마 페이지 */
type ThemePageStoreState = {
  type: 'default' | 'search';
};

type ThemePageStoreAction = {
  setType: (type: ThemePageStoreState['type']) => void;
};

export const useThemePageStore = create<
  ThemePageStoreState & ThemePageStoreAction
>()((set) => ({
  type: 'default',
  setType: (type) => set(() => ({ type: type })),
}));

/* 테마 제목 검색 */
type SearchTitleStoreState = {
  title: string;
  results: ISearchTitleResponse;
};

type SearchTitleStoreAction = {
  setTitle: (title: SearchTitleStoreState['title']) => void;
  setResults: (results: SearchTitleStoreState['results']) => void;
};

export const useSearchTitleStore = create<
  SearchTitleStoreState & SearchTitleStoreAction
>()((set) => ({
  title: '',
  results: { themeList: [] },
  setTitle: (title) => set(() => ({ title: title })),
  setResults: (results) => set(() => ({ results: results })),
}));

/* 테마 목록 검색 */
type SearchThemesState = {
  filters: ISearchThemesRequestParameter;
  results: IThemeList;
};

type SearchThemesAction = {
  setFilters: (filters: SearchThemesState['filters']) => void;
  setResults: (results: SearchThemesState['results']) => void;
};

export const useSearchThemesStore = create<
  SearchThemesState & SearchThemesAction
>()((set) => ({
  filters: {},
  results: {
    pageNumber: -1,
    pageSize: 10,
  },
  setFilters: (filters) => set(() => ({ filters: filters })),
  setResults: (results) => set(() => ({ results: results })),
}));
