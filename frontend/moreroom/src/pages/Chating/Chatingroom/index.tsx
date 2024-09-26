import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ChatingRoomFetch } from './ChatingroomFetch'; 

export const ChatingRoom = () => {
  return (
    <div>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <ChatingRoomFetch />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
