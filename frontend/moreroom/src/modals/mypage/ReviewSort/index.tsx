/** @jsxImportSource @emotion/react */
import React, { useState, Suspense } from 'react';
import { useModal } from '../../../hooks/useModal';
import { ErrorBoundary } from 'react-error-boundary';
import { containerCss } from '../Selectedtheme/styles';
import { ReviewSortFetch } from './ReviewSortFetch';

interface ReviewSortProps {
  sortOption: string,
  onSelect: (option: string) => void; // onSelect prop 타입 정의
}

export const ReviewSort = ({ sortOption, onSelect }:ReviewSortProps) => {
  const modal = useModal();
  const [selectedOption, setSelectedOption] = useState('최신 작성순'); // 로컬 상태로 선택된 옵션 관리

  // 정렬 기준 선택 핸들러
  const handleSortSelect = (option: string) => {
    setSelectedOption(option); // 선택된 옵션 업데이트
    console.log(`선택된 정렬 기준: ${option}`); // 선택된 옵션 로그
    onSelect(option); // onSelect 호출
    modal.hide(); // 모달 닫기
  };

  return (
    <div css={containerCss}>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <ReviewSortFetch sortOption={sortOption} onSelect={handleSortSelect} /> {/* onSelect 핸들러 전달 */}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
