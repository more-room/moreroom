/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { TopBar } from "../../../../components/TopBar";
import { ThemeItem } from "../../../../components/ThemeItem";
import { IThemeListItem } from "../../../../types/themeTypes";
export const Roomdetail = () => {
  return(
    <div>
      <TopBar>
          <TopBar.Title type="default" defaultValue="파티 목록" title="채팅방 설정" />
      </TopBar>
      
    </div>
  )
}