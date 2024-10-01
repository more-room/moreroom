import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { PartyListFetch } from './PartyListFetch';


export const PartyList = () => {
  return (
    <div>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <PartyListFetch />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
