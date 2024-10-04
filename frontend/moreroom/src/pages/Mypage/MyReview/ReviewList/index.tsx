/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  brandCss,
  containerCss,
  contentCss,
  headerCss,
  leftContentCss,
  posterCss,
  profileCss,
  themeCss,
  updatedAtCss,
  fixReview
} from './styles';
import Rating from '../../../../components/Rating';
import { Typography } from '../../../../components/Typography';
import { Icon } from '../../../../components/Icon';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import { reviewDelete } from '../../../../apis/reviewApi';

export const ReviewList = ({
  nickname,
  profileSrc,
  content,
  score,
  poster,
  themeId,
  themeTitle,
  cafeBrand,
  cafeBranch,
  updatedAt,
  reviewId,
  createdAt,
  onReviewDeleted
  
}: {
  nickname: string;
  profileSrc: string;
  content: string;
  score: number;
  poster: string;
  themeId: number;
  themeTitle: string;
  cafeBrand?: string;
  cafeBranch?: string;
  updatedAt: string;
  reviewId: number;
  createdAt: string;
  onReviewDeleted: (reviewId: number) => Promise<void>;
}) => {
  const nav = useNavigate();

  const handleClick = () => {
    nav('/theme/detail', { state: { themeId: themeId } });
  };
  const reviewFix = () => {
    // 리뷰 수정 페이지로 이동하면서 해당 리뷰의 데이터 전달
    nav('/mypage/myreview/fix', {
      state: {
        themeId,
        themeTitle,
        content,
        score,
        poster,
        cafeBrand,
        cafeBranch,
        nickname,
        profileSrc,
        reviewId,
        createdAt
      },
    });
  };
  
  // 리뷰 삭제 핸들러
  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 이 리뷰를 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await onReviewDeleted(reviewId);
        alert("리뷰가 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("리뷰 삭제 중 오류 발생:", error);
        alert("리뷰 삭제 중 문제가 발생했습니다. 나중에 다시 시도해주세요.");
      }
    }
  };
  // console.log(reviewId)
  return (
    <div css={containerCss}>
      <div css={headerCss}>
        <div css={leftContentCss}>
          <div css={profileCss}>
            <img src={profileSrc} alt="프로필 사진" />
            <div>
              <Typography color="light" size={0.8} weight={500}>
                {nickname}
              </Typography>
              <Rating
                activeColor="secondary"
                count={5}
                disabled
                size={0.8}
                value={score}
              />
            </div>
          </div>
          <div css={themeCss} onClick={handleClick}>
            <Typography color="grey" scale="600" size={0.8} weight={600}>
              {themeTitle}
            </Typography>
            <div css={brandCss}>
              <Icon color="primary" size={1}>
                <MapPinIcon />
              </Icon>
              {cafeBrand ? (
                <Typography color="grey" scale="600" size={0.8} weight={500}>
                  {cafeBrand} - {cafeBranch}
                </Typography>
              ) : (
                <Typography color="grey" scale="600" size={0.8} weight={500}>
                  장소 정보 없음
                </Typography>
              )}
            </div>
          </div>
        </div>
        <div css={posterCss} onClick={handleClick}>
          <img src={poster} alt="방탈출 사진" />
        </div>
      </div>
      <div css={contentCss}>
        <Typography color="grey" scale="100" size={0.8} weight={500}>
          {content}
        </Typography>
        <Typography
          css={updatedAtCss}
          color="grey"
          scale="500"
          size={0.8}
          weight={500}
        >
          {createdAt} 작성 / 
          <a onClick={handleDelete} style={{ cursor: 'pointer', color: 'red', marginLeft: '5px' }}> 삭제하기</a>
        </Typography>
      </div>
        <Button css={fixReview}
          variant='contained'
          color='secondary'
          handler={reviewFix}
          rounded={0.5}
        >리뷰 수정
        </Button>
        
    </div>
  );
};
