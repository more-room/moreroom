/** @jsxImportSource @emotion/react */
import React from 'react';
import { container, ment } from './styles';
import { DifficultyRange } from '../../../../components/DifficultyRange';
import { levelMent } from '../../../../types/themeTypes';
import { Typography } from '../../../../components/Typography';
import { useHistoryWriteStore } from '../../../../stores/historyStore';

export const MemberLevel = () => {
  const historyWriteStore = useHistoryWriteStore();

  return (
    <div css={container}>
      <DifficultyRange
        difficulty={
          historyWriteStore.memberLevel ? historyWriteStore.memberLevel : 1
        }
        handler={(difficulty: number) =>
          historyWriteStore.setMemberLevel(difficulty)
        }
        dir="col"
        size="lg"
      />
      <div css={ment}>
        {levelMent.map((ment: string, idx: number) => (
          <Typography key={idx} color="light" size={0.75} weight={400}>
            {ment}
          </Typography>
        ))}
      </div>
    </div>
  );
};
