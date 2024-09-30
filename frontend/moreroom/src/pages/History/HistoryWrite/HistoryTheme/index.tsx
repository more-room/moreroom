/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useHistoryWriteStore } from '../../../../stores/historyStore';
import { btn, container } from './styles';
import { Typography } from '../../../../components/Typography';
import { Button } from '../../../../components/Button';
import { ErrorBoundary } from 'react-error-boundary';
import { HistoryThemeFetch } from './HistoryThemeFetch';

export const HistoryTheme = () => {
  const nav = useNavigate();
  const params = useParams();
  const historyWriteStore = useHistoryWriteStore();

  return (
    <>
      {params.historyId || historyWriteStore.themeId ? (
        <ErrorBoundary fallback={<>에러</>}>
          <Suspense fallback={<>로딩중</>}>
            <HistoryThemeFetch />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <div
          css={container(
            Boolean(params.historyId || historyWriteStore.themeId),
          )}
        >
          <div css={btn}>
            <Typography color="light" weight={400}>
              기록을 남길 테마를 선택해주세요
            </Typography>
            <Button rounded={0.5} handler={() => nav('/themes/history')}>
              <Typography color="light" size={0.875}>
                테마 선택하기
              </Typography>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
