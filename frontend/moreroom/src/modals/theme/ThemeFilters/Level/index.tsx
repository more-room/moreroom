/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { container, ment } from './styles';
import { DifficultyRange } from '../../../../components/DifficultyRange';
import { levelMent } from '../../../../types/themeTypes';
import { Typography } from '../../../../components/Typography';

export const Level = () => {
  const [difficulty, setDifficulty] = useState<number>(1);

  return (
    <div css={container}>
      <DifficultyRange
        difficulty={difficulty}
        handler={setDifficulty}
        dir="col"
        size="lg"
      />
      <div css={ment}>
        {levelMent.map((ment: string) => (
          <Typography color="light" size={0.75} weight={400}>
            {ment}
          </Typography>
        ))}
      </div>
    </div>
  );
};
