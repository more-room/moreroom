import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ThemeList } from './pages/Themes/ThemeList';
import { MyPage } from './pages/Main/Mypage';
import { Profile } from './pages/Main/Mypage/Profile';
import { Home } from './pages/Main/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/themes" element={<ThemeList />} />
        <Route path="/member/mypage" element={<MyPage />} />
        <Route path="/member/mypage/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
