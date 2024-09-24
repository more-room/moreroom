/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSuspenseQueries } from '@tanstack/react-query';
import { getRecommendThemes } from '../../apis/recommendApi';
import { ThemeList } from './ThemeList';
import { recommendlist } from './styles';

export const MainThemeFetch = () => {
  const [preferQuery, similarQuery, baseQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['prefer'],
        queryFn: async () => await getRecommendThemes('similar-user-themes'),
      },
      {
        queryKey: ['similar'],
        queryFn: async () => await getRecommendThemes('similar-themes'),
      },
      {
        queryKey: ['base'],
        queryFn: async () => await getRecommendThemes('demographics-themes'),
      },
    ],
  });

  [preferQuery, similarQuery, baseQuery].some((query) => {
    if (query.error && !query.isFetching) {
      throw query.error;
    }
  });

  return (
    <div css={recommendlist}>
      <ThemeList
        title='"사용자"님이 좋아할 만한 테마'
        themes={similarQuery.data.data}
      />
      <ThemeList
        title='"사용자"님과 유사한 사용자가 즐긴 테마'
        themes={preferQuery.data.data}
      />
      <ThemeList
        title="20대 남성이 많이 한 테마"
        themes={preferQuery.data.data}
      />
    </div>
  );
};
