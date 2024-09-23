/** @jsxImportSource @emotion/react */
import React from 'react';
import { TopBar } from '../../../../components/TopBar';
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
import { Typography } from '../../../../components/Typography';
import { ManageInfo } from '../ManageInfo';
import { Icon } from '../../../../components/Icon';
import { useNavigate } from 'react-router-dom';
import { useQueries, useSuspenseQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../../../apis/mypageApi';

export const Profile = () => {
  // const userProfileStore = use
  const nav = useNavigate();
  const { data, error, isFetching } = useSuspenseQuery({
    // 객체 구조 분해 할당
    queryKey: ['profile'],
    queryFn: async () => await getUserInfo(),
  });

  if (isFetching) {
    return <div>Loading...</div>; // 데이터 로딩 중 표시
  }

  if (error) {
    return <div>Error: {error.message}</div>; // 에러 발생 시 표시
  }
  const genreNames = data?.data?.genreList?.map(
    (genre: { id: number; name: string }) => genre.name,
  );

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
            children={data.data.clearRoom}
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <Square3Stack3DIcon />
              </Icon>
            }
            children={genreNames}
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <HashtagIcon />
              </Icon>
            }
            children="해시 태그"
          />
        </div>
      </div>
    </div>
  );
};
