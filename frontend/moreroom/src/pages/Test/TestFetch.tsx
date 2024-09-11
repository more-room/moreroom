/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { testRequest } from '../../apis/testApi';
import { queryCss } from './style';
import { ITestRequest } from '../../types/TestTypes';

export const TestFetch = () => {
  const testQuery = useSuspenseQuery({
    queryKey: ['test'],
    queryFn: async () => await testRequest(),
  });

  return (
    <div>
      {testQuery.data?.data.map((t: ITestRequest) => {
        return (
          <>
            <div key={t.id} css={queryCss}>
              <div>{t.id}</div>
              <div>{t.name}</div>
            </div>
          </>
        );
      })}
    </div>
  );
};
