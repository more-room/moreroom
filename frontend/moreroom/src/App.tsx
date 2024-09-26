import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ThemeList } from './pages/Themes/ThemeList';
import { Modal } from './components/Modal';
import { useModalStore } from './stores/modalStore';
import { Login } from './pages/Login';
import { Chating } from './pages/Chating';
import { Main } from './pages/Main';
import { MyPage } from './pages/Mypage';
import { Profile } from './pages/Mypage/Profile';
import { EditProfile } from './pages/Mypage/EditProfile';
import { EditHashTag } from './pages/Mypage/EditHashTag';
import { ThemeDetail } from './pages/Themes/ThemeDetail';
import { ChatingRoom } from './pages/Chating/Chatingroom';
import { Roomdetail } from './pages/Chating/Chatingroom/Roomdetail'

function App() {
  const modalStore = useModalStore();

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/themes" element={<ThemeList />} />
        <Route path="/theme/detail" element={<ThemeDetail />} />
        <Route path="/login" element={<Login />} />
    

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/profile" element={<Profile />} />
        <Route path="/mypage/profile/edit" element={<EditProfile />} />
        <Route path="/mypage/hashtag/edit" element={<EditHashTag />} />
        <Route path="/chating" element={<Chating />} />
        <Route path="/chatingroom/:partyId" element={<ChatingRoom />} />
        <Route path="/roomdetail/:partyId" element={<Roomdetail />} />
      
        
      </Routes>
      {modalStore.isOpen && (
        <Modal height={modalStore.height}>{modalStore.contents}</Modal>
      )}
    </>
  );
}

export default App;
