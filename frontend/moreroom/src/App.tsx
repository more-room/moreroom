import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ThemeList } from './pages/Themes/ThemeList';
import { Modal } from './components/Modal';
import { useModalStore } from './stores/modalStore';
import { Login } from './pages/Login';

function App() {
  const modalStore = useModalStore();

  return (
    <>
      <Routes>
        <Route path="/themes" element={<ThemeList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {modalStore.isOpen && (
        <Modal height={modalStore.height}>{modalStore.contents}</Modal>
      )}
    </>
  );
}

export default App;
