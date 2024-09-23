/** @jsxImportSource @emotion/react */
import React from 'react';
import { TopBar } from '../../../components/TopBar';
import { container } from './styles';
import { getThemeTitles } from '../../../apis/themeApi';
import { SearchTitle } from './SearchTitle';
import {
  useSearchTitleStore,
  useThemePageStore,
} from '../../../stores/themeStore';

export type TThemePage = 'default' | 'search';

export const ThemeList = () => {
  const themePageStore = useThemePageStore();
  const searchTitleStore = useSearchTitleStore();

  /* 테마 제목 검색 핸들러 */
  const onSearchHandler = async (value: string) => {
    if (themePageStore.type === 'default') themePageStore.setType('search');

    searchTitleStore.setTitle(value);
    await getThemeTitles(value)
      .then((res) => searchTitleStore.setResults(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div css={container}>
      <TopBar>
        <TopBar.Title type="search" searchHandler={onSearchHandler} />
      </TopBar>
      {themePageStore.type === 'search' && <SearchTitle />}
    </div>
  );
};
