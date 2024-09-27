/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { TopBar } from '../../../components/TopBar';
import { topbarcolor } from './styles';
import { getReviewForTheme } from '../../../apis/reviewApi'; // 리뷰 API 가져오기
import { getPartyList } from '../../../apis/chatApi';
import { getThemeDetail } from '../../../apis/themeApi';
import { Typography } from '../../../components/Typography';
import { Rating } from '../../../components/Rating';
import { ThemeItem } from '../../../components/ThemeItem';
import { IThemeDetailItem } from '../../../types/themeTypes';
import { IThemeItem } from '../../../types/themeTypes';

export const ReviewReadFetch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const themeId:number = location.state?.themeId; // 불러온 테마 아이디 

  // 리뷰 데이터를 가져오는 쿼리
  const reviewQuery = useSuspenseQuery({
    queryKey: ['theme-review', themeId],
    queryFn: async () => await getReviewForTheme({ themeId, pageNumber: 0 }),
  });
  
  // 테마 상세 정보를 가져오는 쿼리
  const themeQuery = useSuspenseQuery({
    queryKey: ['theme-detail', themeId],
    queryFn: async () => await getThemeDetail(themeId)
  })

  // 리뷰 에러 처리
  if (reviewQuery.error && !reviewQuery.isFetching) {
    throw reviewQuery.error;
  }
  // 테마 에러 처리
  if (themeQuery.error && !themeQuery.isFetching) {
    return <div>테마 데이터를 불러오는 중 에러가 발생했습니다.</div>;
  }

  const themeItem: IThemeItem = {
    themeId : location.state?.themeId,  //number
    poster: location.state?.poster,  // string
    title : location.state?.title, // number
    playtime : location.state?.playtime, // number
    genreList : location.state?.genreList, // string
    review : location.state?.review, // IThemeReview
    regionId : location.state?.regionId, // string
    cafe : {
      "cafeId": location.state?.cafeId, // number
      "brandName": location.state?.brandName, // string
      "branchName": location.state?.branchName, // string
      "cafeName": "제로월드 강남점",
      "address": location.state?.address, // string
},
  }
  console.log(reviewQuery.data.data.content)
  return (
    <div>
      <TopBar css={topbarcolor}>
        <TopBar.Title type="default" title="리뷰 조회" backHandler={() => navigate(-1)} />
      </TopBar>
      <div>
      <ThemeItem
        theme={themeItem}>
      </ThemeItem>
      </div>
      {/* 테마 리뷰 리스트 표시 */}
      <div style={{ marginTop: '2rem' }}>
        <Typography color="light" size={0.875} weight={700} style={{ marginLeft: '1rem' }}>
          테마에 대한 리뷰 -- 채팅 리스트처럼 카드로 만들기 
        </Typography>

        {reviewQuery.data.data.content.map((review) => (
          <div key={review.content} style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={review.member.memberProfile} alt="프로필" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
              <div style={{ marginLeft: '1rem' }}>
                <Typography color="light" size={0.875} weight={700}>
                  {review.member.memberName}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Rating activeColor="secondary" count={5} value={review.score} size={1} />
                  <Typography color="secondary" size={0.75} weight={400} style={{ marginLeft: '0.5rem' }}>
                    {review.score.toFixed(1)} 
                  </Typography>
                </div>
                <Typography><div>테마아이디 받아옴 : {themeId}</div></Typography>
                
              </div>
            </div>
            <Typography color="light" size={0.875} weight={400} style={{ marginTop: '0.5rem' }}>
              {review.content}
            </Typography>
            <Typography color="light" size={0.875} weight={400} style={{ marginTop: '0.5rem' }}>
              따봉{review.thumbsUp}
            </Typography>
            <Typography color="light" size={0.875} weight={400} style={{ marginTop: '0.5rem' }}>
              날짜{review.updatedAt}
            </Typography>
          </div>
        ))}
        
      </div>
    </div>
  );
};
