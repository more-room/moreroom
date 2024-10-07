/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { MainThemeFetch } from './MainThemeFetch';
import { container } from './styles';
import { TopBar } from '../../components/TopBar';
import { MainPartyFetch } from './MainPartyFetch';
import { BottomBar } from '../../components/BottomBar';
import { BellIcon } from '@heroicons/react/24/outline';
import { handleAllowNotification } from '../../utils/notificationUtils';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';

export const Main = () => {
  return (
    <>
      <div css={container}>
        <TopBar>
          <TopBar.Title type="withoutBack" title="몰룸" />
          <TopBar.Right handler={() => console.log('it"s notification')} />
        </TopBar>
        <ErrorBoundary fallbackRender={Error}>
          <Suspense fallback={<Loading height='50vh'/>}>
            <MainPartyFetch />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallbackRender={Error}>
          <Suspense fallback={<Loading height='50vh'/>}>
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
