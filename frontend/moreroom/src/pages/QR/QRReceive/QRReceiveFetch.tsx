/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getThemeDetail } from '../../../apis/themeApi';
import { getCafeForTheme } from '../../../apis/cafeApi';
import { IThemeItem } from '../../../types/themeTypes';
import { getQRReview } from '../../../apis/reviewApi';

export const QRReceiveFetch = () => {
  const params = useParams();
  const nav = useNavigate();
  const [qrQuery, themeQuery, cafeQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['qr'],
        queryFn: async () => await getQRReview(Number(params.themeId)),
      },
      {
        queryKey: ['theme-qr'],
        queryFn: async () => await getThemeDetail(Number(params.themeId)),
      },
      {
        queryKey: ['cafe-qr'],
        queryFn: async () => await getCafeForTheme(Number(params.themeId)),
      },
    ],
  });

  [qrQuery, themeQuery, cafeQuery].some((query) => {
    if (query.error && !query.isFetching) {
      throw query.error;
    }
  });

  useEffect(() => {
    const themeItem: IThemeItem = {
      themeId: themeQuery.data.data.theme.themeId,
      poster: themeQuery.data.data.theme.poster,
      title: themeQuery.data.data.theme.title,
      playtime: themeQuery.data.data.theme.playtime,
      genreList: [...themeQuery.data.data.theme.genreList],
      review: { ...themeQuery.data.data.theme.review },
      regionId: cafeQuery.data.data.regionId,
      cafe: {
        cafeId: cafeQuery.data.data.cafeId,
        brandName: cafeQuery.data.data.brandName,
        branchName: cafeQuery.data.data.branchName,
        cafeName: '',
        address: cafeQuery.data.data.address,
      },
    };

    nav('/review/write', {
      state: { themeItem },
    });
  }, []);

  return <></>;
};
