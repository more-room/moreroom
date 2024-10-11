/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getMyPartyList } from '../../apis/chatApi';
import { PartyListCard } from './PartyListCard';
import { IParty } from '../../types/chatingTypes';
import { Empty } from './PartyListCard/Empty';

export const MainPartyFetch = () => {
  const partyQuery = useSuspenseQuery({
    queryKey: ['partylist'],
    queryFn: async () => await getMyPartyList(),
  });

  if (partyQuery.error && !partyQuery.isFetching) {
    throw partyQuery.error;
  }

  return (
    <div className="slider-container">
      {partyQuery.data.data.partyList?.length ? (
        <Slider speed={500} slidesToShow={1} slidesToScroll={1} arrows={false}>
          {partyQuery.data.data.partyList?.map((party: IParty) => (
            <PartyListCard party={party} />
          ))}
          <Empty />
        </Slider>
      ) : (
        <Empty />
      )}
    </div>
  );
};
