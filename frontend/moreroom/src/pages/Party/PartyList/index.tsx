/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { PartyListFetch } from './PartyListFetch';
import Error from '../../../components/common/Error';
import Loading from '../../../components/common/Loading';
import { containerCss } from './styles';

export const PartyList = () => {
  return (
    <div css={containerCss}>
      <ErrorBoundary fallbackRender={Error}>
        <Suspense fallback={<Loading height="50vh" />}>
          <PartyListFetch />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
