/** @jsxImportSource @emotion/react */
import React from 'react';
import { TopBar } from '../../../components/TopBar';
import { useNavigate } from 'react-router-dom';

export const MyReview = () => {
  const nav = useNavigate();
  return (
    <div>
      <TopBar>
        <TopBar.Title
          type="default"
          title="내가 쓴 리뷰 조회"
          backHandler={() => nav(-1)}
        />
      </TopBar>
      
    </div>
  );
};
