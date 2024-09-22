/** @jsxImportSource @emotion/react */
import React from 'react';
import { getThemes } from '../../../../../apis/themeApi';
import {
  useSearchThemesStore,
  useSearchTitleStore,
} from '../../../../../stores/themeStore';
import { useSuspenseQuery } from '@tanstack/react-query';
import { IThemeListItem } from '../../../../../types/themeTypes';
import { ThemeItem } from '../../../../../components/ThemeItem';
import { listContainer } from './styles';

export const SearchResults = () => {
  const searchThemeStore = useSearchThemesStore();
  const searchTitleStore = useSearchTitleStore();
  const themeQuery = useSuspenseQuery({
    queryKey: ['themes'],
    queryFn: async () => await getThemes(searchThemeStore.filters),
  });

  if (themeQuery.error && !themeQuery.isFetching) {
    throw themeQuery.error;
  }

  return (
    <div css={listContainer}>
      {themeQuery.data.data.content?.themeList.map((theme: IThemeListItem) => (
        <ThemeItem
          key={theme.themeId}
          theme={theme}
          pattern={searchTitleStore.title}
        />
      ))}
    </div>
  );
};
