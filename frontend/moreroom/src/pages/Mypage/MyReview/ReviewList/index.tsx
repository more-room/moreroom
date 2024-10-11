/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
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
  fixReview,
  btnCss,
  errorimg
} from './styles';
import Rating from '../../../../components/Rating';
import { Typography } from '../../../../components/Typography';
import { Icon } from '../../../../components/Icon';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import { Notification } from '../../../../components/Notification';

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
  const [imgErr, setImgErr] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false); // 삭제 확인 모달 상태
  const [isDeleteSuccessOpen, setDeleteSuccessOpen] = useState<boolean>(false); // 삭제 완료 모달 상태

  const handleClick = () => {
    nav(`/themes/${themeId}`);
  };

  const reviewFix = () => {
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
        createdAt,
      },
    });
  };

  // 삭제 확인 모달 핸들러
  const handleDelete = () => {
    setDeleteConfirmOpen(true); // 삭제 확인 모달 열기
  };

  // 삭제 확정 처리 핸들러
  const handleConfirmDelete = async () => {
    try {
      // 실제 리뷰 삭제 API 호출
      await onReviewDeleted(reviewId);
      setDeleteConfirmOpen(false); // 삭제 확인 모달 닫기
      setDeleteSuccessOpen(true); // 삭제 성공 모달 열기
    } catch (error) {
      console.error("리뷰 삭제 중 오류 발생:", error);
      alert("리뷰 삭제 중 문제가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };

  return (
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
                value={score}
              />
            </div>
          </div>
          <div css={themeCss} onClick={handleClick}>
            <Typography color="grey" scale="100" size={1} weight={600}>
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
          {!imgErr ? (
            <img src={poster} alt="포스터 사진" onError={() => setImgErr(true)} />
          ) : (
            <div css={errorimg}>
              <Typography color="light" weight={500} size={0.75}>
                포스터를
              </Typography>
              <Typography color="light" weight={500} size={0.75}>
                준비중입니다
              </Typography>
            </div>
          )}
        </div>
      </div>
      <div css={contentCss}>
        <Typography color="grey" scale="100" size={1.2} weight={500}>
          {content}
        </Typography>
      </div>
      <div css={btnCss}>
        <Typography css={updatedAtCss} color="grey" scale="500" size={0.8} weight={500}>
          {createdAt} 작성 / 
          <a onClick={handleDelete} style={{ cursor: 'pointer', color: 'red', marginLeft: '5px' }}> 삭제하기</a>
        </Typography>
        <Button css={fixReview}
          variant='contained'
          color='secondary'
          handler={reviewFix}
          rounded={0.5}
        >
          리뷰 수정
        </Button>
      </div>

      {/* 삭제 확인 모달 */}
      {isDeleteConfirmOpen && (
        <Notification
          ment="정말 이 리뷰를 삭제하시겠습니까?"
          type="confirm"
          handler={handleConfirmDelete} // 확인 시 리뷰 삭제 처리
        />
      )}

      {/* 삭제 완료 모달 */}
      {isDeleteSuccessOpen && (
        <Notification
          ment="리뷰가 성공적으로 삭제되었습니다."
          type="confirm"
          handler={() => setDeleteSuccessOpen(false)} // 확인 시 모달 닫기
        />
      )}
    </div>
  );
};
