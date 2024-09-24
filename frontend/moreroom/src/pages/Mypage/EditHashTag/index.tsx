import React, { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { EditHashTagFetch } from './EditHashtagFetch';

export const EditHashTag = () => {
  return (
    <div>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <EditHashTagFetch />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
