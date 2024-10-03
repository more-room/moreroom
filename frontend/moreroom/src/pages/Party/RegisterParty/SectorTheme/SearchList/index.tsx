/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SearchFilters } from '../../../../Themes/ThemeList/SearchList/SearchFilters';
import { SearchResults } from './SearchResults';


export const SearchList = () => {
  return (
    <>
      <SearchFilters />
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
        <SearchResults/>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
