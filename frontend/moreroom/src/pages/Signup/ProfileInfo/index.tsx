/** @jsxImportSource @emotion/react */
import React from 'react';
import { TopBar } from '../../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { Progress } from '../../../components/Progress';
import { Typography } from '../../../components/Typography';
import { FilterChip } from '../../../components/FilterChip';
import { chipItemCss, containerCss, filterCss } from './styles';
import { CssTextField } from '../AccountInfo';
import { Button } from '../../../components/Button';
import { btnCss } from '../AccountInfo/styles';

export const ProfileInfo = () => {
  const nav = useNavigate();
  return (
    <div>
      <TopBar>
        <TopBar.Title
          type="default"
          title="회원가입"
          backHandler={() => nav(-1)}
        />
      </TopBar>
      <Progress color="primary" max={4} size="md" value={2} variant="rounded" />
      <div css={containerCss}>
        <Typography color="light" scale="400" size={1} weight={500}>
          성별
        </Typography>
        <div css={filterCss}>
          <FilterChip
            css={chipItemCss}
            color="primary"
            size={1}
            onHandleClick={() => {}}
          >
            남성
          </FilterChip>
          <FilterChip
            css={chipItemCss}
            color="primary"
            size={1}
            onHandleClick={() => {}}
          >
            여성
          </FilterChip>
        </div>
        <Typography color="light" scale="400" size={1} weight={500}>
          생년월일
        </Typography>
        <div css={filterCss}>
          <CssTextField
            fullWidth
            label="YYYY"
            id="custom-css-outlined-input"
            // value={code}
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //   setCode(e.target.value);
            // }}
          />
          <CssTextField
            fullWidth
            label="MM"
            id="custom-css-outlined-input"
            // value={code}
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //   setCode(e.target.value);
            // }}
          />
          <CssTextField
            fullWidth
            label="DD"
            id="custom-css-outlined-input"
            // value={code}
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //   setCode(e.target.value);
            // }}
          />
        </div>
        <Typography color="light" scale="400" size={1} weight={500}>
          지역(선택)
        </Typography>
        <div css={filterCss}>
          <FilterChip
            css={chipItemCss}
            color="primary"
            size={1}
            onHandleClick={() => {}}
          >
            선택안함
          </FilterChip>
        </div>
        <Button
          css={btnCss}
          style={{ margin: '2rem 0' }}
          fullwidth
          color="primary"
          rounded={0.5}
          scale="A200"
          variant="contained"
          handler={() => nav('/signup/genreinfo')}
        >
          다음으로
        </Button>
      </div>
    </div>
  );
};
