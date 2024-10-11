import React from 'react';
import { useHashtagStore } from '../../../stores/mypageStore';
import { FilterChip } from '../../../components/FilterChip';
import styled from '@emotion/styled';
import { Typography } from '../../../components/Typography';

const HashtagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

const HashtagItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* gap: 0.1rem; */
`;

export const HashtagFetch = () => {
  const { selectedHashtags, toggleHashtag } = useHashtagStore();
  const hashtags = [
    { id: 30, label: '리더쉽' },
    { id: 31, label: '쫄보' },
    { id: 32, label: '공포면역' },
    { id: 33, label: '고수예요' },
    { id: 34, label: '초보예요' },
    { id: 35, label: '활동적이에요' },
    { id: 36, label: '눈치가 빨라요' },
    { id: 37, label: '꼼꼼해요' },
    { id: 38, label: '적극적이에요' },
    { id: 39, label: '분석적이에요' },
    { id: 40, label: '스토리를 좋아해요' },
    { id: 41, label: '분위기 메이커' },
  ];

  return (
    <div>
      <Typography
        color="light"
        size={1}
        weight={400}
        style={{ textAlign: 'center' , marginTop:'40px'}}
      >
        본인의 성향을 선택해주세요!
      </Typography>
      <HashtagGrid>
        {hashtags.map((hashtag) => (
          <HashtagItem key={hashtag.id}>
            <FilterChip
            style={{width:'98px', textAlign:'center'}}
              color="primary"
              size={0.875}
              selected={selectedHashtags.includes(hashtag.id)}
              onHandleClick={() => toggleHashtag(hashtag.id)}
            >
              {hashtag.label}
            </FilterChip>
          </HashtagItem>
        ))}
      </HashtagGrid>
    </div>
  );
};
