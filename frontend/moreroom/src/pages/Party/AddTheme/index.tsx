/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SearchTheme } from '../RegisterParty/SearchTheme';

export const AddTheme = () => {
  return (
    <div>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <SearchTheme />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
