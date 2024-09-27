/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Typography } from '../../../../components/Typography';
import { container, item, row } from './styles';
import { IHistoryWrite, typeToKor } from '../../../../types/historyTypes';
import { addComma } from '../../../../utils/priceUtils';
import { DifficultyRange } from '../../../../components/DifficultyRange';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { Popover } from '@mui/material';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Icon } from '../../../../components/Icon';
import { levelMent } from '../../../../types/themeTypes';
import { FilterChip } from '../../../../components/FilterChip';
import { useModal } from '../../../../hooks/useModal';
import { HistoryTypes } from '../../../../modals/history/HistoryType';
import { useHistoryWriteStore } from '../../../../stores/historyStore';

dayjs('ko');

export const HistoryInfo = () => {
  const modal = useModal();
  const historyWriteStore = useHistoryWriteStore();
  const [levelEl, setLevelEl] = useState<HTMLDivElement | null>(null);

  const handleShow = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => setLevelEl(() => e.currentTarget);
  const handleHide = () => setLevelEl(() => null);

  const getSelected = (type: keyof IHistoryWrite) => {
    if (type === 'successFlag') {
      if (!Object.keys(historyWriteStore).includes('successFlag')) return false;
      else return true;
    } else {
      if (historyWriteStore[type]) return true;
      else return false;
    }
  };
  const getText = (type: keyof IHistoryWrite) => {
    let str = '';

    if (getSelected(type)) {
      if (type === 'memberPlayTime') {
        str =
          Math.floor(historyWriteStore.memberPlayTime! / 60) +
          '분 ' +
          (historyWriteStore.memberPlayTime! % 60) +
          '초';
      } else if (type === 'hintCount') {
        str = historyWriteStore.hintCount + '개';
      } else if (type === 'players') {
        str = historyWriteStore.players + '명';
      } else if (type === 'price') {
        str = addComma(historyWriteStore.price!) + '원';
      } else if (type === 'date') {
        str = dayjs(historyWriteStore.date).format('YYYY년 MM월 DD일 HH:mm');
      } else if (type === 'successFlag') {
        str = historyWriteStore.successFlag ? '성공' : '실패';
      }
      return str;
    } else {
      return typeToKor[type];
    }
  };

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
        <div css={row}>
          <div css={item}>
            <FilterChip
              size={0.75}
              rounded={true}
              selected={Object.keys(historyWriteStore).includes('successFlag')}
              onHandleClick={() =>
                modal.show(<HistoryTypes type="successFlag" />)
              }
              color={historyWriteStore.successFlag ? 'secondary' : 'danger'}
            >
              {getText('successFlag')}
            </FilterChip>
            <Typography color="grey" weight={400} size={0.75}>
              성공 여부
            </Typography>
          </div>
          <div css={item}>
            <FilterChip
              size={0.75}
              rounded={true}
              selected={getSelected('memberPlayTime')}
              onHandleClick={() =>
                modal.show(<HistoryTypes type="memberPlayTime" />)
              }
            >
              {getText('memberPlayTime')}
            </FilterChip>
            <Typography color="grey" weight={400} size={0.75}>
              탈출 소요 시간
            </Typography>
          </div>
          <div css={item}>
            <FilterChip
              size={0.75}
              rounded={true}
              selected={getSelected('hintCount')}
              onHandleClick={() =>
                modal.show(<HistoryTypes type="hintCount" />)
              }
            >
              {getText('hintCount')}
            </FilterChip>
            <Typography color="grey" weight={400} size={0.75}>
              사용 힌트
            </Typography>
          </div>
        </div>
        <div css={row}>
          <div css={item}>
            <FilterChip
              size={0.75}
              rounded={true}
              selected={getSelected('players')}
              onHandleClick={() => modal.show(<HistoryTypes type="players" />)}
            >
              {getText('players')}
            </FilterChip>
            <Typography color="grey" weight={400} size={0.75}>
              플레이 인원 수
            </Typography>
          </div>
          <div css={item}>
            <FilterChip
              size={0.75}
              rounded={true}
              selected={getSelected('price')}
              onHandleClick={() => modal.show(<HistoryTypes type="price" />)}
            >
              {getText('price')}
            </FilterChip>
            <Typography color="grey" weight={400} size={0.75}>
              지불 가격
            </Typography>
          </div>
          <div css={item}>
            <DifficultyRange
              difficulty={historyWriteStore.memberLevel}
              size="xs"
              onClick={() => modal.show(<HistoryTypes type="memberLevel" />)}
            />
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
                  {
                    levelMent[
                      historyWriteStore.memberLevel
                        ? historyWriteStore.memberLevel - 1
                        : 1
                    ]
                  }
                </Typography>
              </Popover>
            </div>
          </div>
        </div>

        <div css={item}>
          <FilterChip
            size={0.75}
            rounded={true}
            selected={getSelected('date')}
            onHandleClick={() => modal.show(<HistoryTypes type="date" />)}
          >
            {getText('date')}
          </FilterChip>
          <Typography color="grey" weight={400} size={0.75}>
            탈출 날짜
          </Typography>
        </div>
      </div>
    </div>
  );
};
