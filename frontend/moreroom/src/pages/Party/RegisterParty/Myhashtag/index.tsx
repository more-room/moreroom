/** @jsxImportSource @emotion/react */
import { Typography } from '../../../../components/Typography';
import React from 'react';
import { myHashtags } from '../../../../types/partyTypes';
import { FilterChip } from '../../../../components/FilterChip';

export const Myhashtag = () => {
  return (
    <div>
      <Typography color="light" size={1} weight={500}>
        희망하는 파티의 성향을 선택해주세요!
      </Typography>
      <div >
          {myHashtags.map((hashtag) => (
            <div key={hashtag.id}>
              <FilterChip
                style={{ width: '98px', textAlign: 'center' }}
                color="primary"
                size={0.875}
                onHandleClick={()=>{}}
                // selected={selectedHashtags.includes(hashtag.id)}
                // onHandleClick={() => toggleHashtag(hashtag.id)}
              >
                {hashtag.label}
              </FilterChip>
            </div>
          ))}
        </div>
    </div>
  );
};
