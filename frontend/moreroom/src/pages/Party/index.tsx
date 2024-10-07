/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PartyList } from './PartyList';
import { NavChat } from './NavChat';

export const Party = () => {
  return (
    <div>
      <NavChat />
      <PartyList />
    </div>
  );
};
