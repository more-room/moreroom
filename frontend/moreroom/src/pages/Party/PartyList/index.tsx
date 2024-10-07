import React, { Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { PartyListFetch } from './PartyListFetch';
import Error from '../../../components/common/Error';
import Loading from '../../../components/common/Loading';


export const PartyList = () => {
  return (
    <div>
       <ErrorBoundary fallbackRender={Error}>
       <Suspense fallback={<Loading height='50vh' />}>
          <PartyListFetch />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
