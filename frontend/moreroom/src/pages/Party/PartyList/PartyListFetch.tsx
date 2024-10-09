/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
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
import NoResult from '../../../components/common/NoResult';


export const PartyListFetch = () => {
  const [showDelNotification, setShowDelNotification] =
    useState<boolean>(false);
  const [showMatchingNotification, setshowMatchingNotification] =
    useState<boolean>(false);

  const [currentPartyId, setCurrentPartyId] = useState<number>(0);
  const [currenthemeId, setCurrentthemeId] = useState<number>(0);
  const queryClient = useQueryClient();

  const PartyQuery = useSuspenseQuery({
    queryKey: ['party'],
    queryFn: async () => await getPartyList(),
  });

  console.log(PartyQuery);

  const [uuid, setUuid] = useState<string>('');


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

  const MatchedHandler = (uuid:string, themeId: number) => {
    setUuid(uuid)
    setCurrentthemeId(themeId)
    setshowMatchingNotification(true);
  };

  const handleDeleteClick = (partyId: number) => {
    setCurrentPartyId(partyId);
    setShowDelNotification(true);
  };

  const handleConfirmDelete = () => {
    deleteMutate();
  };

  const { mutate: approveMutate } = useMutation({
    mutationFn: async ({ accept, uuid, themeId }: { accept: boolean; uuid: string, themeId:number }) => 
      await partyApprove(accept, uuid, themeId),
    onSuccess: () => alert('매칭 완료'),
    onError: () => alert('매칭 응답 중 오류가 발생했습니다.'),
  });
  
  const handleMatchingResponse = (accept: boolean, uuid: string, themeId: number) => {
    approveMutate({ accept, uuid, themeId }); // 객체로 전달
    setshowMatchingNotification(false);
    window.location.reload(); // 강제 새로고침했지만 나중에 수정 예정
  };
  

  return (
    <div>
      {PartyQuery.data.data.requestList.length === 0 ? (
        <div style={{ height: '60vh' }}>
          <NoResult msg="현재 파티가 없습니다." />
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
                  handler={() => MatchedHandler(party.uuid, party.theme.themeId)} 
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
          handler={() => handleMatchingResponse(true, uuid, currenthemeId)}
          xhandler={() => setshowMatchingNotification(false)}
          outlinedHandler={() => handleMatchingResponse(false, uuid, currenthemeId)}
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
