/** @jsxImportSource @emotion/react */
import React from 'react';
import { container, input, row } from './styles';
import { useHistoryWriteStore } from '../../../../stores/historyStore';
import { Typography } from '../../../../components/Typography';

export const HintCount = () => {
  const historyWriteStore = useHistoryWriteStore();

  return (
    <div css={[container, row(0.5)]}>
      <input
        css={input}
        type="number"
        defaultValue={
          historyWriteStore.hintCount ? historyWriteStore.hintCount : 0
        }
        min={0}
        max={100}
        onChange={(e) => historyWriteStore.setHintCount(Number(e.target.value))}
      />
      <Typography color="light" weight={500} size={1}>
        개
      </Typography>
    </div>
  );
};
