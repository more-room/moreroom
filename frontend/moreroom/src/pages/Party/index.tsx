/** @jsxImportSource @emotion/react */
import React from 'react';
import { TopBar } from '../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { partyCss } from './styles';
import { PartyList } from './PartyList';

export const Party = () => {
  const nav = useNavigate();
  return (
    <div>
      <TopBar>
        <TopBar.Title
          type="default"
          title="파티 목록"
          backHandler={() => nav(-1)}
        />
      </TopBar>
      <PartyList />
    </div>
  );
};
