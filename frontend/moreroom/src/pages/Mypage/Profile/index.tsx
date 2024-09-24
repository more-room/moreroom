import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ProfileFetch } from './ProfileFetch';

export const Profile = () => {
  return (
    <div>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <ProfileFetch />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
