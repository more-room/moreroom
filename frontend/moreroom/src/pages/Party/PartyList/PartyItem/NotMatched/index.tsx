/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
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
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { Toggle } from '../../../../../components/Toggle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { disabledParty } from '../../../../../apis/partyApi';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../../../../components/Spinner';

interface PartyItemProps {
  party: IParty;
  onDeleteClick: () => void;
}

type Hashtag = {
  hashtagId: number;
  hashtagName: string;
};

export const NotMatched = ({ party, onDeleteClick }: PartyItemProps) => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const [isActive, setIsActive] = useState<boolean>(
    party.status.statusName !== 'DISABLED',
  );
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: ({
      partyRequestId,
      isActive,
    }: {
      partyRequestId: number;
      isActive: boolean;
    }) => disabledParty(partyRequestId, isActive),

    onMutate: async (variables) => {
      setIsLoading(true);

      // Optimistic Updates (잠정적으로 상태를 반영)
      queryClient.setQueryData(
        ['party', variables.partyRequestId],
        (prevData: any) => {
          if (prevData) {
            return {
              ...prevData,
              status: {
                ...prevData.status,
                statusName: variables.isActive ? 'MATCHED' : 'DISABLED',
              },
            };
          }
          return prevData;
        },
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['party'] });
    },

    onError: (error, variables, context) => {
      console.error('파티 상태 변경 중 오류 발생:', error);
    },

    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleToggle = () => {
    if (isLoading) return;

    // Optimistic Updates에 반영할 변수
    mutate({ partyRequestId: party.partyRequestId, isActive: !isActive });
  };
  return (
    <>
      <div css={containerCss}>
        <div css={topContentCss(isLoading)}>
          <img css={imgCss} src={party.theme.poster} alt="" />
          <div css={contentCss}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '0.3rem',
              }}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
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
              {/* {isLoading && (
                <Typography color="primary" size={0.7} weight={400}>
                  매칭 상태 변경 중...
                </Typography>
              )} */}
            </div>
            <Typography color="light" size={1.2} weight={700}>
              {party.theme.title}
            </Typography>
            <div css={timeCss}>
              <Icon color="primary" size={1}>
                <MapPinIcon />
              </Icon>
              <Typography color="grey" scale="500" size={0.8} weight={700}>
                {party.theme.brandName ? `${party.theme.brandName}` : '장소정보 없음'} 
              </Typography>
            </div>
            <div css={timeCss}>
              <Icon color="primary" size={1}>
                <ClockIcon />
              </Icon>
              <Typography color="grey" scale="500" size={0.8} weight={700}>
                {party.createdAt}
              </Typography>
            </div>
            <div css={chipCss}>
              {party.partyHashtagList.map((hashtag: Hashtag) =>
                hashtag.hashtagId <= 5 ? (
                  <Chip
                    key={hashtag.hashtagId}
                    border={1}
                    color="primary"
                    fontSize={0.6}
                    fontWeight={700}
                  >
                    {hashtag.hashtagName}
                  </Chip>
                ) : null,
              )}
            </div>
          </div>
        </div>
        <div css={btnContainerCss(isLoading)}>
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
            handler={() => nav(`/party/edit/${[party.partyRequestId]}`)}
          >
            수정하기
          </Button>
        </div>
        {/* {isActive ? '매칭 중' : '매칭중지'} */}
        {/* {party.status.statusName === 'NOT_MATCHED' ? '매칭중' : '매칭X'} */}
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              top: '35%',
              left: '40%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spinner color="primary" size="sm" />
            <Typography color="primary" size={1} weight={700}>
              상태 변경 중
            </Typography>
          </div>
        )}
      </div>
    </>
  );
};
