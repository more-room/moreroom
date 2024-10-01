/** @jsxImportSource @emotion/react */
import React from 'react';
import { containerCss } from './styles';
import { Typography } from '../../../components/Typography';
import { Icon } from '../../../components/Icon';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getPartyList } from '../../../apis/partyApi';
import { IParty } from '../../../types/partyTypes';
import { PartyItem } from './PartyItem';
import { NotMatched } from './PartyItem/NotMatched';
import { Matched } from './PartyItem/Matched';
import { Pending } from './PartyItem/Pending';
import { Disabled } from './PartyItem/Disabled';

export const PartyListFetch = () => {
  const nav = useNavigate();
  const PartyQuery = useSuspenseQuery({
    queryKey: ['party'],
    queryFn: async () => await getPartyList(),
  });

  console.log(PartyQuery.data);

  if (PartyQuery.error && !PartyQuery.isFetching) {
    throw PartyQuery.error;
  }

  return (
    <>
      {PartyQuery?.data.data.requestList.map((party: IParty, partyRequestId: number) => {
        return (
          <>
            {party.status.statusName === "NOT_MATCHED" && <NotMatched key={partyRequestId} party={party} />}
            {party.status.statusName === 'MATCHED' && <Matched key={partyRequestId} party={party} />}
            {party.status.statusName === 'PENDING' && <Pending key={partyRequestId} party={party} />}
            {party.status.statusName === 'DISABLED' && <Disabled key={partyRequestId} party={party} />}
          </>
        );
      })}
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
    </>
  );
}