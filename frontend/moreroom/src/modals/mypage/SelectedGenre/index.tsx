/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { useModal } from '../../../hooks/useModal';
import { ErrorBoundary } from 'react-error-boundary';
import { Genre } from '../../theme/ThemeFilters/Genre';
import { Button } from '../../../components/Button';
import { useSearchThemesStore } from '../../../stores/themeStore';
import { Region } from '../../theme/ThemeFilters/Region';
import { Typography } from '../../../components/Typography';
import { btnCss, containerCss, fontCss } from '../Selectedtheme/styles';

export const SelectedGenre = () => {
  const modal = useModal();
  const searchThemesStore = useSearchThemesStore();

  const clickHandler = () => {
    console.log(searchThemesStore.filters);
    modal.hide();
  };
  return (
    <div css={containerCss}>
      <Typography css={fontCss} color="light" size={1} weight={500}>
        선호하는 방탈출 장르를 선택해주세요!
      </Typography>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <Genre />
        </Suspense>
      </ErrorBoundary>
      <Button css={btnCss} fullwidth rounded={0.5} handler={clickHandler}>
        적용하기
      </Button>
    </div>
  );
};
