/** @jsxImportSource @emotion/react */
import React from 'react';
import { container } from './styles';
import { useHistoryWriteStore } from '../../../../stores/historyStore';
import { Button } from '../../../../components/Button';
import { Typography } from '../../../../components/Typography';

export const SuccessFlag = () => {
  const historyWriteStore = useHistoryWriteStore();
  const handler = (successFlag: boolean) =>
    historyWriteStore.setSuccessFlag(successFlag);

  return (
    <div css={container}>
      <Button
        color={historyWriteStore.successFlag ? 'secondary' : 'grey'}
        scale={historyWriteStore.successFlag ? 'A200' : '800'}
        rounded={0.5}
        handler={() => handler(true)}
        style={{ padding: '0.5rem 2rem' }}
      >
        <Typography
          color={historyWriteStore.successFlag ? 'light' : 'grey'}
          weight={historyWriteStore.successFlag ? 600 : 400}
          size={0.875}
        >
          성공
        </Typography>
      </Button>
      <Button
        color={
          historyWriteStore.successFlag ||
          historyWriteStore.successFlag === undefined
            ? 'grey'
            : 'danger'
        }
        scale={
          historyWriteStore.successFlag ||
          historyWriteStore.successFlag === undefined
            ? '800'
            : 'A200'
        }
        rounded={0.5}
        handler={() => handler(false)}
        style={{ padding: '0.5rem 2rem' }}
      >
        <Typography
          color={
            historyWriteStore.successFlag ||
            historyWriteStore.successFlag === undefined
              ? 'grey'
              : 'light'
          }
          weight={
            historyWriteStore.successFlag ||
            historyWriteStore.successFlag === undefined
              ? 400
              : 600
          }
          size={0.875}
        >
          실패
        </Typography>
      </Button>
    </div>
  );
};
