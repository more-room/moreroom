/** @jsxImportSource @emotion/react */
import React from 'react';
import { filterContainer } from './styles';
import { filterToKor, filterToMent } from '../../../../types/themeTypes';
import { Typography } from '../../../../components/Typography';

export interface FiltersProps {
  selected: string;
  handler: (filter: string) => void;
}

export const Filters = ({ selected, handler }: FiltersProps) => {
  return (
    <>
      <div css={filterContainer}>
        {Object.keys(filterToKor).map((eng: string) => (
          <Typography
            key={eng}
            size={0.875}
            color={selected === eng ? 'light' : 'grey'}
            weight={selected === eng ? 600 : 400}
            onClick={() => handler(eng)}
          >
            {filterToKor[eng]}
          </Typography>
        ))}
      </div>
      <Typography
        color="light"
        size={0.875}
        weight={600}
        style={{ textAlign: 'center', marginTop: '2rem' }}
      >
        {filterToMent[selected]}
      </Typography>
    </>
  );
};
