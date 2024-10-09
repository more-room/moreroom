import React, { useEffect } from 'react';
import './App.css';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
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
import { getQRReview } from './apis/reviewApi';
import { useQueries } from '@tanstack/react-query';
import { getThemeDetail } from './apis/themeApi';
import { getCafeForTheme } from './apis/cafeApi';
import { IThemeItem } from './types/themeTypes';

function App() {
  const modalStore = useModalStore();
  const location = useLocation();
  const nav = useNavigate();
  const themeId = useParams();
  const authRef = /^(\/(auth))(\/.*)?$/;
  const [themeQuery, cafeQuery] = useQueries({
    queries: [
      {
        queryKey: ['theme-detail'],
        queryFn: async () => await getThemeDetail(Number(themeId.themeId)),
        enabled: false,
      },
      {
        queryKey: ['cafe-detail'],
        queryFn: async () => await getCafeForTheme(Number(themeId.themeId)),
        enabled: false,
      },
    ],
  });

  if (!authRef.test(location.pathname)) {
    sessionValidate();
  }

  useEffect(() => {
    if (location.pathname.split('/').includes('api')) {
      getQRReview(Number(themeId.themeId));
      themeQuery.refetch();
      cafeQuery.refetch();

      const themeItem: IThemeItem = {
        themeId: themeQuery.data!.data.theme.themeId,
        poster: themeQuery.data!.data.theme.poster,
        title: themeQuery.data!.data.theme.title,
        playtime: themeQuery.data!.data.theme.playtime,
        genreList: themeQuery.data!.data.theme.genreList,
        review: themeQuery.data!.data.theme.review,
        regionId: cafeQuery.data!.data.regionId,
        cafe: {
          cafeId: cafeQuery.data!.data.cafeId,
          brandName: cafeQuery.data!.data.brandName,
          branchName: cafeQuery.data!.data.branchName,
          cafeName: '',
          address: cafeQuery.data!.data.address,
        },
      };
      nav('/review/write', {
        state: { themeItem },
      });
    } else {
      console.log(location.pathname);
    }
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
      </Routes>
      {modalStore.isOpen && (
        <Modal height={modalStore.height}>{modalStore.contents}</Modal>
      )}
    </>
  );
}

export default App;
