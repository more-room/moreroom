/** @jsxImportSource @emotion/react */
import React from 'react';
import { filterContainer } from './styles';
import { filterToKor } from '../../../../../types/themeTypes';
import { FilterChip } from '../../../../../components/FilterChip';
import { useModal } from '../../../../../hooks/useModal';
import { ThemeFilters } from '../../../../../modals/theme/ThemeFilters';

export const SearchFilters = () => {
  const modal = useModal();

  return (
    <div css={filterContainer}>
      {Object.keys(filterToKor).map((eng: string) => (
        <FilterChip
          key={eng}
          size={0.875}
          rounded={true}
          selected={false}
          onHandleClick={() => modal.show(<ThemeFilters type={eng} />)}
        >
          {filterToKor[eng]}
        </FilterChip>
      ))}
    </div>
  );
};
