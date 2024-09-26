/** @jsxImportSource @emotion/react */
import React from 'react';
import { btn, container } from './styles';
import { TopBar } from '../../../components/TopBar';
import { useLocation } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCafeDetail } from '../../../apis/cafeApi';
import { CafeMap } from './CafeMap';
import { CafeInfo } from './CafeInfo';
import { CafeThemes } from './CafeThemes';
import { Button } from '../../../components/Button';
import { Typography } from '../../../components/Typography';

export const CafeDetailFetch = () => {
  const loc = useLocation();

  const cafeQuery = useSuspenseQuery({
    queryKey: ['cafe-detail'],
    queryFn: async () =>
      await getCafeDetail(
        process.env.NODE_ENV === 'development' ? 1 : loc.state.cafeId,
      ),
  });

  if (cafeQuery.error && !cafeQuery.isFetching) {
    throw cafeQuery.error;
  }

  return (
    <div css={container}>
      <TopBar>
        <TopBar.Title type="default" title={cafeQuery.data.data.cafeName} />
        <TopBar.Right handler={() => console.log('it"s notification')} />
      </TopBar>
      <CafeMap cafe={cafeQuery.data.data} />
      <CafeInfo cafe={cafeQuery.data.data} />
      <CafeThemes themes={cafeQuery.data.data.themeList} />
      <div css={btn}>
        <Button
          fullwidth
          rounded={0.5}
          handler={() => window.open(cafeQuery.data.data.link)}
          style={{ padding: '0.75rem 0' }}
        >
          <Typography color="light" weight={600}>
            카페 방문하기
          </Typography>
        </Button>
      </div>
    </div>
  );
};
