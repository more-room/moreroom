/** @jsxImportSource @emotion/react */
import React, { ReactNode, Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { MainThemeFetch } from './MainThemeFetch';
import { container, menuicons } from './styles';
import { TopBar } from '../../components/TopBar';
import { MainPartyFetch } from './MainPartyFetch';
import { BottomBar } from '../../components/BottomBar';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleAllowNotification } from '../../utils/notificationUtils';
import {
  ChatBubbleBottomCenterTextIcon,
  HomeIcon,
  QueueListIcon,
  UsersIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { PartyList } from '../Party/PartyList';
import { Party } from '../Party';
import { Chating } from '../Chating';
import { HistoryList } from '../History/HistoryList';
import { MyPage } from '../Mypage';
import { HomeModernIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { Icon } from '../../components/Icon';

const menus: string[] = ['파티', '채팅', '홈', '기록', '내정보'];
const icons: ReactNode[] = [
  <UsersIcon />,
  <ChatBubbleBottomCenterTextIcon />,
  <HomeIcon />,
  <QueueListIcon />,
  <UserIcon />,
];

export const Main = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [curMenu, setCurMenu] = useState<number>(2);

  useEffect(() => {
    if (location.state) {
      if (location.state.token) {
        handleAllowNotification();
      } else if (location.state.menu !== undefined) {
        setCurMenu(location.state.menu);
      }
    }
  }, [location.state]);

  return (
    <>
      <div css={container}>
        <TopBar>
          <TopBar.Title type="withoutBack" title={menus[curMenu]} />
          <div css={menuicons}>
            <Icon color="light" size={1.5} onClick={() => nav('/themes')}>
              <Squares2X2Icon />
            </Icon>
            <Icon color="light" size={1.5} onClick={() => nav('/cafes')}>
              <HomeModernIcon />
            </Icon>
          </div>
        </TopBar>
        <ErrorBoundary fallbackRender={(props) => <Error {...props} />}>
          <Suspense fallback={<Loading height="50vh" />}>
            {curMenu === 0 && <Party />}
            {curMenu === 1 && <Chating />}
            {curMenu === 2 && (
              <>
                <MainPartyFetch />
                <MainThemeFetch />
              </>
            )}
            {curMenu === 3 && <HistoryList />}
            {curMenu === 4 && <MyPage />}
          </Suspense>
        </ErrorBoundary>
      </div>
      <BottomBar
        icons={icons}
        menus={menus}
        defaultSelect={curMenu}
        onHandleChange={(menu: number) => setCurMenu(menu)}
      />
    </>
  );
};
