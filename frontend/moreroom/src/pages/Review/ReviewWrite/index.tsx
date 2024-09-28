/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TopBar } from '../../../components/TopBar';
import { topbarcolor, bottombarcss } from './styles';
import { BottomBar } from '../../../components/BottomBar';
import { BellIcon } from '@heroicons/react/24/solid';
import { ThemeItem } from '../../../components/ThemeItem';
import { Typography } from '../../../components/Typography';
import { IThemeItem } from '../../../types/themeTypes';

export const ReviewWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // location에서 themeId를 포함한 테마 정보를 가져옵니다.
  const themeItem: IThemeItem = {
    themeId: location.state?.themeId,  // number
    poster: location.state?.poster,    // string
    title: location.state?.title,      // string
    playtime: location.state?.playtime, // number
    genreList: location.state?.genreList, // string[]
    review: location.state?.review,    // IThemeReview
    regionId: location.state?.regionId, // string
    cafe: {
      "cafeId": location.state?.cafeId,  // number
      "brandName": location.state?.brandName, // string
      "branchName": location.state?.branchName, // string
      "cafeName": "제로월드 강남점",
      "address": location.state?.address, // string
    },
  };
  console.log('Received themeItem:', themeItem);
  return (
    <div>
      <TopBar css={topbarcolor}>
        <TopBar.Title type="default" title="리뷰 작성" backHandler={() => navigate(-1)} />
      </TopBar>
      
      {/* ThemeItem을 통해 테마 정보를 보여줍니다 */}
      <div>
        <ThemeItem theme={themeItem} />
      </div>

      <div style={{ margin: '2rem' }}>
        <Typography color="light" size={1} weight={700}>
          리뷰 작성 페이지
        </Typography>
        {/* 여기에서 리뷰 작성 폼을 추가할 수 있습니다 */}
      </div>

      <BottomBar
        css={bottombarcss}
        icons={[<BellIcon />, <BellIcon />, <BellIcon />]}
        menus={['메뉴1', '메뉴2', '메뉴3']}
        onHandleChange={() => console.log('바텀바 선택됨')}
      />
    </div>
  );
};
