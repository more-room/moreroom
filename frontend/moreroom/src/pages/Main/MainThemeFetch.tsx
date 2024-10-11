/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useQuery, useSuspenseQueries } from '@tanstack/react-query';
import {
  getGenRecThemes,
  getPosRecThemes,
  getRecommendThemes,
} from '../../apis/recommendApi';
import { ThemeList } from './ThemeList';
import { recommendlist } from './styles';
import { getMyInfo } from '../../apis/mypageApi';
import dayjs from 'dayjs';

export const MainThemeFetch = () => {
  const [preferQuery, similarQuery, baseQuery, popularQuery, userQuery] =
    useSuspenseQueries({
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
        {
          queryKey: ['popular'],
          queryFn: async () => await getGenRecThemes(),
        },
        {
          queryKey: ['user'],
          queryFn: async () => await getMyInfo(),
        },
      ],
    });

  [preferQuery, similarQuery, baseQuery, popularQuery, userQuery].some(
    (query) => {
      if (query.error && !query.isFetching) {
        throw query.error;
      }
    },
  );

  const [loc, setLoc] = useState<{ lat: number; lon: number }>({
    lat: 0,
    lon: 0,
  });

  const posQuery = useQuery({
    queryKey: ['pos'],
    queryFn: async () => await getPosRecThemes(loc.lat, loc.lon),
    enabled: false,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      setLoc(() => ({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      }));
    });
  }, []);

  useEffect(() => {
    if (!(loc.lat === 0 || loc.lon === 0)) {
      posQuery.refetch();
    }
  }, [loc]);

  return (
    <div css={recommendlist}>
      {similarQuery.data.data.themeList.length > 0 && (
        <ThemeList
          title={`${userQuery.data.data.nickname}님이 좋아할 만한 테마`}
          themes={similarQuery.data.data.themeList}
        />
      )}
      {preferQuery.data.data.themeList.length > 0 && (
        <ThemeList
          title={`${userQuery.data.data.nickname}님과 유사한 사용자가 즐긴 테마`}
          themes={preferQuery.data.data.themeList}
        />
      )}
      {baseQuery.data.data.themeList.length > 0 && (
        <ThemeList
          title={`${Math.floor((dayjs().year() - dayjs(userQuery.data.data.birth).year() + 1) / 10) * 10}대 ${userQuery.data.data.gender === 'M' ? '남성' : '여성'}이 많이 한 테마`}
          themes={baseQuery.data.data.themeList}
        />
      )}
      {posQuery.data && posQuery.data!.data.themeList.length > 0 && (
        <ThemeList
          title={`${posQuery.data?.data.region.regionParentName} ${posQuery.data?.data.region.regionName} 주변 인기 많은 테마`}
          themes={posQuery.data!.data.themeList}
        />
      )}
      {popularQuery.data.data.mostGenreList.length > 0 && (
        <ThemeList
          title={`선호 장르 중 플레이 한 장르의 인기 테마`}
          themes={popularQuery.data.data.mostGenreList}
        />
      )}
      {popularQuery.data.data.leastGenreList.length > 0 && (
        <ThemeList
          title={`선호 장르 중 플레이 하지 않은 장르의 인기 테마`}
          themes={popularQuery.data.data.leastGenreList}
        />
      )}
    </div>
  );
};
