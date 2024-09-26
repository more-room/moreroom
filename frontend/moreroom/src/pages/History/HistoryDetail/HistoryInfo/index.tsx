/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Typography } from '../../../../components/Typography';
import { container, item } from './styles';
import { IHistoryDetail } from '../../../../types/historyTypes';
import { addComma } from '../../../../utils/priceUtils';
import { DifficultyRange } from '../../../../components/DifficultyRange';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { Popover } from '@mui/material';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Icon } from '../../../../components/Icon';
import { levelMent } from '../../../../types/themeTypes';

dayjs('ko');

interface HistoryInfoProps {
  history: IHistoryDetail;
}

export const HistoryInfo = ({ history }: HistoryInfoProps) => {
  const [levelEl, setLevelEl] = useState<HTMLDivElement | null>(null);

  const handleShow = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => setLevelEl(() => e.currentTarget);
  const handleHide = () => setLevelEl(() => null);

  return (
    <div style={{ marginTop: '2rem' }}>
      <Typography
        color="light"
        weight={600}
        size={0.875}
        style={{ marginLeft: '1rem' }}
      >
        플레이 기록
      </Typography>
      <div css={container}>
        <div css={item}>
          <Typography
            color={history.successFlag ? 'secondary' : 'danger'}
            weight={700}
            size={0.875}
          >
            {history.successFlag ? '성공' : '실패'}
          </Typography>
          <Typography color="grey" weight={400} size={0.75}>
            성공 여부
          </Typography>
        </div>
        <div css={item}>
          <Typography color="light" weight={400} size={0.875}>
            {history.memberPlayTime / 60}분 {history.memberPlayTime % 60}초
          </Typography>
          <Typography color="grey" weight={400} size={0.75}>
            탈출 소요 시간
          </Typography>
        </div>
        <div css={item}>
          <Typography color="light" weight={400} size={0.875}>
            {history.hintCount}개
          </Typography>
          <Typography color="grey" weight={400} size={0.75}>
            사용 힌트
          </Typography>
        </div>
        <div css={item}>
          <Typography color="light" weight={400} size={0.875}>
            {history.players}명
          </Typography>
          <Typography color="grey" weight={400} size={0.75}>
            플레이 인원 수
          </Typography>
        </div>
        <div css={item}>
          <Typography color="light" weight={400} size={0.875}>
            {addComma(history.price)}원
          </Typography>
          <Typography color="grey" weight={400} size={0.75}>
            지불 가격
          </Typography>
        </div>
        <div css={item}>
          <DifficultyRange difficulty={history.memberLevel} size="xs" />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '0.25rem',
            }}
          >
            <Typography color="grey" size={0.8125} weight={400}>
              체감 난이도
            </Typography>
            <Icon color="grey" size={1} onClick={(e) => handleShow(e)}>
              <InformationCircleIcon />
            </Icon>
            <Popover
              open={Boolean(levelEl)}
              anchorEl={levelEl}
              onClose={() => handleHide()}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Typography
                color="light"
                size={0.8125}
                weight={400}
                style={{ backgroundColor: '#212121', paddingTop: '0.25rem' }}
              >
                {levelMent[history.memberLevel - 1]}
              </Typography>
            </Popover>
          </div>
        </div>
        <div css={item}>
          <Typography color="light" weight={400} size={0.875}>
            {dayjs(history.date).format('YYYY년 MM월 DD일(ddd) HH:mm')}
          </Typography>
          <Typography color="grey" weight={400} size={0.75}>
            탈출 날짜
          </Typography>
        </div>
      </div>
    </div>
  );
};
