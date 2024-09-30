import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ThemeList } from './pages/Themes/ThemeList';
import { Modal } from './components/Modal';
import { useModalStore } from './stores/modalStore';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Chating } from './pages/Chating';
import { Main } from './pages/Main';
import { MyPage } from './pages/Mypage';
import { Profile } from './pages/Mypage/Profile';
import { EditProfile } from './pages/Mypage/EditUser/EditProfile';
import { EditHashTag } from './pages/Mypage/EditUser/EditHashTag';
import { ThemeDetail } from './pages/Themes/ThemeDetail';
import { CafeList } from './pages/Cafes/CafeList';
import { CafeDetail } from './pages/Cafes/CafeDetail';
import { ChatingRoom } from './pages/Chating/Chatingroom';
import { Roomdetail } from './pages/Chating/Chatingroom/Roomdetail';
import { HistoryList } from './pages/History/HistoryList';
import { HistoryDetail } from './pages/History/HistoryDetail';
import { HistoryWrite } from './pages/History/HistoryWrite';
import { EditPassword } from './pages/Mypage/EditUser/EditPassword';
import { FindPwd } from './pages/Login/FindPwd';
import { PwdDone } from './pages/Login/FindPwd/PwdDone';
import { MyReview } from './pages/Mypage/MyReview';
import { Party } from './pages/Party';
import { RegisterParty } from './pages/Party/RegisterParty';
import { SearchTheme } from './pages/Party/RegisterParty/SearchTheme';
import { AddTheme } from './pages/Party/AddTheme';

function App() {
  const modalStore = useModalStore();

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/themes" element={<ThemeList />} />
        <Route path="/theme/detail" element={<ThemeDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cafes" element={<CafeList />} />
        <Route path="/cafe/detail" element={<CafeDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/find/password" element={<FindPwd />} />
        <Route path="/find/password/done" element={<PwdDone />} />

        <Route path="/party" element={<Party />} />
        <Route path="/party/register" element={<RegisterParty />} />
        <Route path="/party/theme" element={<SearchTheme />} />
        <Route path="/party/addtheme" element={<AddTheme />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/profile" element={<Profile />} />
        <Route path="/mypage/profile/edit" element={<EditProfile />} />
        <Route path="/mypage/hashtag/edit" element={<EditHashTag />} />
        <Route path="/mypage/password/edit" element={<EditPassword />} />
        <Route path="/mypage/myreview" element={<MyReview />} />

        <Route path="/chating" element={<Chating />} />
        <Route path="/chatingroom/:partyId" element={<ChatingRoom />} />
        <Route path="/roomdetail/:partyId" element={<Roomdetail />} />

        <Route path="/history" element={<HistoryList />} />
        <Route path="/history/detail/:historyId" element={<HistoryDetail />} />
        <Route path="/history/write" element={<HistoryWrite />} />
        <Route path="/history/edit/:historyId" element={<HistoryWrite />} />
        <Route path="/themes/history" element={<ThemeList />} />
      </Routes>
      {modalStore.isOpen && (
        <Modal height={modalStore.height}>{modalStore.contents}</Modal>
      )}
    </>
  );
}

export default App;
