/** @jsxImportSource @emotion/react */
import React from 'react';
import { titleContainer } from './styles';
import {
  useSearchTitleStore,
  useThemePageStore,
} from '../../../../stores/themeStore';
import { LabeledTypography } from '../../../../components/LabeledTypography';

export const SearchTitle = () => {
  const themePageStore = useThemePageStore();
  const searchTitleStore = useSearchTitleStore();

  /* 특정 테마 선택 핸들러 */
  const onHandleTitleSelect = (title: string) => {
    searchTitleStore.setTitle(title);
    themePageStore.setType('default');
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
