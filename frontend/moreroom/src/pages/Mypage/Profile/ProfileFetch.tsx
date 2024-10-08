/** @jsxImportSource @emotion/react */
import React from 'react';
import { TopBar } from '../../../components/TopBar';
import {
  CakeIcon,
  EnvelopeIcon,
  HashtagIcon,
  KeyIcon,
  Square3Stack3DIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import {
  containerCss,
  userInfoCss,
  manageInfoContainerCss,
  profileCss,
} from './styles';
import { Typography } from '../../../components/Typography';
import { ManageInfo } from '../ManageInfo';
import { Icon } from '../../../components/Icon';
import { useNavigate } from 'react-router-dom';
import { useQueries, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getMyInfo, getMypage } from '../../../apis/mypageApi';
import { Chip } from '../../../components/Chip';
import { getRegions } from '../../../apis/infoApi';

export const ProfileFetch = () => {
  const nav = useNavigate();
  const myInfoQuery = useSuspenseQuery({
    queryKey: ['myinfo'],
    queryFn: async () => await getMyInfo(),
  });

  const [regionQuery, ProfileQuery] = useQueries({
    queries: [
      { queryKey: ['region'], queryFn: async () => await getRegions() },
      { queryKey: ['profile'], queryFn: async () => await getMypage() },
    ],
  });

  if (myInfoQuery.error && !myInfoQuery.isFetching) {
    throw myInfoQuery.error;
  }

  // 지역코드 지역이름이랑 매치시키기
  const matchedRegion =
    myInfoQuery.data && regionQuery.data
      ? regionQuery.data.data.regions.find(
          (region) =>
            region.regionId === myInfoQuery.data.data.regionId ||
            region.cities?.find(
              (city) => city.regionId === myInfoQuery.data.data.regionId,
            ),
        )
      : null;

  const regionName =
    matchedRegion?.regionName ||
    matchedRegion?.cities?.find(
      (city) => city.regionId === myInfoQuery.data?.data.regionId,
    )?.regionName;

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
          backHandler={() => nav('/', { state: { menu: 4 } })}
        />
      </TopBar>
      <div css={containerCss}>
        <img
          css={profileCss}
          src={`/profiles/profile${ProfileQuery.data?.data.photo}.png`}
          alt="프로필 사진"
        />
        <div css={userInfoCss}>
          <Typography color="light" size={1.25} weight={700}>
            {myInfoQuery.data?.data.nickname}
          </Typography>
          <Typography color="grey" scale="500" size={0.75} weight={700}>
            {regionName || 'Unknown Region'}
          </Typography>
        </div>
        <div css={manageInfoContainerCss}>
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <CakeIcon />
              </Icon>
            }
            children={myInfoQuery.data?.data.birth}
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <UserIcon />
              </Icon>
            }
            children={genderhandler(myInfoQuery.data?.data.gender)}
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <EnvelopeIcon />
              </Icon>
            }
            children={myInfoQuery.data?.data.email}
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <KeyIcon />
              </Icon>
            }
            children={myInfoQuery.data?.data.clearRoom + '방'}
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <Square3Stack3DIcon />
              </Icon>
            }
            chips={
              ProfileQuery.data?.data?.genreList &&
              ProfileQuery.data.data.genreList.length > 0
                ? ProfileQuery.data.data.genreList.map((genre: string) => (
                    <Chip key={genre} color="primary" fontSize={0.875}>
                      {genre}
                    </Chip>
                  ))
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
              ProfileQuery.data?.data?.hashtagList &&
              ProfileQuery.data.data.hashtagList.length > 0
                ? ProfileQuery.data.data.hashtagList.map(
                    (hashtag: { hashtagId: number; hashtagName: string }) => (
                      <Chip
                        key={hashtag.hashtagId}
                        color="primary"
                        fontSize={0.875}
                      >
                        {hashtag.hashtagName}
                      </Chip>
                    ),
                  )
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
};
