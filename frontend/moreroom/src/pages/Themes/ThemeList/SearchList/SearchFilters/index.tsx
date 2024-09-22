/** @jsxImportSource @emotion/react */
import React from 'react';
import { filterContainer } from './styles';
import { filterToKor } from '../../../../../types/themeTypes';
import { FilterChip } from '../../../../../components/FilterChip';

export const SearchFilters = () => {
  return (
    <div css={filterContainer}>
      {Object.keys(filterToKor).map((eng: string) => (
        <FilterChip
          key={eng}
          size={0.875}
          rounded={true}
          selected={false}
          onHandleClick={() => console.log('hello')}
        >
          {filterToKor[eng]}
        </FilterChip>
      ))}
    </div>
  );
};
