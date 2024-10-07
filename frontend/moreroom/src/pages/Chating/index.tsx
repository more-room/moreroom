/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ChatingFetch } from './ChatingFetch';
import Error from '../../components/common/Error';
import Loading from '../../components/common/Loading';
import NoResult from '../../components/common/NoResult';

export const Chating = () => {
  return (
    <ErrorBoundary
      fallback={
        <NoResult
          msg="현재 존재하는 채팅방이 없습니다."
          url="/party"
          btnmsg="파티 등록하러 가기"
        />
      }
    >
      <Suspense fallback={<Loading />}>
        <ChatingFetch />
      </Suspense>
    </ErrorBoundary>
  );
};
