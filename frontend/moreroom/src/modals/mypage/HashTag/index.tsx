import React, { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HashtagFetch } from './HashTagFetch';
import { Button } from '../../../components/Button';
import { useHashtagStore } from '../../../stores/mypageStore';
import { useModal } from '../../../hooks/useModal';
import { Typography } from '../../../components/Typography';

export interface HashTagsProps {
  type: string;
  onClose: () => void;
}

export const HashTag: React.FC<HashTagsProps> = ({ type, onClose }) => {
  const { selectedHashtags } = useHashtagStore();
  const [curType, setCurType] = useState<string>(type);
  const modal = useModal();

  const handler = (filter: string) => {
    setCurType(filter);
  };

  const clickHandler = () => {
    console.log(selectedHashtags);
    onClose();
  };

  return (
    <div>

      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <HashtagFetch />
        </Suspense>
      </ErrorBoundary>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '80px',
          margin: '20px'
        }}
      >
        <Button rounded={0.5} handler={clickHandler} fullwidth>
          적용하기
        </Button>
      </div>
    </div>
  );
};
