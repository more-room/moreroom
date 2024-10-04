/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react';
import { getThemes } from '../../../../../apis/themeApi';
import {
  useSearchThemesStore,
  useSearchTitleStore,
} from '../../../../../stores/themeStore';
import { IThemeListItem } from '../../../../../types/themeTypes';
import { ThemeItem } from '../../../../../components/ThemeItem';
import { listContainer } from './styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHistoryWriteStore } from '../../../../../stores/historyStore';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

export const SearchResults = () => {
  const loc = useLocation();
  const nav = useNavigate();
  const searchThemeStore = useSearchThemesStore();
  const searchTitleStore = useSearchTitleStore();
  const historyWriteStore = useHistoryWriteStore();
  const queryClient = useQueryClient();
  const divRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['themes'],
    queryFn: async ({ pageParam }) => {
      const response = await getThemes(searchThemeStore.filters, pageParam);
      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.pageNumber === lastPage.totalPage
        ? undefined
        : lastPage.pageNumber + 1,
  });

  const handleScroll = () => {
    if (divRef.current) {
      const scrollTop = divRef.current.scrollTop;
      const scrollHeight = divRef.current.scrollHeight;
      const clientHeight = divRef.current.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 1) {
        fetchNextPage();
      }
    }
  };

  const handleClick = (theme: IThemeListItem) => {
    if (loc.pathname.split('/').includes('history')) {
      historyWriteStore.setThemeId(theme.themeId);
      nav('/history/write');
    } else {
      nav(`/themes/${theme.themeId}`);
    }
  };

  useEffect(() => {
    if (divRef.current) divRef.current.addEventListener('scroll', handleScroll);
    return () => {
      if (divRef.current)
        divRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ['themes'] });
    fetchNextPage();
  }, [searchThemeStore.filters]);

  return (
    <>
      <div ref={divRef} css={listContainer}>
        {data?.pages.map((page) => (
          <>
            {page.content?.themeList.map(
              (theme: IThemeListItem, idx: number) => (
                <ThemeItem
                  key={idx}
                  theme={theme}
                  pattern={searchTitleStore.title}
                  onClick={() => handleClick(theme)}
                />
              ),
            )}
          </>
        ))}
      </div>
    </>
  );
};
