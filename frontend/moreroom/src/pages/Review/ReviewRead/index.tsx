/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ReviewReadFetch } from './ReviewReadFetch';

export const Review = () => {
  return (
    <ErrorBoundary fallback={<>에러</>}>
      <Suspense fallback={<>로딩중</>}>
        <ReviewReadFetch />
      </Suspense>
    </ErrorBoundary>
  );
};
