/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography } from '../../../../components/Typography';
import { container, memo, memobox } from './styles';
import { useHistoryWriteStore } from '../../../../stores/historyStore';

export const HistoryMemo = () => {
  const historyWriteStore = useHistoryWriteStore();

  return (
    <div css={container}>
      <Typography color="light" weight={600} size={0.875}>
        기록 메모
      </Typography>
      <div css={memobox}>
        <textarea
          css={memo}
          rows={5}
          placeholder="메모를 작성해주세요"
          onChange={(e) => historyWriteStore.setContent(e.target.value)}
          defaultValue={
            historyWriteStore.content ? historyWriteStore.content : ''
          }
        />
      </div>
    </div>
  );
};
