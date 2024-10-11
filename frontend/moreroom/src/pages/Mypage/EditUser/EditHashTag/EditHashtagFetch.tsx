/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { TopBar } from '../../../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { useHashtagStore } from '../../../../stores/mypageStore';
import { Typography } from '../../../../components/Typography';
import { FilterChip } from '../../../../components/FilterChip';
import { Button } from '../../../../components/Button';
import { btnCss, hashtagCss } from './styles';
import { Ihashtags } from '../../../../types/mypageTypes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMypage, updateHashtag } from '../../../../apis/mypageApi';
import { IHashtag } from '../../../../types/partyTypes';

export const EditHashTagFetch = () => {
  const nav = useNavigate();
  const { selectedHashtags, setHashtags, toggleHashtag } = useHashtagStore();

  const ProfileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => await getMypage(),
  });

  // API 응답이 있을 때 초기 선택 해시태그를 설정합니다.
  useEffect(() => {
    if (ProfileQuery.data) {
      const hashtagList = ProfileQuery.data.data.hashtagList; // API 응답에서 해시태그 리스트 가져오기
      const initialSelectedHashtags = hashtagList.map(
        (tag: IHashtag) => tag.hashtagId,
      ); // 해시태그 ID 추출
      console.log('최초해시태그', initialSelectedHashtags);
      setHashtags(initialSelectedHashtags); // 초기 해시태그 설정
    }
  }, [ProfileQuery.data, setHashtags]);

  const { mutate } = useMutation({
    mutationFn: async (hashtaglist: number[]) =>
      await updateHashtag(hashtaglist),
    onSuccess: () => {
      console.log('변경 성공');
      nav('/', { state: { menu: 4 } });
    },
    onError: () => {
      alert('오류가 발생하였습니다.');
    },
  });
  console.log('실제 선택된 아이', selectedHashtags);
  const edithandler = () => {
    mutate(selectedHashtags); // 현재 선택된 해시태그를 사용하여 업데이트
  };

  return (
    <div>
      <TopBar>
        <TopBar.Title
          type="default"
          title="해시태그 편집"
          backHandler={() => nav('/', { state: { menu: 4 } })}
        />
      </TopBar>
      <div>
        <Typography
          color="light"
          size={1}
          weight={400}
          style={{ textAlign: 'center', marginTop: '40px' }}
        >
          본인의 성향을 선택해주세요!
        </Typography>
        <div css={hashtagCss}>
          {Ihashtags.map((hashtag) => (
            <div key={hashtag.id}>
              <FilterChip
                style={{ width: '98px', textAlign: 'center' }}
                color="primary"
                size={0.875}
                selected={selectedHashtags.includes(hashtag.id)}
                onHandleClick={() => toggleHashtag(hashtag.id)} // 해시태그 클릭 시 toggleHashtag 호출
              >
                {hashtag.label}
              </FilterChip>
            </div>
          ))}
        </div>
        <div css={btnCss}>
          <Button rounded={0.5} handler={edithandler} fullwidth>
            적용하기
          </Button>
        </div>
      </div>
    </div>
  );
};
