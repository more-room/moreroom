/** @jsxImportSource @emotion/react */
import React from 'react';
import { titleContainer } from '../../../../Themes/ThemeList/SearchTitle/styles';
import { LabeledTypography } from '../../../../../components/LabeledTypography';
import { useSearchThemesStore, useSearchTitleStore, useThemePageStore } from '../../../../../stores/themeStore';

export const SearchTitle = () => {
  const themePageStore = useThemePageStore();
  const searchTitleStore = useSearchTitleStore();
  const searchThemesStore = useSearchThemesStore();

  /* 특정 테마 선택 핸들러 */
  const onHandleTitleSelect = (title: string) => {
    searchTitleStore.setTitle(title);
    themePageStore.setType('default');

    const after = { ...searchThemesStore.filters, title: title };
    searchThemesStore.setFilters(after);
  };

  return (
    <div css={titleContainer}>
      {searchTitleStore.results.themeList.map((result) => {
        return (
          <LabeledTypography
            key={result.themeId}
            str={result.title}
            pattern={searchTitleStore.title}
            normalColor="light"
            highlightColor="primary"
            onClick={() => onHandleTitleSelect(result.title)}
          />
        );
      })}
    </div>
  );
};
