/** @jsxImportSource @emotion/react */
import React from 'react';
import { TopBar } from '../../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { Progress } from '../../../components/Progress';
import { Button } from '../../../components/Button';
import { btnCss } from '../AccountInfo/styles';

export const GenreInfo = () => {
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
      <Progress color="primary" max={4} size="md" value={3} variant="rounded" />
      <Button
        css={btnCss}
        style={{ margin: '2rem 0' }}
        fullwidth
        color="primary"
        rounded={0.5}
        scale="A200"
        variant="contained"
        handler={() => nav('/signup/done')}
      >
        다음으로
      </Button>
    </div>
  );
};
