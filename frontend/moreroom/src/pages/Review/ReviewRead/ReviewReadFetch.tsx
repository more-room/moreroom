/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import {
  HandThumbUpIcon,
  PencilIcon,
  StarIcon,
} from '@heroicons/react/24/solid';
import { TopBar } from '../../../components/TopBar';
import {
  cardcontainer,
  themeCard,
  topbar,
  reviewWrite,
  allViewButton,
  themeitem,
  reviewchart,
  row,
  excard,
  excontainer,
  exrow,
} from './styles';
import {
  getExternalReview,
  getReviewForTheme,
  patchThumbsUp,
} from '../../../apis/reviewApi'; // 리뷰 API 가져오기
import { getThemeDetail } from '../../../apis/themeApi';
import { Typography } from '../../../components/Typography';
import { Rating } from '../../../components/Rating';
import { ThemeItem } from '../../../components/ThemeItem';
import { IThemeItem } from '../../../types/themeTypes';
import { Button } from '../../../components/Button';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Icon } from '../../../components/Icon';
import { MenuTab } from '../../../components/MenuTab';
import { IExternalReview } from '../../../types/reviewTypes';
import dayjs from 'dayjs';

// ChartJS를 초기화합니다.
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const ReviewReadFetch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const themeId: number = location.state?.themeId; // 불러온 테마 아이디

  // 페이지에 보여줄 리뷰 수를 관리하는 상태
  const [visibleReviewCount, setVisibleReviewCount] = useState(3);

  // 좋아요 누른 리뷰의 상태 관리 (리뷰별 좋아요 정보 포함)
  const [thumbsUpReviews, setThumbsUpReviews] = useState<{
    [key: number]: boolean;
  }>({});
  // 좋아요 로딩 상태를 관리
  const [processingThumbsUp, setProcessingThumbsUp] = useState<{
    [key: number]: boolean;
  }>({});

  // 리뷰 데이터를 가져오는 쿼리
  const [reviewQuery, exQuery, themeQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['theme-review', themeId],
        queryFn: async () =>
          await getReviewForTheme({
            themeId,
            pageNumber: 0,
            pageSize: 80,
            sortOrder: 'desc',
          }),
      },
      {
        queryKey: ['theme-external', themeId],
        queryFn: async () =>
          await getExternalReview({ themeId: themeId, pageNumber: 0 }),
      },
      {
        queryKey: ['theme-detail', themeId],
        queryFn: async () => await getThemeDetail(themeId),
      },
    ],
  });

  [reviewQuery, exQuery, themeQuery].some((query) => {
    if (query.error && !query.isFetching) {
      throw query.error;
    }
  });

  const themeItem: IThemeItem = {
    themeId: location.state?.themeId,
    poster: location.state?.poster,
    title: location.state?.title,
    playtime: location.state?.playtime,
    genreList: location.state?.genreList,
    review: location.state?.review,
    regionId: location.state?.regionId,
    cafe: {
      cafeId: location.state?.cafeId,
      brandName: location.state?.brandName,
      branchName: location.state?.branchName,
      cafeName: '',
      address: location.state?.address,
    },
  };

  const [reviewType, setReviewType] = useState<number>(0);
  const reviews = reviewQuery.data.data.content;
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.score, 0) /
          reviews.length
        ).toFixed(1)
      : '0.0';

  const ratingDistribution = new Array(10).fill(0);
  reviews.forEach((review) => {
    const index = Math.floor(review.score * 2 - 1);
    if (index >= 0 && index < ratingDistribution.length) {
      ratingDistribution[index] += 1;
    }
  });

  const chartData = {
    labels: [
      '0.5',
      '1.0',
      '1.5',
      '2.0',
      '2.5',
      '3.0',
      '3.5',
      '4.0',
      '4.5',
      '5.0',
    ],
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
    console.log('페이지에서 넘길 때:', themeItem);
    navigate('/review/write', {
      state: { themeItem },
    });
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
    <>
      <TopBar css={topbar}>
        <TopBar.Title
          type="default"
          title="리뷰 조회"
          backHandler={() => navigate(-1)}
        />
      </TopBar>
      <ThemeItem theme={themeItem} css={themeitem} />
      <div style={{ padding: '0 1rem' }}>
        <MenuTab
          children={['내부 리뷰', '외부 리뷰']}
          border={0.5}
          onChangeMenu={setReviewType}
          fontSize={0.75}
          style={{ padding: '0.375rem 0' }}
        />
      </div>

      {reviewType === 0 ? (
        <>
          {reviewQuery.data.data.content.length ? (
            <>
              {/* 평균 별점 및 별점 분포 표시 */}
              <div css={reviewchart}>
                <div>
                  <Typography color="light" weight={500}>
                    평균 별점
                  </Typography>
                  <div css={row(0.5)} style={{ marginTop: '0.25rem' }}>
                    <Icon color="secondary">
                      <StarIcon />
                    </Icon>
                    <Typography color="secondary" weight={500}>
                      {averageRating}
                    </Typography>
                  </div>
                </div>
                <div
                  style={{
                    width: '70%',
                    height: 'auto',
                  }}
                >
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
                              if (
                                ['0.5', '3.0', '5.0'].includes(
                                  chartData.labels[index],
                                )
                              ) {
                                return chartData.labels[index];
                              } else {
                                return '';
                              }
                            },
                          },
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
              <div css={cardcontainer}>
                {reviews.slice(0, visibleReviewCount).map((review) => (
                  <div
                    key={review.reviewId}
                    css={themeCard}
                    style={{ padding: '0.5rem' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '1rem',
                        }}
                      >
                        <Rating
                          activeColor="secondary"
                          count={5}
                          value={review.score}
                          size={1}
                          transparentBackground={false}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          color="light"
                          size={0.875}
                          weight={700}
                          style={{ marginRight: '0.5rem' }}
                        >
                          {review.member.memberName}
                        </Typography>
                        <img
                          src={`/profiles/profile${review.member.memberProfile}.png`}
                          alt="프로필"
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                          }}
                        />
                      </div>
                    </div>
                    <Typography color="light" size={0.875} weight={400}>
                      {review.content}
                    </Typography>
                    <div
                      style={{
                        marginTop: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <HandThumbUpIcon
                          onClick={() => handleThumbsUp(review.reviewId)}
                          style={{
                            width: '20px',
                            height: '20px',
                            marginRight: '0.5rem',
                            color: review.thumbsUp ? '#80deea' : '#ffffff',
                            cursor: processingThumbsUp[review.reviewId]
                              ? 'not-allowed'
                              : 'pointer',
                          }}
                        />
                        <Typography color="light" size={0.875} weight={400}>
                          {thumbsUpReviews[review.reviewId]
                            ? review.thumbsUp + 1
                            : review.thumbsUp}
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
              </div>
            </>
          ) : (
            <Typography
              color="light"
              weight={600}
              size={0.875}
              style={{ textAlign: 'center', marginTop: '2rem' }}
            >
              등록된 리뷰가 없습니다
            </Typography>
          )}
        </>
      ) : (
        <>
          {exQuery.data.data.content.length ? (
            <div css={excontainer}>
              {exQuery.data.data.content.map((review: IExternalReview) => (
                <div css={excard}>
                  <div css={exrow}>
                    <Typography color="grey" weight={400} size={0.75}>
                      작성 날짜{' '}
                      {dayjs(review.createdAt).format('YYYY년 MM월 DD일')}
                    </Typography>
                    <Typography
                      color="secondary"
                      weight={400}
                      size={0.75}
                      style={{ textDecoration: 'underline' }}
                      onClick={() => (window.location.href = review.link)}
                    >
                      {review.source === 1 ? '네이버에서 보기' : '에서 보기'}
                    </Typography>
                  </div>
                  <Typography
                    color="light"
                    weight={500}
                    size={0.875}
                    style={{ marginTop: '1rem' }}
                  >
                    {review.title}
                  </Typography>
                  <Typography
                    color="light"
                    weight={400}
                    size={0.8125}
                    style={{ marginTop: '1rem' }}
                  >
                    {review.content}
                  </Typography>
                </div>
              ))}
            </div>
          ) : (
            <Typography
              color="light"
              weight={600}
              size={0.875}
              style={{ textAlign: 'center', marginTop: '2rem' }}
            >
              등록된 리뷰가 없습니다
            </Typography>
          )}
        </>
      )}
      <Button
        css={reviewWrite}
        variant="contained"
        fullwidth={true}
        rounded={0.4}
        color="secondary"
        handler={reviewWriteMove}
      >
        <PencilIcon />
      </Button>
    </>
  );
};
