import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { GenreInfoFetch } from './GenrewInfoFetch';

interface VerificationProps {
  onSubmit: () => void;
}

export const GenreInfo = ({ onSubmit }: VerificationProps) => {
  return (
    <div>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <GenreInfoFetch onSubmit={onSubmit} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
