/** @jsxImportSource @emotion/react */
import React from 'react';
import { container, input, row } from './styles';
import { useHistoryWriteStore } from '../../../../stores/historyStore';
import { Typography } from '../../../../components/Typography';

export const Price = () => {
  const historyWriteStore = useHistoryWriteStore();

  return (
    <div css={[container, row(0.5)]}>
      <input
        css={input}
        type="number"
        defaultValue={historyWriteStore.price ? historyWriteStore.price : 0}
        min={0}
        max={1000000}
        onChange={(e) => historyWriteStore.setPrice(Number(e.target.value))}
      />
      <Typography color="light" weight={500} size={1}>
        원
      </Typography>
    </div>
  );
};
