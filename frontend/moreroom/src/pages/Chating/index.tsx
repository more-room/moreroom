/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ChatingFetch } from './ChatingFetch';
import Loading from '../../components/common/Loading';
import NoResult from '../../components/common/NoResult';
import Error from '../../components/common/Error';

export const Chating = () => {
  return (
    <div style={{display:'flex',flexDirection:'column' ,height:'100vh', overflowY:'scroll'}}>
      <ErrorBoundary fallbackRender={Error}>
        <Suspense fallback={<Loading />}>
          <ChatingFetch />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
