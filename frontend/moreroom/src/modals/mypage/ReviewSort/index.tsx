/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { useModal } from '../../../hooks/useModal';
import { ErrorBoundary } from 'react-error-boundary';
import { Genre } from '../../theme/ThemeFilters/Genre';
import { Button } from '../../../components/Button';
import { useSearchThemesStore } from '../../../stores/themeStore';
import { Typography } from '../../../components/Typography';
import { btnCss, containerCss, fontCss } from '../Selectedtheme/styles';
import { ReviewSortFetch } from './ReviewSortFetch';

export const ReviewSort = () => {
  const modal = useModal();
  const searchThemesStore = useSearchThemesStore();

  const clickHandler = () => {
    console.log(searchThemesStore.filters);
    modal.hide();
  };
  return (
    <div css={containerCss}>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <ReviewSortFetch />
        </Suspense>
      </ErrorBoundary>
      {/* <Button css={btnCss} fullwidth rounded={0.5} handler={clickHandler}>
        확인
      </Button> */}
    </div>
  );
};
