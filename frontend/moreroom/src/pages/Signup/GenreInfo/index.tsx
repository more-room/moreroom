import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { GenreInfoFetch } from './GenrewInfoFetch';

export const GenreInfo = () => {
  return (
    <div>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <GenreInfoFetch />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
