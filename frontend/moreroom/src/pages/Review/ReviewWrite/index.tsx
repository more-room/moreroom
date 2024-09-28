/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TopBar } from '../../../components/TopBar';
import { topbarcolor, bottombarcss, ratingcss, themeCardStyles } from './styles';
import { BottomBar } from '../../../components/BottomBar';
import { BellIcon } from '@heroicons/react/24/solid';
import { ThemeItem } from '../../../components/ThemeItem';
import { Typography } from '../../../components/Typography';
import { IThemeItem } from '../../../types/themeTypes';
import { Rating } from '../../../components/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const ReviewWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { themeItem } = location.state || {};

  // 별점 상태를 관리하는 useState 훅
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewContent, setReviewContent] = useState(""); // 리뷰 내용 상태 관리
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태 관리

  // 별점 변경 핸들러
  const handleRatingChange = (value: number) => {
    setRatingValue(value); // 별점 값 업데이트
    console.log('Selected Rating:', value); // 별점 변경 시 콘솔에 출력
  };

  // 리뷰 제출 함수
  const handleSubmit = () => {
    // 작성된 리뷰 데이터를 여기에 추가하여 제출 가능
    if (ratingValue < 0.5) {
      setErrorMessage("별점은 최소 0.5점 이상이어야 합니다.");
      return;
    }

    if (reviewContent.length < 2) {
      setErrorMessage("리뷰는 최소 2글자 이상 작성해야 합니다.");
      return;
    }

    // 오류가 없는 경우, 제출
    setErrorMessage(""); // 오류 메시지 초기화

    const reviewData = {
      themeId: themeItem?.themeId,
      content: reviewContent, // 사용자가 작성한 리뷰 내용
      score: ratingValue, // 사용자가 선택한 별점 값
    };

    console.log('리뷰 제출 데이터:', reviewData);
    // 여기에 API 호출 (예: createReview(reviewData))을 추가하여 데이터 전송
  };

  return (
    <div>
      <TopBar css={topbarcolor}>
        <TopBar.Title type="default" title="리뷰 작성" backHandler={() => navigate(-1)} />
      </TopBar>
      
      {/* ThemeItem을 통해 테마 정보를 보여줍니다 */}
      <div css={themeCardStyles}>
        <ThemeItem theme={themeItem} />
      </div>

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

      <div style={{ margin: '2rem 0', textAlign: 'left' }}>
        <TextField
          id="outlined-multiline-static"
          label="리뷰"
          multiline
          rows={4}
          placeholder="테마에 대한 후기를 자유롭게 적어주세요." // 설명 추가
          variant="outlined"
          fullWidth
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)} // 리뷰 내용 업데이트
          InputLabelProps={{
            style: { color: '#ffffff' }, // 라벨 색상을 흰색으로 변경
          }}
          sx={{
            backgroundColor: '#333', // 배경 색상 어둡게 설정
            borderRadius: '5px',
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
            },
          }}
        />
      </div>

      {errorMessage && (
        <div style={{ color: 'red', textAlign: 'left', margin: '1rem 2rem' }}>
          {errorMessage}
        </div>
      )}

      <div style={{ margin: '2rem' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={ratingValue < 0.5 || reviewContent.length < 2} // 조건을 만족해야 버튼 활성화
          sx={{
            backgroundColor: ratingValue < 0.5 || reviewContent.length < 2 ? '#ffffff' : '#8e44ad', // 조건에 따른 색상 변경
            color: '#ffffff', // 버튼 텍스트 색상
            width: '100%',
            '&:hover': {
              backgroundColor: ratingValue < 0.5 || reviewContent.length < 2 ? '#ffffff' : '#732d91', // 조건에 따른 색상 변경
            },
          }}
        >
          작성완료
        </Button>
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
