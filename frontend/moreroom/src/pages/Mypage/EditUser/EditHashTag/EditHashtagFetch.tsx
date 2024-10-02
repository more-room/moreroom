/** @jsxImportSource @emotion/react */
import React from 'react';
import { TopBar } from '../../../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { useHashtagStore } from '../../../../stores/mypageStore';
import { Typography } from '../../../../components/Typography';
import { FilterChip } from '../../../../components/FilterChip';
import { Button } from '../../../../components/Button';
import { btnCss, hashtagCss, hashtagItemCss } from './styles';
import { Ihashtags } from '../../../../types/mypageTypes';
import { useMutation } from '@tanstack/react-query';
import { updateHashtag } from '../../../../apis/mypageApi';

export const EditHashTagFetch = () => {
  const nav = useNavigate();
  const { selectedHashtags, toggleHashtag } = useHashtagStore();
  const hashtags = Ihashtags;
  const { mutate } = useMutation({
    mutationFn: async (hashtaglist: number[]) =>
      await updateHashtag(hashtaglist),
    onSuccess: () => {
      console.log('변경 성공');
      nav('/mypage');
    },
    onError: () => {
      alert('오류가 발생하였습니다.');
    },
  });

  const edithandler = (selectedHashtags: number[]) => {
    mutate(selectedHashtags);
    nav('/mypage');
  };

  return (
    <div>
      <TopBar>
        <TopBar.Title
          type="default"
          title="해시태그 편집"
          backHandler={() => nav(-1)}
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
          {hashtags.map((hashtag) => (
            <div css={hashtagItemCss} key={hashtag.id}>
              <FilterChip
                style={{ width: '98px', textAlign: 'center' }}
                color="primary"
                size={0.875}
                selected={selectedHashtags.includes(hashtag.id)}
                onHandleClick={() => toggleHashtag(hashtag.id)}
              >
                {hashtag.label}
              </FilterChip>
            </div>
          ))}
        </div>
        <div css={btnCss}>
          <Button
            rounded={0.5}
            handler={() => edithandler(selectedHashtags)}
            fullwidth
          >
            적용하기
          </Button>
        </div>
      </div>
    </div>
  );
};
