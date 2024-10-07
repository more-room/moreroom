/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeDetailFetch } from './ThemeDetailFetch';
import Loading from '../../../components/common/Loading';
import Error from '../../../components/common/Error';

export const ThemeDetail = () => {
  return (
    <ErrorBoundary fallbackRender={Error}>
      <Suspense fallback={<Loading/>}>
        <ThemeDetailFetch />
      </Suspense>
    </ErrorBoundary>
  );
};
