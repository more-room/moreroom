/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { CafeDetailFetch } from './CafeDetailFetch';
import Loading from '../../../components/common/Loading';
import Error from '../../../components/common/Error';

export const CafeDetail = () => {
  return (
    <>
      <ErrorBoundary fallbackRender={Error}>
        <Suspense fallback={<Loading/>}>
          <CafeDetailFetch />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
