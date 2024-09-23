/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { container, ment } from './styles';
import { DifficultyRange } from '../../../../components/DifficultyRange';
import { levelMent } from '../../../../types/themeTypes';
import { Typography } from '../../../../components/Typography';
import { useSearchThemesStore } from '../../../../stores/themeStore';

export const Level = () => {
  const searchThemesStore = useSearchThemesStore();
  const [difficulty, setDifficulty] = useState<number>(1);

  const handleFilter = (difficulty: number) => {
    const after = { ...searchThemesStore.filters, level: difficulty };
    searchThemesStore.setFilters(after);
  };

  return (
    <div css={container}>
      <DifficultyRange
        difficulty={difficulty}
        handler={(difficulty: number) => {
          setDifficulty(difficulty);
          handleFilter(difficulty);
        }}
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
