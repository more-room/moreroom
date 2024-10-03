/** @jsxImportSource @emotion/react */
import React from 'react';
import { TopBar } from '../../../components/TopBar';
import { container } from './styles';
import { getThemeTitles } from '../../../apis/themeApi';
import { SearchTitle } from './SearchTitle';
import {
  useSearchThemesStore,
  useSearchTitleStore,
  useThemePageStore,
} from '../../../stores/themeStore';
import { SearchList } from './SearchList';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export type TThemePage = 'default' | 'search';

export const ThemeList = () => {
  const nav = useNavigate();
  const themePageStore = useThemePageStore();
  const searchTitleStore = useSearchTitleStore();
  const searchThemesStore = useSearchThemesStore();

  /* 테마 제목 검색 핸들러 */
  const onSearchHandler = async (value: string) => {
    if (themePageStore.type === 'default') themePageStore.setType('search');

    searchTitleStore.setTitle(value);
    await getThemeTitles(value)
      .then((res) => searchTitleStore.setResults(res.data))
      .catch((err) => console.log(err));
  };

  /* 뒤로가기 핸들러 */
  const onBackHandler = () => {
    if (themePageStore.type === 'search') themePageStore.setType('default');
    else nav('/');
  };

  /* 아이콘 핸들러 */
  const onTitleHandler = () => {
    const after = {
      ...searchThemesStore.filters,
      title: searchTitleStore.title,
    };
    searchThemesStore.setFilters(after);
    themePageStore.setType('default');
  };

  return (
    <div css={container}>
      <TopBar>
        <TopBar.Title
          type="search"
          defaultValue={searchTitleStore.title}
          searchHandler={onSearchHandler}
          backHandler={onBackHandler}
        />
        <TopBar.Right icon={<MagnifyingGlassIcon />} handler={onTitleHandler} />
      </TopBar>
      {themePageStore.type === 'search' && <SearchTitle />}
      {themePageStore.type === 'default' && <SearchList />}
    </div>
  );
};
