/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { MainThemeFetch } from './MainThemeFetch';
import { container } from './styles';
import { TopBar } from '../../components/TopBar';
import { MainPartyFetch } from './MainPartyFetch';
import { BottomBar } from '../../components/BottomBar';
import { BellIcon } from '@heroicons/react/24/outline';
import { handleAllowNotification } from '../../utils/notificationUtils';

export const Main = () => {
  return (
    <>
      <div css={container}>
        <TopBar>
          <TopBar.Title type="withoutBack" title="몰룸" />
          <TopBar.Right handler={() => console.log('it"s notification')} />
        </TopBar>
        <ErrorBoundary fallback={<>에러</>}>
          <Suspense fallback={<>로딩중</>}>
            <MainPartyFetch />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<>에러</>}>
          <Suspense fallback={<>로딩중</>}>
            <MainThemeFetch />
          </Suspense>
        </ErrorBoundary>
      </div>
      <BottomBar
        icons={[<BellIcon />, <BellIcon />, <BellIcon />]}
        menus={['메뉴1', '메뉴2', '메뉴3']}
        onHandleChange={() => console.log('menu change')}
      />
    </>
  );
};
