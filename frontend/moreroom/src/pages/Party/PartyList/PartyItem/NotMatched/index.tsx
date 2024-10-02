/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import {
  btnContainerCss,
  chipCss,
  containerCss,
  contentCss,
  imgCss,
  timeCss,
  topContentCss,
} from './styles';
import { Chip } from '../../../../../components/Chip';
import { IParty } from '../../../../../types/partyTypes';
import { Typography } from '../../../../../components/Typography';
import { Button } from '../../../../../components/Button';
import { Icon } from '../../../../../components/Icon';
import { ClockIcon } from '@heroicons/react/24/outline';
import { Toggle } from '../../../../../components/Toggle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { delParty, disabledParty } from '../../../../../apis/partyApi';
import { useNavigate } from 'react-router-dom';

interface PartyItemProps {
  party: IParty;
  onDeleteClick: () => void;
}

type Hashtag = {
  hashtagId: number;
  hashtagName: string;
};

export const NotMatched = ({ party, onDeleteClick }: PartyItemProps) => {
  const [isActive, setIsActive] = useState<boolean>(
    party.status.statusName !== 'DISABLED',
  );
  const queryClient = useQueryClient();

  const [isToggled, setIsToggled] = useState<boolean>(
    party.status.statusName !== 'DISABLED',
  );
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const { mutate } = useMutation({
    mutationFn: ({
      partyRequestId,
      disable,
    }: {
      partyRequestId: number;
      disable: boolean;
    }) => disabledParty(partyRequestId, disable),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['party'] });
      setIsToggled((prev) => !prev); // 성공 시 토글 상태 변경
      setIsLoading(false); // 로딩 상태 해제
    },
    onError: (error) => {
      console.error('파티 상태 변경 중 오류 발생:', error);
      setIsLoading(false); // 에러 발생 시에도 로딩 상태 해제
    },
  });

  const handleToggle = () => {
    if (isLoading) return; // 로딩 중일 때 추가 요청 방지

    setIsLoading(true); // 로딩 상태 설정
    mutate({ partyRequestId: party.partyRequestId, disable: isToggled });
  };

  return (
    <div css={containerCss}>
      <div css={topContentCss}>
        <img css={imgCss} src={party.theme.poster} alt="" />
        <div css={contentCss}>
          <div
            style={{
              display: 'flex',
              gap: '0.3rem',
              justifyContent: 'flex-end',
            }}
          >
            <Typography color="light" size={0.8} weight={400}>
              {isActive ? '매칭 중' : '매칭 중지'}
            </Typography>
            <Toggle
              children={'매칭'}
              color="primary"
              size={2.5}
              onToggle={handleToggle}
              isOn={isActive}
            />
          </div>
          <Typography color="light" size={1.2} weight={700}>
            {party.theme.title}
          </Typography>
          <div css={timeCss}>
            <Icon color="primary" size={1}>
              <ClockIcon />
            </Icon>
            <Typography color="grey" scale="500" size={0.8} weight={700}>
              {party.createdAt}
            </Typography>
          </div>
          <div css={chipCss}>
            {party.hashtagList
              ?.filter((hashtag: Hashtag) => hashtag.hashtagId <= 5)
              .map((hashtag: Hashtag) => (
                <Chip
                  key={hashtag.hashtagId}
                  border={1}
                  color="primary"
                  fontSize={0.6}
                  fontWeight={700}
                >
                  {hashtag.hashtagName}
                </Chip>
              ))}
          </div>
        </div>
      </div>
      <div css={btnContainerCss}>
        <Button
          style={{ fontSize: '1rem' }}
          color="danger"
          fullwidth
          rounded={0.5}
          variant="contained"
          handler={onDeleteClick}
        >
          삭제하기
        </Button>
        <Button
          style={{ fontSize: '1rem' }}
          color="primary"
          fullwidth
          rounded={0.5}
          variant="contained"
          handler={() => {}}
        >
          수정하기
        </Button>
      </div>
      {/* {isPending && (
        <Typography color="primary" size={0.8}>
          상태 변경 중...
        </Typography>
      )} */}
      {party.status.statusName === 'DISABLED' && '매칭 중지'}
    </div>
  );
};
