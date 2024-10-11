import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { GenreInfoFetch } from './GenrewInfoFetch';

interface VerificationProps {
  before: () => void;
  onSubmit: () => void;
}

export const GenreInfo = ({ before, onSubmit }: VerificationProps) => {
  return (
    <div>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <GenreInfoFetch before={before} onSubmit={onSubmit} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
