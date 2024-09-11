/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { useTestStore } from '../../stores/testStore';
import { containerCss, queryContainerCss, zustandCss } from './style';
import { ErrorBoundary } from 'react-error-boundary';
import { TestFetch } from './TestFetch';

export const Test = () => {
  const { testNum, testInc } = useTestStore();

  return (
    <>
      <div css={containerCss}>
        <div css={zustandCss}>
          <div>{testNum}</div>
          <button onClick={testInc}>값 증가</button>
        </div>

        <div css={queryContainerCss}>
          <ErrorBoundary fallback={<>에러</>}>
            <Suspense fallback={<>로딩중</>}>
              <TestFetch />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};
