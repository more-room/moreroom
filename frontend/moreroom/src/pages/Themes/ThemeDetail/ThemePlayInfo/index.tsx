/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { IThemeDetailItem, levelMent } from '../../../../types/themeTypes';
import { container, item, row } from './styles';
import { Typography } from '../../../../components/Typography';
import { DifficultyRange } from '../../../../components/DifficultyRange';
import { Icon } from '../../../../components/Icon';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Popover } from '@mui/material';

interface ThemePlayInfo {
  theme: IThemeDetailItem;
}

export const ThemePlayInfo = ({ theme }: ThemePlayInfo) => {
  const [levelEl, setLevelEl] = useState<(HTMLDivElement | null)[]>([]);

  const handleShow = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    idx: number,
  ) => {
    setLevelEl((prev) => {
      const newEls = [...prev];
      newEls[idx] = e.currentTarget;
      return newEls;
    });
  };

  const handleHide = (idx: number) => {
    setLevelEl((prev) => {
      const newEls = [...prev];
      newEls[idx] = null;
      return newEls;
    });
  };

  return (
    <div css={container}>
      <div css={row}>
        <div css={item}>
          <Typography color="light" size={0.875} weight={400}>
            {theme.genreList.join(', ')}
          </Typography>
          <Typography color="grey" size={0.8125} weight={400}>
            장르
          </Typography>
        </div>
        <div css={item}>
          <Typography color="light" size={0.875} weight={400}>
            {theme.minPeople} ~ {theme.maxPeople}명
          </Typography>
          <Typography color="grey" size={0.8125} weight={400}>
            추천 인원
          </Typography>
        </div>
        <div css={item}>
          <Typography color="light" size={0.875} weight={400}>
            {theme.playtime}분
          </Typography>
          <Typography color="grey" size={0.8125} weight={400}>
            플레이 타임
          </Typography>
        </div>
      </div>
      <div css={row}>
        <div css={item}>
          <DifficultyRange difficulty={theme.level} size="xs" />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '0.25rem',
            }}
            onClick={(e) => console.log(e)}
          >
            <Typography color="grey" size={0.8125} weight={400}>
              매장 난이도
            </Typography>
            <Icon color="grey" size={1} onClick={(e) => handleShow(e, 0)}>
              <InformationCircleIcon />
            </Icon>
            <Popover
              open={Boolean(levelEl[0])}
              anchorEl={levelEl[0]}
              onClose={() => handleHide(0)}
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
                {levelMent[theme.level - 1]}
              </Typography>
            </Popover>
          </div>
        </div>
        <div css={item}>
          <DifficultyRange difficulty={theme.memberLevel} size="xs" />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '0.25rem',
            }}
            onClick={(e) => console.log(e)}
          >
            <Typography color="grey" size={0.8125} weight={400}>
              체감 난이도
            </Typography>
            <Icon color="grey" size={1} onClick={(e) => handleShow(e, 1)}>
              <InformationCircleIcon />
            </Icon>
            <Popover
              open={Boolean(levelEl[1])}
              anchorEl={levelEl[1]}
              onClose={() => handleHide(1)}
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
                {levelMent[theme.memberLevel - 1]}
              </Typography>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};
