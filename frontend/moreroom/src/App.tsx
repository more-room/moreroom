import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ThemeList } from './pages/Themes/ThemeList';
import { Modal } from './components/Modal';
import { useModalStore } from './stores/modalStore';
import { MyPage } from './pages/Main/Mypage';
import { Profile } from './pages/Main/Mypage/Profile';
import { Home } from './pages/Main/Home';
import { EditProfile } from './pages/Main/Mypage/EditProfile';

function App() {
  const modalStore = useModalStore();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/themes" element={<ThemeList />} />
        <Route path="/member/mypage" element={<MyPage />} />
        <Route path="/member/mypage/profile" element={<Profile />} />
        <Route path="/member/mypage/profile/edit" element={<EditProfile />} />
      </Routes>
      {modalStore.isOpen && (
        <Modal height={modalStore.height}>{modalStore.contents}</Modal>
      )}
    </>
  );
}

export default App;
