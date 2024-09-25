/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { SearchFilters } from '../../Themes/ThemeList/SearchList/SearchFilters';
import { ErrorBoundary } from 'react-error-boundary';
import { SearchResults } from '../../Themes/ThemeList/SearchList/SearchResults';

export const AddTheme = () => {
  return (
    <div>
      <SearchFilters />
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <SearchResults />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
