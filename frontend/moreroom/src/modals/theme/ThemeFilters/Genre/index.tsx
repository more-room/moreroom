/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getGenres } from '../../../../apis/infoApi';
import { container, items } from './styles';
import { IGenreCommon } from '../../../../types/infoTypes';
import { Item } from '../Item';

export const Genre = () => {
  const genreQuery = useSuspenseQuery({
    queryKey: ['genre'],
    queryFn: async () => await getGenres(),
  });

  return (
    <div css={container}>
      <div css={items}>
        {genreQuery.data.data.genreList.map((genre: IGenreCommon) => (
          <Item item={genre.genreName}></Item>
        ))}
      </div>
    </div>
  );
};
