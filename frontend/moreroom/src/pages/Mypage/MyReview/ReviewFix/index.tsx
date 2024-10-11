/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { TopBar } from '../../../../components/TopBar';
import { 
  largeBox, 
  topbarcolor, 
  bottombarcss, 
  ratingcss, 
  themeCardStyles, 
  btncss,
  containerCss,
  headerCss,
  leftContentCss,
  profileCss,
  themeCss,
  brandCss,
  posterCss,
  contentCss,
  updatedAtCss,
} from './styles';
import { BottomBar } from '../../../../components/BottomBar';
import { BellIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { ThemeItem } from '../../../../components/ThemeItem';
import { Typography } from '../../../../components/Typography';
import { IFixTheme } from '../../../../types/themeTypes';
import { Rating } from '../../../../components/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createReview, reviewPatch } from '../../../../apis/reviewApi';
import { Icon } from '../../../../components/Icon';

export const ReviewFix = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { themeId, reviewId, themeTitle, content, score, poster, cafeBrand, cafeBranch, nickname, profileSrc } = location.state || {};

  // 이전에 작성한 별점과 리뷰 내용을 기본값으로 설정
  const [ratingValue, setRatingValue] = useState(score || 0); // 이전 별점 기본값으로 설정
  const [reviewContent, setReviewContent] = useState(content || ""); // 이전 리뷰 내용 기본값으로 설정
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태 관리

  // 별점 변경 핸들러
  const handleRatingChange = (value: number) => {
    setRatingValue(value); // 별점 값 업데이트
    console.log('Selected Rating:', value); // 별점 변경 시 콘솔에 출력
  };

  // 리뷰 제출 함수
  const handleSubmit = () => {
    // 별점과 리뷰의 최소 조건 확인
    if (ratingValue < 0.5) {
      setErrorMessage("별점은 최소 0.5점 이상이어야 합니다.");
      return;
    }

    if (reviewContent.length < 2) {
      setErrorMessage("리뷰는 최소 2글자 이상 작성해야 합니다.");
      return;
    }

    // 오류가 없는 경우, 제출
    setErrorMessage(""); 

    const reviewData = {
      content: reviewContent,
      score: ratingValue,
    };

    console.log('리뷰 수정 데이터:', reviewData);

    // 리뷰 수정 API 호출
    reviewPatch(reviewId, reviewData)
      .then((response) => {
        console.log('리뷰 수정 성공:', response.data);
        // 성공적으로 수정한 경우 이전 화면으로 돌아가기
        navigate(-1);
      })
      .catch((error) => {
        console.error('리뷰 수정 실패:', error);
        setErrorMessage("리뷰 수정에 실패했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <div>
      <div style={{ height: '5vh', overflow: 'auto'}}>
        <TopBar css={topbarcolor}>
          <TopBar.Title type="default" title="리뷰 작성" backHandler={() => navigate(-1)} />
        </TopBar>
      </div>

      {/* 이전 페이지에서 불러온 리뷰 정보를 그대로 표시 */}
      <div css={containerCss}>
        <div css={headerCss}>
          <div css={leftContentCss}>
            <div css={profileCss}>
              <img src={`/profiles/profile${profileSrc}.png`} alt="프로필 사진" />
              <div>
                <Typography color="light" size={0.8} weight={500}>
                  {nickname}
                </Typography>
                <Rating
                  activeColor="secondary"
                  count={5}
                  disabled
                  size={0.8}
                  value={score} // 이전 별점 표시
                />
              </div>
            </div>
            <div css={themeCss}>
              <Typography color="grey" scale="600" size={0.8} weight={600}>
                {themeTitle}
              </Typography>
              <div css={brandCss}>
                <Icon color="primary" size={1}>
                  <MapPinIcon />
                </Icon>
                {cafeBrand ? (
                  <Typography color="grey" scale="600" size={0.8} weight={500}>
                    {cafeBrand} - {cafeBranch || "장소 정보 없음"}
                  </Typography>
                ) : (
                  <Typography color="grey" scale="600" size={0.8} weight={500}>
                    장소 정보 없음
                  </Typography>
                )}
              </div>
            </div>
          </div>
          <div css={posterCss}>
            <img src={poster} alt="테마 포스터" />
          </div>
        </div>
        <div css={contentCss}>
          <Typography color="grey" scale="100" size={0.8} weight={500}>
            {content}
          </Typography>
        </div>
      </div>

      {/* 별점 선택 영역 */}
      <div style={{ margin: '2rem' }} css={ratingcss}>
        <Rating
          activeColor="secondary"
          count={5}
          value={ratingValue} // 현재 선택된 별점 값을 표시
          size={2.5}
          transparentBackground={false}
          disabled={false}
          onChange={handleRatingChange} // 사용자가 별점을 선택할 때 호출되는 핸들러
        />
      </div>
      <hr style={{ width: '60%'}}></hr>

      {/* 리뷰 내용 입력란 */}
      <div style={{ margin: '3rem 1rem', textAlign: 'center', fontFamily: 'paperlogy'}}>
        <TextField
          id="outlined-multiline-static"
          label={<Typography color='grey' weight={600}>리뷰</Typography>}
          multiline
          rows={8}
          placeholder="테마에 대한 후기를 적어주세요." // 설명 추가
          variant="outlined"
          fullWidth={true} // 전체 너비로 설정
          value={reviewContent} // 리뷰 내용 기본값으로 설정
          onChange={(e) => setReviewContent(e.target.value)} // 리뷰 내용 업데이트
          InputLabelProps={{
            style: { color: '#ffffff' }, // 라벨 색상을 흰색으로 변경
          }}
          sx={{
            backgroundColor: '#333', // 배경 색상 어둡게 설정
            borderRadius: '5px',
            width: '90%', // 너비를 90%로 설정하여 적당히 확대
            height: '70%',
            margin: '0 auto', // 중앙에 배치되도록 설정
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ffffff', // 외곽선 색상 설정
              },
              '&:hover fieldset': {
                borderColor: '#757271', // 호버 시 외곽선 색상 설정
              },
            },
            '& .MuiInputBase-input': {
              color: '#ffffff', // 입력 텍스트 색상 설정
              fontSize: '1.5rem'
            },
          }}
        />
      </div>

      {/* 오류 메시지 출력 */}
      {errorMessage && (
        <div style={{ color: 'red', textAlign: 'left', margin: '1rem 2rem' }}>
          {errorMessage}
        </div>
      )}

      {/* 작성 완료 버튼 */}
      <div css={btncss}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={ratingValue < 0.5 || reviewContent.length < 2} // 조건을 만족해야 버튼 활성화
          sx={{
            backgroundColor: ratingValue < 0.5 || reviewContent.length < 2 ? '#ffffff' : '#e040fb', // 조건에 따른 색상 변경
            color: '#ffffff', // 버튼 텍스트 색상
            width: '100%',
            '&:hover': {
              backgroundColor: ratingValue < 0.5 || reviewContent.length < 2 ? '#ffffff' : '#e040fb', // 조건에 따른 색상 변경
            },
          }}
        >
          <Typography color='light' weight={600}>작성 완료</Typography>
        </Button>
      </div>

      
    </div>
  );
};
