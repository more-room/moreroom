/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SearchFilters } from '../../../../Themes/ThemeList/SearchList/SearchFilters';
import { SearchResults } from './SearchResults';

interface ISelected {
  currentPartyRequestId?: number
}
export const SearchList = ({currentPartyRequestId}: ISelected) => {
  return (
    <>
      <SearchFilters />
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
        <SearchResults currentPartyRequestId={currentPartyRequestId}/>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
