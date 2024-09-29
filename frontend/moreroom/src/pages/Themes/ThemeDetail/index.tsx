/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeDetailFetch } from './ThemeDetailFetch';

export const ThemeDetail = () => {
  return (
    <ErrorBoundary fallback={<>에러</>}>
      <Suspense fallback={<>로딩중</>}>
        <ThemeDetailFetch />
      </Suspense>
    </ErrorBoundary>
  );
};
