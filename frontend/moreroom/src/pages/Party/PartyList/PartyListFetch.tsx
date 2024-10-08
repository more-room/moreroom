/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { delParty, getPartyList, partyApprove } from '../../../apis/partyApi';
import { IParty } from '../../../types/partyTypes';
import { NotMatched } from './PartyItem/NotMatched';
import { Matched } from './PartyItem/Matched';
import { Pending } from './PartyItem/Pending';
import { Notification } from '../../../components/Notification';
import { containerCss } from './styles';
import NoResult from '../../../components/common/NoResult';
import { useMatchedStore } from '../../../stores/partyStore';

export const PartyListFetch = () => {
  const [showDelNotification, setShowDelNotification] =
    useState<boolean>(false);
  const [showMatchingNotification, setshowMatchingNotification] =
    useState<boolean>(false);

  const { uuid, themeId } = useMatchedStore();

  const [currentPartyId, setCurrentPartyId] = useState<number>(0);
  const queryClient = useQueryClient();

  const PartyQuery = useSuspenseQuery({
    queryKey: ['party'],
    queryFn: async () => await getPartyList(),
  });

  console.log(PartyQuery);

  const { mutate: deleteMutate } = useMutation({
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
    deleteMutate();
  };

  const { mutate: approveMutate } = useMutation({
    mutationFn: async (accept: boolean) =>
      await partyApprove(accept, uuid, Number(themeId)),
    onSuccess: () => alert('매칭 완료'),
    onError: () => alert('매칭 응답 중 오류가 발생했습니다.'),
  });

  if (PartyQuery.error && !PartyQuery.isFetching) {
    throw PartyQuery.error;
  }

  const handleMatchingResponse = (accept: boolean) => {
    approveMutate(accept);
  };

  return (
    <div>
      {PartyQuery.data.data.requestList.length === 0 ? (
        <div style={{ height: '60vh' }}>
          <NoResult msg="현재 파티가 없습니다." />{' '}
        </div>
      ) : (
        PartyQuery.data.data.requestList.map((party: IParty) => {
          return (
            <div>
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
            </div>
          );
        })
      )}
      {/* {PartyQuery?.data.data.requestList.map(
        (party: IParty) => {
          return (
            <div>
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
            </div>
          );
        },
      )} */}
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
          handler={() => handleMatchingResponse(true)}
          xhandler={() => setshowMatchingNotification(false)}
          outlinedHandler={() => handleMatchingResponse(false)}
          xbtn
          ment="파티 매칭을 수락하시겠습니까?"
          children={['수락하기', '거절하기']}
          twoBtn
          type="confirm"
        />
      )}
    </div>
  );
};
