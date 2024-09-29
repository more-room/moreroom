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
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getMyInfo, getMypage } from '../../../apis/mypageApi';
import { useHashtagStore } from '../../../stores/mypageStore';
import { Chip } from '../../../components/Chip';
import { Ihashtags } from '../../../types/mypageTypes';
import { getRegions } from '../../../apis/infoApi';


export const ProfileFetch = () => {
  const nav = useNavigate();
  
  const { data: myInfoData, error: myInfoError, isFetching: isMyInfoFetching } = useSuspenseQuery({
    queryKey: ['myinfo'],
    queryFn: async () => await getMyInfo(),
  });

  const regionQuery = useQuery({
    queryKey: ['region'],
    queryFn: async () => await getRegions(),
  });

  const ProfileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => await getMypage(),
  });

  // 'myInfoData'와 'regionQuery.data'가 모두 로드된 후에만 region을 찾는 로직을 실행
  const matchedRegion = myInfoData && regionQuery.data
    ? regionQuery.data.data.regions.find(region => 
        region.regionId === myInfoData.data.regionId || 
        region.cities?.find(city => city.regionId === myInfoData.data.regionId)
      )
    : null;

  const regionName = matchedRegion?.regionName ||
    matchedRegion?.cities?.find(city => city.regionId === myInfoData?.data.regionId)?.regionName;

  if (myInfoError && !isMyInfoFetching) {
    throw myInfoError;
  }

  if (ProfileQuery.data) {
    console.log(ProfileQuery);
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
        <img src={ProfileQuery.data?.data.photo} alt="프로필 사진" />
        <div css={userInfoCss}>
          <Typography color="light" size={1.25} weight={700}>
            {myInfoData?.data.nickname}
          </Typography>
          <Typography color="grey" scale="500" size={0.75} weight={700}>
            {regionName || 'Unknown Region'}
          </Typography>
        </div>
        <div css={manageInfoContainerCss}>
          <ManageInfo
            icon={<Icon color="light" size={1.25}><CakeIcon /></Icon>}
            children={myInfoData?.data.birth}
          />
          <ManageInfo
            icon={<Icon color="light" size={1.25}><UserIcon /></Icon>}
            children={genderhandler(myInfoData?.data.gender)}
          />
          <ManageInfo
            icon={<Icon color="light" size={1.25}><EnvelopeIcon /></Icon>}
            children={myInfoData?.data.email}
          />
          <ManageInfo
            icon={<Icon color="light" size={1.25}><KeyIcon /></Icon>}
            children={myInfoData?.data.clearRoom + '방'}
          />
          <ManageInfo
            icon={<Icon color="light" size={1.25}><Square3Stack3DIcon /></Icon>}
            chips={
              ProfileQuery.data?.data?.genreList && ProfileQuery.data.data.genreList.length > 0
                ? ProfileQuery.data.data.genreList.map(
                    (genre: string) => (
                      <Chip key={genre} color="primary" fontSize={0.875}>
                        {genre}
                      </Chip>
                    ),
                  )
                : undefined
            }
          />
          <ManageInfo
            icon={<Icon color="light" size={1.25}><HashtagIcon /></Icon>}
            chips={
              ProfileQuery.data?.data?.hashtagList && ProfileQuery.data.data.hashtagList.length > 0
                ? ProfileQuery.data.data.hashtagList.map(
                    (hashtag: {hashtagId: number, hashtagName: string}) => (
                      <Chip key={hashtag.hashtagId} color="primary" fontSize={0.875}>
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

