import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RoomdetailFetch } from  './RoomdetailFetch';

export const Roomdetail = () => {
  return (
    <div>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <RoomdetailFetch />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
