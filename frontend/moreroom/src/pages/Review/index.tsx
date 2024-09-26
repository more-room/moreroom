/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../components/TopBar';
import { topbarcolor } from './styles';


export const Review = () => {
  const nav = useNavigate();
  return(
    <div>
        <TopBar css={topbarcolor} >
          <TopBar.Title 
          type="default" 
          title='리뷰 작성' 
          backHandler={() => nav(-1)}/>
        </TopBar>
        <div>테마 불러오기 : ThemeItem 컴포넌트</div>
        <div>별점 컴포넌트 불러오기</div>
        <div>리뷰 작성 박스</div>

        <div>작성 완료 제출..</div>
    </div>
  )
}