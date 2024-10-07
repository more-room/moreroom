/** @jsxImportSource @emotion/react */
import React, { Suspense, useEffect } from 'react';
import { container } from './styles';
import { ErrorBoundary } from 'react-error-boundary';
import { HistoryListFetch } from './HistoryListFetch';
import { useHistoryWriteStore } from '../../../stores/historyStore';

export const HistoryList = () => {
  useEffect(() => {
    useHistoryWriteStore.persist.clearStorage();
  }, []);

  return (
    <div css={container}>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <HistoryListFetch />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
