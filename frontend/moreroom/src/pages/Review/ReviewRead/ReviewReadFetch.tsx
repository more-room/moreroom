/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { HandThumbUpIcon, BellIcon, PencilIcon } from '@heroicons/react/24/solid';
import { TopBar } from '../../../components/TopBar';
import { cardcontainer, themeCard, topbarcolor, bottombarcss, reviewWrite, allViewButton, themeItemCss } from './styles';
import { getReviewForTheme, patchThumbsUp } from '../../../apis/reviewApi';
import { getThemeDetail } from '../../../apis/themeApi';
import { Typography } from '../../../components/Typography';
import { Rating } from '../../../components/Rating';
import { ThemeItem } from '../../../components/ThemeItem';
import { IThemeItem } from '../../../types/themeTypes';
import { BottomBar } from '../../../components/BottomBar';
import { Button } from '../../../components/Button';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS 초기화
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ReviewReadFetch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const themeId: number = location.state?.themeId;

  // 페이지에 보여줄 리뷰 수를 관리하는 상태
  const [visibleReviewCount, setVisibleReviewCount] = useState(3);

  // 좋아요 로딩 상태를 관리
  const [processingThumbsUp, setProcessingThumbsUp] = useState<{ [key: number]: boolean }>({});

  // 리뷰 데이터를 가져오는 쿼리
  const reviewQuery = useSuspenseQuery({
    queryKey: ['theme-review', themeId],
    queryFn: async () => await getReviewForTheme({ themeId, pageNumber: 0, pageSize: 80, sortOrder: 'desc' }),
    refetchOnWindowFocus: false, // 포커스 시 쿼리 재호출 방지
  });

  // 테마 상세 정보를 가져오는 쿼리
  const themeQuery = useSuspenseQuery({
    queryKey: ['theme-detail', themeId],
    queryFn: async () => await getThemeDetail(themeId),
    refetchOnWindowFocus: false,
  });

  if (reviewQuery.error && !reviewQuery.isFetching) {
    throw reviewQuery.error;
  }

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

  const reviews = reviewQuery.data.data.content;
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.score, 0) / reviews.length).toFixed(1)
    : "0.0";

  const ratingDistribution = new Array(10).fill(0);
  reviews.forEach((review) => {
    const index = Math.floor((review.score * 2) - 1);
    if (index >= 0 && index < ratingDistribution.length) {
      ratingDistribution[index] += 1;
    }
  });

  const chartData = {
    labels: ['0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0'],
    datasets: [
      {
        label: '별점 분포',
        data: ratingDistribution,
        backgroundColor: '#80deea',
        borderColor: '#80deea',
        borderWidth: 1,
      },
    ],
  };

  const loadMoreReviews = () => {
    setVisibleReviewCount((prevCount) => {
      if (prevCount + 3 > reviews.length) {
        return reviews.length;
      }
      return prevCount + 3;
    });
  };

  const reviewWriteMove = () => {
    navigate('/review/write', { state: { themeItem } });
  };

  // 좋아요 핸들러 함수 정의
  const handleThumbsUp = async (reviewId: number) => {
    if (processingThumbsUp[reviewId]) return; // 중복 클릭 방지

    try {
      setProcessingThumbsUp((prev) => ({ ...prev, [reviewId]: true })); // 로딩 상태로 설정

      // 좋아요 API 호출
      await patchThumbsUp(reviewId);

      // 성공적으로 호출한 후 서버 데이터로 동기화
      reviewQuery.refetch();
    } catch (error) {
      console.error('좋아요 요청 실패', error);
    } finally {
      setProcessingThumbsUp((prev) => ({ ...prev, [reviewId]: false })); // 로딩 상태 해제
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
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
            <Rating activeColor="secondary" count={1} value={parseFloat(averageRating)} size={1.5} transparentBackground />
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
                  grid: { drawOnChartArea: false, drawTicks: true, tickLength: 5, color: 'rgba(255, 255, 255, 1)' },
                  border: { color: 'rgba(255, 255, 255, 1)' },
                  ticks: { autoSkip: false, maxRotation: 0, minRotation: 0, padding: 10, color: 'rgba(255, 255, 255, 1)' },
                },
                y: {
                  grid: { drawOnChartArea: false },
                  border: { display: false },
                  ticks: { display: false },
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
                  <Rating activeColor="secondary" count={5} value={review.score} size={1} />
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
                    onClick={() => handleThumbsUp(review.reviewId)}
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '0.5rem',
                      color: review.thumbsUp ? '#80deea' : '#ffffff',
                      cursor: processingThumbsUp[review.reviewId] ? 'not-allowed' : 'pointer',
                    }}
                  />
                  <Typography color="light" size={0.875} weight={400}>
                    {review.thumbsUp}
                  </Typography>
                </div>
                <Typography color="light" size={0.75} weight={400}>
                  {review.createdAt}
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
