import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ThemeList } from './pages/Themes/ThemeList';
import { Modal } from './components/Modal';
import { useModalStore } from './stores/modalStore';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Main } from './pages/Main';
import { Profile } from './pages/Mypage/Profile';
import { EditProfile } from './pages/Mypage/EditUser/EditProfile';
import { EditHashTag } from './pages/Mypage/EditUser/EditHashTag';
import { ThemeDetail } from './pages/Themes/ThemeDetail';
import { CafeList } from './pages/Cafes/CafeList';
import { CafeDetail } from './pages/Cafes/CafeDetail';
import { ChatingRoom } from './pages/Chating/Chatingroom';
import { Roomdetail } from './pages/Chating/Chatingroom/Roomdetail';
import { HistoryDetail } from './pages/History/HistoryDetail';
import { HistoryWrite } from './pages/History/HistoryWrite';
import { EditPassword } from './pages/Mypage/EditUser/EditPassword';
import { FindPwd } from './pages/Login/FindPwd';
import { PwdDone } from './pages/Login/FindPwd/PwdDone';
import { MyReview } from './pages/Mypage/MyReview';
import { RegisterParty } from './pages/Party/RegisterParty';
import { SectorTheme } from './pages/Party/RegisterParty/SectorTheme';
import { Review } from './pages/Review/ReviewRead';
import { ReviewWrite } from './pages/Review/ReviewWrite';
import { EditParty } from './pages/Party/EditParty';
import { ReviewFix } from './pages/Mypage/MyReview/ReviewFix';
import { sessionValidate } from './apis/authApi';
import { QRReceive } from './pages/QR/QRReceive';
import { onMessage } from 'firebase/messaging';
import { messaging } from './settingFCM';

function App() {
  const modalStore = useModalStore();
  const location = useLocation();
  const authRef = /^(\/(auth))(\/.*)?$/;

  if (!authRef.test(location.pathname)) {
    sessionValidate();
  }

  useEffect(() => {
    // foreground 알림
    onMessage(messaging, (payload) => {
      const notificationTitle = payload.data?.title;
      const notificationOptions: NotificationOptions | undefined = {
        body: payload.data?.body,
      };

      /*console.log(payload.data);
  const partyData = {
    type: payload.data?.type,
    uuid: payload.data?.uuid,
    themeId: Number(payload.data?.themeId),
    partyRequestId: payload.data?.partyRequestId,
  };

  useMatchedStore.getState().setPartyData(partyData);*/

      if (Notification.permission === 'granted') {
        new Notification(notificationTitle!, notificationOptions);
      }
    });
  }, []);

  return (
    <>
      <Routes>
        {/* 사용자 인증/인가 */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/find/password" element={<FindPwd />} />
        <Route path="/auth/find/password/done" element={<PwdDone />} />

        {/* 메인 화면 */}
        <Route path="/" element={<Main />} />

        {/* 테마 */}
        <Route path="/themes" element={<ThemeList />} />
        <Route path="/themes/:themeId" element={<ThemeDetail />} />

        {/* 카페 */}
        <Route path="/cafes" element={<CafeList />} />
        <Route path="/cafes/:cafeId" element={<CafeDetail />} />

        {/* 파티 */}
        <Route path="/party/register" element={<RegisterParty />} />
        <Route path="/party/edit/:partyRequestId" element={<EditParty />} />
        <Route path="/party/addtheme" element={<SectorTheme />} />

        {/* 채팅 */}
        <Route path="/chatingroom/:partyId" element={<ChatingRoom />} />
        <Route path="/roomdetail/:partyId" element={<Roomdetail />} />

        {/* 기록 */}
        <Route path="/history/detail/:historyId" element={<HistoryDetail />} />
        <Route path="/history/write" element={<HistoryWrite />} />
        <Route path="/history/edit/:historyId" element={<HistoryWrite />} />
        <Route path="/themes/history" element={<ThemeList />} />

        {/* 마이페이지 */}
        <Route path="/mypage/profile" element={<Profile />} />
        <Route path="/mypage/profile/edit" element={<EditProfile />} />
        <Route path="/mypage/hashtag/edit" element={<EditHashTag />} />
        <Route path="/mypage/password/edit" element={<EditPassword />} />
        <Route path="/mypage/myreview" element={<MyReview />} />
        <Route path="/mypage/myreview/fix" element={<ReviewFix />} />
        <Route path="/review" element={<Review />} />
        <Route path="/review/write" element={<ReviewWrite />} />

        {/* QR 수신 */}
        <Route
          path="/review/qr-verification/:themeId"
          element={<QRReceive />}
        />
      </Routes>
      {modalStore.isOpen && (
        <Modal height={modalStore.height}>{modalStore.contents}</Modal>
      )}
    </>
  );
}

export default App;
