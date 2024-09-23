/** @jsxImportSource @emotion/react */
import React from 'react';
import { Item } from '../Item';
import { container, items } from './styles';
import { useSearchThemesStore } from '../../../../stores/themeStore';

export const Playtime = () => {
  const searchThemesStore = useSearchThemesStore();

  const handleFilter = (isAdd: boolean, playtime: number) => {
    if (isAdd) {
      const after = { ...searchThemesStore.filters, playtime: playtime };
      searchThemesStore.setFilters(after);
    } else {
      const after = { ...searchThemesStore.filters };
      delete after.playtime;
      searchThemesStore.setFilters(after);
    }
  };

  return (
    <div css={container}>
      <div css={items}>
        {[30, 40, 50, 60, 70, 80, 90, 100, 110, 120].map((time: number) => (
          <Item
            key={time}
            item={time + '분'}
            selected={searchThemesStore.filters.playtime === time}
            handler={() => {
              handleFilter(
                !(time === searchThemesStore.filters.playtime),
                time,
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};
