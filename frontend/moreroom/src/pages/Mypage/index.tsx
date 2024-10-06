/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { TopBar } from '../../components/TopBar';
import {
  ArchiveBoxXMarkIcon,
  ArrowRightStartOnRectangleIcon,
  HashtagIcon,
  KeyIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import {
  ChipCss,
  containerCss,
  lineCss,
  manageInfoContainerCss,
  profile,
  profileContainer,
  sectionCss,
} from './styles';
import { Typography } from '../../components/Typography';
import { ManageInfo } from './ManageInfo';
import { UserIcon } from '@heroicons/react/24/solid';
import { Icon } from '../../components/Icon';
import {
  PencilIcon,
  CalendarDaysIcon,
  TicketIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { UserLogout } from '../../apis/loginApi';
import { delUser } from '../../apis/authApi';
import { useQuery } from '@tanstack/react-query';
import { getMypage } from '../../apis/mypageApi';
import { useSignUpStore } from '../../stores/signupStore';
import { Notification } from '../../components/Notification';
export const MyPage = () => {
  const nav = useNavigate();
  const [showLogoutNotification, setShowLogoutNotification] =
    useState<boolean>(false);
  const [showDelNotification, setShowDelNotification] =
    useState<boolean>(false);
  const handleLogout = async () => {
    await UserLogout();
    setShowLogoutNotification(false);
    nav('/login');
  };

  const handledelete = async () => {
    await delUser();
    setShowDelNotification(false);
    nav('/login');
  };

  const ProfileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => await getMypage(),
  });

  console.log(ProfileQuery.data);

  return (
    <div>
      {showLogoutNotification && (
        <Notification
          handler={handleLogout}
          outlinedHandler={() => setShowLogoutNotification(false)}
          ment="로그아웃 하시겠습니까?"
          children={['로그아웃하기', '취소하기']}
          twoBtn
          type="confirm"
        />
      )}
      {showDelNotification && (
        <Notification
          handler={handledelete}
          outlinedHandler={() => setShowDelNotification(false)}
          ment="회원탈퇴 하시겠습니까?"
          children={['탈퇴하기', '취소하기']}
          twoBtn
          type="confirm"
        />
      )}
      <TopBar>
        <TopBar.Title
          type="default"
          title="마이페이지"
          backHandler={() => nav(-1)}
        />
      </TopBar>
      <div css={profileContainer}>
        {/* <UserCircleIcon css={profile} /> */}
        <img
          css={profile}
          src={ProfileQuery.data?.data.photo}
          alt="프로필 사진"
        />
        <div>
          <Typography
            style={{ marginBottom: '0.5rem' }}
            color="light"
            size={1.5}
            weight={600}
          >
            {ProfileQuery.data?.data.nickname}
          </Typography>
          <div css={ChipCss}>
            {/* <Chip border={1} color="primary" fontSize={0.625} fontWeight={500}>
              10방
            </Chip> */}
          </div>
        </div>
      </div>
      <div css={containerCss}>
        <div css={sectionCss}>
          <div css={lineCss}></div>
          <Typography color="grey" scale="400" size={0.875} weight={500}>
            방탈출 설정
          </Typography>
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <TicketIcon />
              </Icon>
            }
            children="파티"
            url="/party"
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <ChatBubbleLeftRightIcon />
              </Icon>
            }
            children="채팅방"
            url="/chating"
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <CalendarDaysIcon />
              </Icon>
            }
            children="테마 기록"
            url="/history"
          />
          <div css={manageInfoContainerCss}>
            <ManageInfo
              icon={
                <Icon color="light" size={1.25}>
                  <PencilIcon />
                </Icon>
              }
              children="내가 쓴 리뷰"
              url="/mypage/myreview"
            />
          </div>
        </div>
        <div css={sectionCss}>
          <div css={lineCss}></div>
          <Typography color="grey" scale="400" size={0.875} weight={500}>
            사용자 설정
          </Typography>
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <HashtagIcon />
              </Icon>
            }
            children="해시태그 편집"
            url="/mypage/hashtag/edit"
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <UserIcon />
              </Icon>
            }
            children="내 정보 관리"
            url="/mypage/profile"
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <UserCircleIcon />
              </Icon>
            }
            children="프로필 편집"
            url="/mypage/profile/edit"
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <KeyIcon />
              </Icon>
            }
            children="비밀번호 변경"
            url="/mypage/password/edit"
          />
        </div>
        <div css={sectionCss}>
          <div css={lineCss}></div>
          <Typography color="grey" scale="400" size={0.875} weight={500}>
            기타
          </Typography>
          {/* <Notification
            handler={() => {}}
            ment="정말 로그아웃 하시겠습니까?"
            type="confirm"
          /> */}
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <ArrowRightStartOnRectangleIcon />
              </Icon>
            }
            children="로그아웃"
            onApi={() => setShowLogoutNotification(true)}
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <ArchiveBoxXMarkIcon />
              </Icon>
            }
            children="회원 탈퇴"
            onApi={() => {
              setShowDelNotification(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};
