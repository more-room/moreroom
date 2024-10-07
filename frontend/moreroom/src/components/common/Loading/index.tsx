/** @jsxImportSource @emotion/react */
import React from 'react';
import { containerCss } from './style';
import { Spinner } from '../../Spinner';

interface LoadingProps {
  height?: string;
}


const Loading = ({ height = '100%' }: LoadingProps) => {
  return (
    <div css={containerCss} style={{ height }}>
      <Spinner color="primary" size="sm" />
    </div>
  );
};

export default Loading;
