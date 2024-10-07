/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { useModal } from '../../../hooks/useModal';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '../../../components/Button';

import { Typography } from '../../../components/Typography';
import { btnCss, containerCss, fontCss } from '../Selectedtheme/styles';
import { Genre } from '../Genre';

export const SelectedGenre = () => {
  const modal = useModal();

  const clickHandler = () => {
    modal.hide(); // 장르 선택 완료 후 모달 닫기
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