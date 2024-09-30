/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HistoryDetailFetch } from './HistoryDetailFetch';

export const HistoryDetail = () => {
  return (
    <ErrorBoundary fallback={<>에러</>}>
      <Suspense fallback={<>로딩중</>}>
        <HistoryDetailFetch />
      </Suspense>
    </ErrorBoundary>
  );
};
