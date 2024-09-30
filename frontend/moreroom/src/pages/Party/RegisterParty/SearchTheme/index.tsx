/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { SelectableThemeList } from "./SelectavleThemeList";
import { Button } from "../../../../components/Button";

// Theme 인터페이스를 여기서도 사용합니다
interface Theme {
  id: number;
  title: string;
  location: string;
  duration: string;
  difficulty: string;
  image: string;
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const buttonStyle = css`
  margin-top: auto;
  padding: 16px;
`;

export const SearchTheme: React.FC = () => {
  const [selectedThemes, setSelectedThemes] = useState<Theme[]>([]);

  const handleThemeSelect = (theme: Theme) => {
    setSelectedThemes((prev) => 
      prev.some(t => t.id === theme.id) ? prev.filter(t => t.id !== theme.id) : [...prev, theme]
    );
  };

  const handleConfirm = () => {
    console.log("Selected themes:", selectedThemes);
    // Here you can add logic to save selected themes or navigate to next page
  };

  return (
    <div css={containerStyle}>
      <SelectableThemeList onSelect={handleThemeSelect} selectedThemes={selectedThemes} />
      <div css={buttonStyle}>
        <Button 
          color="primary" 
          fullwidth 
          rounded={0.5} 
          variant="contained" 
          handler={handleConfirm}
        >
          확인
        </Button>
      </div>
    </div>
  );
};