/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
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
  const [showDelNotification, setShowDelNotification] = useState(false);
  const [showMatchingNotification, setshowMatchingNotification] =
    useState(false);
  const [currentPartyId, setCurrentPartyId] = useState<number>(0);
  const queryClient = useQueryClient();

  const PartyQuery = useSuspenseQuery({
    queryKey: ['party'],
    queryFn: async () => await getPartyList(),
  });
  
  console.log(PartyQuery)

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
        (party: IParty) => {
          return (
            <>
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
            </>
          );
        },
      )}
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
          xhandler={() => setshowMatchingNotification(false)}
          outlinedHandler={()=>{}}
          xbtn
          ment="파티 매칭을 수락하시겠습니까?"
          children={['수락하기', '거절하기']}
          twoBtn
          type="confirm"
        />
      )}
    </>
  );
};
