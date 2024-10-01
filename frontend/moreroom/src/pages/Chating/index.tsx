/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ChatingFetch } from './ChatingFetch';

export const Chating = () => {
  return (
    <ErrorBoundary fallback={<>에러</>}>
      <Suspense fallback={<>로딩중</>}>
        <ChatingFetch />
      </Suspense>
    </ErrorBoundary>
  );
};
