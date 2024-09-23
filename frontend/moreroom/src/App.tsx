import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ThemeList } from './pages/Themes/ThemeList';
import { Login } from './pages/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/themes" element={<ThemeList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
