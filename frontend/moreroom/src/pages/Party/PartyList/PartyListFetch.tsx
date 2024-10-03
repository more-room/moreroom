/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { containerCss } from './styles';
import { Typography } from '../../../components/Typography';
import { Icon } from '../../../components/Icon';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { delParty, getPartyList } from '../../../apis/partyApi';
import { IParty } from '../../../types/partyTypes';
import { NotMatched } from './PartyItem/NotMatched';
import { Matched } from './PartyItem/Matched';
import { Pending } from './PartyItem/Pending';
import { Notification } from '../../../components/Notification';

export const PartyListFetch = () => {
  const nav = useNavigate();
  const [showDelNotification, setShowDelNotification] = useState(false);
  const [showMatchingNotification, setshowMatchingNotification] =
    useState(false);
  const [currentPartyId, setCurrentPartyId] = useState<number>(0);
  const queryClient = useQueryClient();

  const PartyQuery = useSuspenseQuery({
    queryKey: ['party'],
    queryFn: async () => await getPartyList(),
  });

  const { mutate } = useMutation({
    mutationFn: async () => await delParty(currentPartyId),
    onSuccess: () => {
      queryClient.setQueryData(['party'], (oldData: any) => ({
        ...oldData,
        data: {
          ...oldData.data,
          requestList: oldData.data.requestList.filter(
            (party: IParty) => party.partyRequestId !== currentPartyId,
          ),
        },
      }));
      setShowDelNotification(false);
    },
    onError: () => alert('오류 발생'),
  });

  if (PartyQuery.error && !PartyQuery.isFetching) {
    throw PartyQuery.error;
  }

  const handleDeleteClick = (partyId: number) => {
    setCurrentPartyId(partyId);
    setShowDelNotification(true);
  };

  const handleConfirmDelete = () => {
    mutate();
  };

  return (
    <>
      {PartyQuery?.data.data.requestList.map(
        (party: IParty, partyRequestId: number) => {
          return (
            <React.Fragment key={partyRequestId}>
              {party.status.statusName === 'NOT_MATCHED' && (
                <NotMatched
                  party={party}
                  onDeleteClick={() => handleDeleteClick(party.partyRequestId)}
                />
              )}
              {party.status.statusName === 'MATCHED' && (
                <Matched
                  party={party}
                  handler={() => setshowMatchingNotification(true)}
                />
              )}
              {party.status.statusName === 'PENDING' && (
                <Pending party={party} />
              )}
              {party.status.statusName === 'DISABLED' && (
                <NotMatched
                  party={party}
                  onDeleteClick={() => handleDeleteClick(party.partyRequestId)}
                />
              )}
            </React.Fragment>
          );
        },
      )}
      <div
        css={containerCss}
        onClick={() => {
          nav('/party/register');
        }}
      >
        <Icon color="grey" scale="500" size={1.875}>
          <PlusIcon />
        </Icon>
        <Typography color="light" size={1} weight={500}>
          파티를 등록해주세요
        </Typography>
      </div>

      {showDelNotification && (
        <Notification
          handler={handleConfirmDelete}
          outlinedHandler={() => setShowDelNotification(false)}
          ment="정말 삭제하시겠습니까?"
          twoBtn
          type="confirm"
        />
      )}
      {showMatchingNotification && (
        <Notification
          handler={() => {}}
          outlinedHandler={() => setshowMatchingNotification(false)}
          ment="파티 매칭을 수락하시겠습니까?"
          children={['수락하기', '거절하기']}
          twoBtn
          type="confirm"
        />
      )}
    </>
  );
};
