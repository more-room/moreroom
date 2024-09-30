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
import { EditProfile } from './pages/Mypage/EditProfile';
import { EditHashTag } from './pages/Mypage/EditHashTag';
import { ThemeDetail } from './pages/Themes/ThemeDetail';
import { Done } from './pages/Signup/Done';
import { ProfileInfo } from './pages/Signup/ProfileInfo';
import { GenreInfo } from './pages/Signup/GenreInfo';
import { CafeList } from './pages/Cafes/CafeList';
import { CafeDetail } from './pages/Cafes/CafeDetail';
import { ChatingRoom } from './pages/Chating/Chatingroom';
import { Roomdetail } from './pages/Chating/Chatingroom/Roomdetail';
import { HistoryList } from './pages/History/HistoryList';
import { HistoryDetail } from './pages/History/HistoryDetail';
import { HistoryWrite } from './pages/History/HistoryWrite';

import { Review } from './pages/Review/ReviewRead';
import { ReviewWrite } from './pages/Review/ReviewWrite';

function App() {
  const modalStore = useModalStore();

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/themes" element={<ThemeList />} />
        <Route path="/theme/detail" element={<ThemeDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/profileinfo" element={<ProfileInfo />} />
        <Route path="/signup/genreinfo" element={<GenreInfo />} />
        <Route path="/signup/done" element={<Done />} />
        <Route path="/cafes" element={<CafeList />} />
        <Route path="/cafe/detail" element={<CafeDetail />} />
        <Route path="/login" element={<Login />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/profile" element={<Profile />} />
        <Route path="/mypage/profile/edit" element={<EditProfile />} />
        <Route path="/mypage/hashtag/edit" element={<EditHashTag />} />
        <Route path="/chating" element={<Chating />} />
        <Route path="/chatingroom/:partyId" element={<ChatingRoom />} />
        <Route path="/roomdetail/:partyId" element={<Roomdetail />} />

        <Route path="/history" element={<HistoryList />} />
        <Route path="/history/detail/:historyId" element={<HistoryDetail />} />
        <Route path="/history/write" element={<HistoryWrite />} />
        <Route path="/history/edit/:historyId" element={<HistoryWrite />} />
        <Route path="/themes/history" element={<ThemeList />} />

        <Route path="/review" element={<Review/>} />
        <Route path="/review/write" element={<ReviewWrite/>} />


        
      </Routes>
      {modalStore.isOpen && (
        <Modal height={modalStore.height}>{modalStore.contents}</Modal>
      )}
    </>
  );
}

export default App;
