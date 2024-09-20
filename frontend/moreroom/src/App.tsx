import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ThemeList } from './pages/Themes/ThemeList';

function App() {
  return (
    <>
      <Routes>
        <Route path="/themes" element={<ThemeList />} />
      </Routes>
    </>
  );
}

export default App;
