/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { HandThumbUpIcon, BellIcon, PencilIcon } from '@heroicons/react/24/solid';
import { TopBar } from '../../../components/TopBar';
import { cardcontainer, themeCard, topbarcolor, bottombarcss, reviewWrite, allViewButton, themeItemCss } from './styles';
import { getReviewForTheme, patchThumbsUp } from '../../../apis/reviewApi'; // 리뷰 API 가져오기
import { getThemeDetail } from '../../../apis/themeApi';
import { Typography } from '../../../components/Typography';
import { Rating } from '../../../components/Rating';
import { ThemeItem } from '../../../components/ThemeItem';
import { IThemeItem } from '../../../types/themeTypes';
import { BottomBar } from '../../../components/BottomBar';
import { Button } from '../../../components/Button';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS를 초기화합니다.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ReviewReadFetch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const themeId: number = location.state?.themeId; // 불러온 테마 아이디 

  // 페이지에 보여줄 리뷰 수를 관리하는 상태
  const [visibleReviewCount, setVisibleReviewCount] = useState(3);

  // 좋아요 누른 리뷰의 상태 관리 (리뷰별 좋아요 정보 포함)
  const [thumbsUpReviews, setThumbsUpReviews] = useState<{ [key: number]: boolean }>({});

  // 리뷰 데이터를 가져오는 쿼리
  const reviewQuery = useSuspenseQuery({
    queryKey: ['theme-review', themeId],
    queryFn: async () => await getReviewForTheme({ themeId, pageNumber: 0, pageSize: 80, sortOrder: 'desc',  })
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
    themeId: location.state?.themeId,
    poster: location.state?.poster,
    title: location.state?.title,
    playtime: location.state?.playtime,
    genreList: location.state?.genreList,
    review: location.state?.review,
    regionId: location.state?.regionId,
    cafe: {
      "cafeId": location.state?.cafeId,
      "brandName": location.state?.brandName,
      "branchName": location.state?.branchName,
      "cafeName": "",
      "address": location.state?.address,
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

  // "더 많은 리뷰 보기" 버튼을 클릭했을 때 더 많은 리뷰를 보여주기 위해 visibleReviewCount 증가
  const loadMoreReviews = () => {
    setVisibleReviewCount((prevCount) => {
      if (prevCount + 3 > reviews.length) {
        return reviews.length; // 남은 모든 리뷰를 보여줍니다.
      }
      return prevCount + 3; // 기본적으로 3씩 증가
    });
  };

  // 리뷰 작성 페이지로 이동 (테마 정보 함께 전달)
  const reviewWriteMove = () => {
    console.log('페이지에서 넘길 때:', themeItem);
    navigate('/review/write', {
      state: { themeItem }
    });
  };

  // 좋아요 핸들러 함수 정의
  const handleThumbsUp = async (reviewId: number, currentThumbsUp: number) => {
    console.log('추천 확인용:', reviewId); // 확인용 로그
    try {
      const isThumbsUp = thumbsUpReviews[reviewId] || false;
      const newThumbsUpValue = isThumbsUp ? currentThumbsUp - 1 : currentThumbsUp + 1;

      // 좋아요 API 호출
      await patchThumbsUp(reviewId);
      reviewQuery.refetch(); // 좋아요 반영 후 데이터 다시 불러오기

      // 로컬 상태 업데이트: 좋아요 상태 토글
      setThumbsUpReviews((prevThumbsUpReviews) => ({
        ...prevThumbsUpReviews,
        [reviewId]: !isThumbsUp,
      }));

    } catch (error) {
      console.error('좋아요 요청 실패', error);
    }
  };

  return (
    <div>
      <TopBar css={topbarcolor}>
        <TopBar.Title type="default" title="리뷰 조회" backHandler={() => navigate(-1)} />
      </TopBar>
      <div css={themeItemCss}>
        <ThemeItem theme={themeItem} />
      </div>

      {/* 평균 별점 및 별점 분포 표시 */}
      <div style={{ textAlign: 'left', margin: '1rem', display: 'flex', alignItems: 'flex-start' }}>
        <div style={{ marginRight: '2rem' }}>
          <Typography color="light" size={1} weight={700}>
            평균 별점
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '0.5rem' }}>
            <Rating activeColor="secondary" count={1} value={parseFloat(averageRating)} size={1.5} transparentBackground={true} />
            <Typography color="secondary" size={1} weight={700} style={{ marginLeft: '0.5rem' }}>
              {averageRating}
            </Typography>
          </div>
        </div>
        <div style={{ width: '70%', height: 'auto', marginLeft: '0rem', marginTop: '1rem' }}>
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
                    drawOnChartArea: false,
                    drawTicks: true,
                    tickLength: 5,
                    color: 'rgba(255, 255, 255, 1)',
                  },
                  border: {
                    color: 'rgba(255, 255, 255, 1)',
                  },
                  ticks: {
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0,
                    padding: 10,
                    color: 'rgba(255, 255, 255, 1)',
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
                    drawOnChartArea: false,
                  },
                  border: {
                    display: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* 테마 리뷰 리스트 표시 */}
      <div style={{ marginTop: '2rem' }}>
        <div css={cardcontainer}>
          {reviews.slice(0, visibleReviewCount).map((review) => (
            <div key={review.reviewId} css={themeCard} style={{ padding: '0.5rem' }}>
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
                  <HandThumbUpIcon
                    onClick={() => handleThumbsUp(review.reviewId, review.thumbsUp)}
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '0.5rem',
                      color: thumbsUpReviews[review.reviewId] ? '#80deea' : '#ffffff'
                    }}
                  />
                  <Typography color="light" size={0.875} weight={400}>
                    {thumbsUpReviews[review.reviewId] ? review.thumbsUp + 1 : review.thumbsUp}
                  </Typography>
                </div>
                <Typography color="light" size={0.75} weight={400}>
                  {review.updatedAt}
                </Typography>
              </div>
            </div>
          ))}

          {/* 더 많은 리뷰 보기 버튼 */}
          {reviews.length > visibleReviewCount && (
            <Button
              css={allViewButton}
              variant="contained"
              fullwidth={true}
              rounded={0.4}
              handler={loadMoreReviews}
            >
              더 많은 리뷰 보기
            </Button>
          )}

          <Button
            css={reviewWrite}
            variant="contained"
            fullwidth={true}
            rounded={0.4}
            color='secondary'
            handler={reviewWriteMove}
          >
            <PencilIcon />
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