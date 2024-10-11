/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../components/Icon';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { containerCss } from './styles';

export const Done = () => {
  const nav = useNavigate();
  return (
      <div css={containerCss}>
        <Icon color="light" size={5}>
          <CheckCircleIcon />
        </Icon>
        <div>
          <Typography color="light" size={1.25} weight={700}>
            회원가입이 완료되었습니다.
            <br />
            몰¿룸? 회원이 되신 것을 환영해요.
          </Typography>
        </div>
        <div>
          <Typography color="grey" scale={'500'} size={1} weight={400}>
            지금 바로 몰¿룸?을 통해서
            <br />
            방탈출 테마 추천 및 파티 매칭을 경험해보세요!
          </Typography>
        </div>
        <div>
          <Button
            style={{ margin: '2rem 0', fontSize: '1.2rem' }}
            fullwidth
            color="primary"
            rounded={0.5}
            scale="A200"
            variant="contained"
            handler={() => nav('/login')}
          >
            로그인 하러가기
          </Button>
        </div>
      </div>
  );
};
