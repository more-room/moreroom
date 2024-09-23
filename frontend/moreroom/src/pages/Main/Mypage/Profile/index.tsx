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

export const Profile = () => {
  const nav = useNavigate();
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
            닉네임
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
            children="2024년 09월 23일"
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <UserIcon />
              </Icon>
            }
            children="남성"
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <EnvelopeIcon />
              </Icon>
            }
            children="abc@mail.com"
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <KeyIcon />
              </Icon>
            }
            children="0방"
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <Square3Stack3DIcon />
              </Icon>
            }
            children="스릴러"
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
