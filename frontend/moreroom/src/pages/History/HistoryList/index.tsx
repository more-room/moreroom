/** @jsxImportSource @emotion/react */
import React, { Suspense, useEffect } from 'react';
import { container } from './styles';
import { TopBar } from '../../../components/TopBar';
import { ErrorBoundary } from 'react-error-boundary';
import { HistoryListFetch } from './HistoryListFetch';
import { useHistoryWriteStore } from '../../../stores/historyStore';
import { useNavigate } from 'react-router-dom';

export const HistoryList = () => {
  const nav = useNavigate();

  useEffect(() => {
    useHistoryWriteStore.persist.clearStorage();
  }, []);

  return (
    <div css={container}>
      <TopBar>
        <TopBar.Title
          type="withoutRight"
          title="테마 기록"
          backHandler={() => nav('/')}
        />
      </TopBar>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <HistoryListFetch />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
