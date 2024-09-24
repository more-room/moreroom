/** @jsxImportSource @emotion/react */
import React from 'react';
import { TopBar } from '../../components/TopBar';
import {
  ArchiveBoxXMarkIcon,
  ArrowRightStartOnRectangleIcon,
  HashtagIcon,
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
import { Chip } from '../../components/Chip';
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
export const MyPage = () => {
  const nav = useNavigate();
  return (
    <div>
      <TopBar>
        <TopBar.Title
          type="default"
          title="마이페이지"
          backHandler={() => nav(-1)}
        />
      </TopBar>
      <div css={profileContainer}>
        <UserCircleIcon css={profile} />
        <div>
          <Typography
            style={{ marginBottom: '0.5rem' }}
            color="light"
            size={1.5}
            weight={600}
          >
            D206탈출왕
          </Typography>
          <div css={ChipCss}>
            <Chip border={1} color="primary" fontSize={0.625} fontWeight={500}>
              10방
            </Chip>
            <Chip
              border={1}
              color="primary"
              fontSize={0.625}
              fontWeight={500}
              css={ChipCss}
            >
              구미시
            </Chip>
            <Chip
              border={1}
              color="primary"
              fontSize={0.625}
              fontWeight={500}
              css={ChipCss}
            >
              스토리
            </Chip>
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
            url="/mypage/profile"
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <CalendarDaysIcon />
              </Icon>
            }
            children="테마 기록"
            url="/mypage/profile"
          />
          <div css={manageInfoContainerCss}>
            <ManageInfo
              icon={
                <Icon color="light" size={1.25}>
                  <PencilIcon />
                </Icon>
              }
              children="내가 쓴 리뷰"
              url="/mypage/profile"
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
        </div>
        <div css={sectionCss}>
          <div css={lineCss}></div>
          <Typography color="grey" scale="400" size={0.875} weight={500}>
            기타
          </Typography>
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <ArrowRightStartOnRectangleIcon />
              </Icon>
            }
            children="로그아웃"
            url="/mypage/profile"
          />
          <ManageInfo
            icon={
              <Icon color="light" size={1.25}>
                <ArchiveBoxXMarkIcon />
              </Icon>
            }
            children="회원 탈퇴"
            url="/mypage/profile"
          />
        </div>
      </div>
    </div>
  );
};
