/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '../../../components/common/Error';
import { QRLoading } from './QRLoading';
import { QRReceiveFetch } from './QRReceiveFetch';

export const QRReceive = () => {
  return (
    <ErrorBoundary fallbackRender={(props) => <Error {...props} />}>
      <Suspense fallback={<QRLoading />}>
        <QRReceiveFetch />
      </Suspense>
    </ErrorBoundary>
  );
};
