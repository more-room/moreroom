/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography } from '../../../../components/Typography';
import { container, memobox } from './styles';

export const HistoryMemo = ({ memo }: { memo: string }) => {
  return (
    <div css={container}>
      <Typography color="light" weight={600} size={0.875}>
        기록 메모
      </Typography>
      <div css={memobox}>
        <Typography color="light" weight={400} size={0.875}>
          {memo}
        </Typography>
      </div>
    </div>
  );
};
