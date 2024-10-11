/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { useModal } from '../../../hooks/useModal';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '../../../components/Button';
import { btnCss, containerCss, fontCss } from './styles';
import { Typography } from '../../../components/Typography';
import { Region } from '../Region';
import { useRegionSelectionStore } from '../../../stores/signupStore';
import { number } from 'prop-types';

export const Selectedtheme = ({ regionId }: { regionId?: string }) => {
  const modal = useModal();
  const { selectedRegionId, selectedRegion, selectedCity } = useRegionSelectionStore();

  const clickHandler = () => {
    console.log('Selected Region ID:', selectedRegionId);
    console.log('Selected Region:', selectedRegion);
    console.log('Selected City:', selectedCity);
    modal.hide();
  };

  return (
    <div css={containerCss}>
      <Typography css={fontCss} color="light" size={1} weight={500}>
        추천받고 싶은 지역이 있다면 선택해주세요!
      </Typography>
      <ErrorBoundary fallback={<>에러가 발생했습니다. 다시 시도해주세요.</>}>
        <Suspense fallback={<>로딩중...</>}>
          <Region regionId={regionId}/>
        </Suspense>
      </ErrorBoundary>
      <Button css={btnCss} fullwidth rounded={0.5} handler={clickHandler}>
        적용하기
      </Button>
    </div>
  );
};
