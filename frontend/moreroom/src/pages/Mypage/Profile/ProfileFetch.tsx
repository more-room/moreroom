/** @jsxImportSource @emotion/react */
import React from 'react';
import { TopBar } from '../../../components/TopBar';
import {
  CakeIcon,
  EnvelopeIcon,
  HashtagIcon,
  KeyIcon,
  Square3Stack3DIcon,
  UserCircleIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import {
  containerCss,
  profileCss,
  userInfoCss,
  sectionCss,
  manageInfoContainerCss,
} from './styles';
import { Typography } from '../../../components/Typography';
import { ManageInfo } from '../ManageInfo';
import { Icon } from '../../../components/Icon';
import { useNavigate } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../../apis/mypageApi';
import { useHashtagStore } from '../../../stores/mypageStore';
import { Chip } from '../../../components/Chip';
import { Ihashtags } from '../../../types/mypageTypes';

export const ProfileFetch = () => {
  const nav = useNavigate();
  const { selectedHashtags } = useHashtagStore();
  const hashtags = Ihashtags;
  
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ['profile'],
    queryFn: async () => await getUserInfo(),
  });

  if (error && !isFetching) {
    throw error;
  }

  const genderhandler = (gender: string) => {
    if (gender === 'M') {
      return '남성';
    } else {
      return '여성';
    }
  };

  return (
    <div>
      <TopBar>
        <TopBar.Title
          type="default"
          title="내 정보 관리"
          backHandler={() => nav(-1)}
        />
      </TopBar>
      <div css={containerCss}>
        <UserCircleIcon css={profileCss} />
        <div css={userInfoCss}>
          <Typography color="light" size={1.25} weight={700}>
            {data.data.nickname}
          </Typography>
          <Typography color="grey" scale="500" size={0.75} weight={700}>
            경상북도 구미시
          </Typography>
        </div>
        <div css={manageInfoContainerCss}>
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <CakeIcon />
              </Icon>
            }
            children={data.data.birth}
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <UserIcon />
              </Icon>
            }
            children={genderhandler(data.data.gender)}
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <EnvelopeIcon />
              </Icon>
            }
            children={data.data.email}
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <KeyIcon />
              </Icon>
            }
            children={data.data.clearRoom + '방'}
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <Square3Stack3DIcon />
              </Icon>
            }
            chips={
              data?.data?.genreList && data.data.genreList.length > 0
                ? data.data.genreList.map(
                    (genre: { id: number; name: string }) => (
                      <Chip key={genre.id} color="primary" fontSize={0.875}>
                        {genre.name}
                      </Chip>
                    ),
                  )
                : undefined
            }
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <HashtagIcon />
              </Icon>
            }
            chips={
              selectedHashtags.length > 0
                ? hashtags
                    .filter((tag) => selectedHashtags.includes(tag.id))
                    .map((tag) => (
                      <Chip key={tag.id} color="primary" fontSize={0.875}>
                        {tag.label}
                      </Chip>
                    ))
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
};
