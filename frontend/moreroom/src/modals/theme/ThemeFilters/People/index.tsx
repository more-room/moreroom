/** @jsxImportSource @emotion/react */
import React from 'react';
import { Item } from '../Item';
import { container, items } from './styles';
import { useSearchThemesStore } from '../../../../stores/themeStore';

export const People = () => {
  const searchThemesStore = useSearchThemesStore();

  const handleFilter = (isAdd: boolean, people: number) => {
    if (isAdd) {
      const after = { ...searchThemesStore.filters, people: people };
      searchThemesStore.setFilters(after);
    } else {
      const after = { ...searchThemesStore.filters };
      delete after.people;
      searchThemesStore.setFilters(after);
    }
  };

  return (
    <div css={container}>
      <div css={items}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((count: number) => (
          <Item
            key={count}
            item={count + '명 이하'}
            selected={searchThemesStore.filters.people === count}
            handler={() => {
              handleFilter(
                !(count === searchThemesStore.filters.people),
                count,
              );
            }}
          ></Item>
        ))}
      </div>
    </div>
  );
};
