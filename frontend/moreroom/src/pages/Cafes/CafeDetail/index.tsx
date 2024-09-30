/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { CafeDetailFetch } from './CafeDetailFetch';

export const CafeDetail = () => {
  return (
    <>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <CafeDetailFetch />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
