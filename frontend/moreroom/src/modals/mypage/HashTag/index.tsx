import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HashtagFetch } from './HashTagFetch';

export const HashTag= () => {
  return (
    <div>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <HashtagFetch />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
