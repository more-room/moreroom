/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { SearchFilters } from './SearchFilters';
import { SearchResults } from './SearchResults';
import { ErrorBoundary } from 'react-error-boundary';

export const SearchList = () => {
  return (
    <>
      <SearchFilters />
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <SearchResults />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
