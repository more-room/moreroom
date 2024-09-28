/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { HandThumbUpIcon, BellIcon } from '@heroicons/react/24/solid';
import { TopBar } from '../../../components/TopBar';
import { cardcontainer, themeCard, topbarcolor, bottombarcss, allViewButton, reviewWrite } from './styles';
import { getReviewForTheme } from '../../../apis/reviewApi'; // 리뷰 API 가져오기
import { getPartyList } from '../../../apis/chatApi';
import { getThemeDetail } from '../../../apis/themeApi';
import { Typography } from '../../../components/Typography';
import { Rating } from '../../../components/Rating';
import { ThemeItem } from '../../../components/ThemeItem';
import { IThemeDetailItem } from '../../../types/themeTypes';
import { IThemeItem } from '../../../types/themeTypes';
import { BottomBar } from '../../../components/BottomBar';
import { Button } from '../../../components/Button';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Colors } from '../../../styles/globalStyle';

// ChartJS를 초기화합니다.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
  });

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
      "cafeName": "",
      "address": location.state?.address, // string
    },
  };

  // 리뷰 평균 별점 계산
  const reviews = reviewQuery.data.data.content;
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.score, 0) / reviews.length).toFixed(1)
    : "0.0";

  // 별점 분포 데이터 계산 (0.5 ~ 5.0 점 단위)
  const ratingDistribution = new Array(10).fill(0); // 0.5점 단위로 10개의 구간 (0.5, 1.0, 1.5, ..., 5.0)

  reviews.forEach((review) => {
    const index = Math.floor((review.score * 2) - 1);
    if (index >= 0 && index < ratingDistribution.length) {
      ratingDistribution[index] += 1;
    }
  });

  // 차트 데이터 설정
  const chartData = {
    labels: ['0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0'],
    datasets: [
      {
        label: '별점 분포',
        data: ratingDistribution,
        backgroundColor: '#80deea', // 색상 조정 가능
        borderColor: '#80deea',
        borderWidth: 1,
      },
    ],
  };

  const allView = () => {
    console.log('리뷰 작성하기');
  };

  // 리뷰 작성 페이지로 이동 (테마 정보 함께 전달)
  const reviewWriteMove = () => {
    console.log('페이지에서 넘길 때:', themeItem);
    navigate('/review/write', {
      state: {themeItem
       }// ThemeItem을 state로 전달하여 리뷰 작성 페이지로 이동
    });
  };

  
  return (
    <div>
      <TopBar css={topbarcolor}>
        <TopBar.Title type="default" title="리뷰 조회" backHandler={() => navigate(-1)} />
      </TopBar>
      <div>
        <ThemeItem theme={themeItem} />
      </div>

      {/* 평균 별점 및 별점 분포 표시 */}
      <div style={{ textAlign: 'left', margin: '1rem', display: 'flex', alignItems: 'flex-start' }}>
        <div style={{ marginRight: '2rem' }}>
          <Typography color="light" size={1} weight={700}>
            평균 별점
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop:'0.5rem' }}>
            <Rating activeColor="secondary" count={1} value={parseFloat(averageRating)} size={1.5} transparentBackground={true} />
            <Typography color="secondary" size={1} weight={700} style={{ marginLeft: '0.5rem' }}>
              {averageRating}
            </Typography>
          </div>
        </div>
        <div style={{ width: '60%', height: 'auto', marginLeft: '2rem', marginTop: '1rem'}}> {/* 그래프 크기 조정 */}
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false, // 그리드 선이 차트 내부에 표시되지 않도록 설정
                    drawTicks: true, // 눈금을 그리도록 설정
                    tickLength: 5, // 눈금의 길이를 설정
                    color: 'rgba(255, 255, 255, 1)', // 눈금의 색상 설정
                  },
                  border: {
                    color: 'rgba(255, 255, 255, 1)', // 기본 축선의 색상을 흰색으로 설정
                  },
                  ticks: {
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0,
                    padding: 10, // 축 레이블과 축선 간의 거리 조정
                    color: 'rgba(255, 255, 255, 1)', // 레이블의 색상을 흰색으로 설정
                    callback: function (value, index) {
                      if (['0.5', '3.0', '5.0'].includes(chartData.labels[index])) {
                        return chartData.labels[index];
                      } else {
                        return '';
                      }
                    },
                  },
                },
                y: {
                  grid: {
                    drawOnChartArea: false, // y축 그리드를 숨깁니다.
                  },
                  border: {
                    display: false, // y축 경계선을 숨깁니다.
                  },
                  ticks: {
                    display: false, // y축 레이블을 표시하지 않도록 설정합니다.
                  },
                },
              },
            }}
          />
        </div>
      </div>
      <div>
      
      </div>
      {/* 테마 리뷰 리스트 표시 */}
      <div style={{ marginTop: '2rem' }}>
        <div css={cardcontainer}>
          
          {reviews.map((review) => (
            <div key={review.content} css={themeCard} style={{ padding: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <Rating activeColor="secondary" count={5} value={review.score} size={1} transparentBackground={false} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography color="light" size={0.875} weight={700} style={{ marginRight: '0.5rem' }}>
                    {review.member.memberName}
                  </Typography>
                  <img src={review.member.memberProfile} alt="프로필" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                </div>
              </div>
              <Typography color="light" size={0.875} weight={400}>
                {review.content}
              </Typography>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <HandThumbUpIcon style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
                  <Typography color="light" size={0.875} weight={400}>
                    {review.thumbsUp}
                  </Typography>
                </div>
                <Typography color="light" size={0.75} weight={400}>
                  {review.updatedAt}
                </Typography>
              </div>
            </div>
          ))}
          
          <Button 
            css={allViewButton}
            variant="contained"
            fullwidth={true}
            rounded={0.4}
            handler={reviewWriteMove}
          >
            리뷰 작성
          </Button>
        </div>
      </div>
      <BottomBar css={bottombarcss} 
        icons={[<BellIcon />, <BellIcon />, <BellIcon />]}
        menus={['메뉴1', '메뉴2', '메뉴3']}
        onHandleChange={() => console.log('바텀바 선택됨')}
      />
    </div>
  );
};
