/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Typography } from "../../../../../components/Typography";

// Theme 인터페이스 정의
interface Theme {
  id: number;
  title: string;
  location: string;
  duration: string;
  difficulty: string;
  image: string;
}

const themeItemStyle = css`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #333;
`;

const themeImageStyle = css`
  width: 60px;
  height: 80px;
  object-fit: cover;
  margin-right: 16px;
`;

const themeInfoStyle = css`
  flex-grow: 1;
`;

const checkboxStyle = css`
  width: 24px;
  height: 24px;
  border: 2px solid #fff;
  border-radius: 50%;
  margin-left: 16px;
`;

const checkedStyle = css`
  background-color: #8c5cdd;
`;

// ... (다른 스타일 정의는 그대로 유지)

const dummyThemes: Theme[] = [
  { id: 1, title: "탈옥", location: "-", duration: "50분", difficulty: "보통, 액션", image: "path_to_image1.jpg" },
  { id: 2, title: "폐쇄병동", location: "제로월드 - 서현점", duration: "70분", difficulty: "스릴러", image: "path_to_image2.jpg" },
  { id: 3, title: "경성", location: "셜록홈즈 - 합정점", duration: "60분", difficulty: "역사", image: "path_to_image3.jpg" },
];

interface SelectableThemeListProps {
  onSelect: (theme: Theme) => void;
  selectedThemes: Theme[];
}

export const SelectableThemeList: React.FC<SelectableThemeListProps> = ({ onSelect, selectedThemes }) => {
  return (
    <div>
      {dummyThemes.map((theme) => (
        <div key={theme.id} css={themeItemStyle} onClick={() => onSelect(theme)}>
<img src={theme.image} alt={theme.title} css={themeImageStyle} />
          <div css={themeInfoStyle}>
            <Typography color="light" size={1.2} weight={500}>
              {theme.title}
            </Typography>
            <Typography color="light" size={0.8} weight={400}>
              {theme.location}
            </Typography>
            <Typography color="light" size={0.8} weight={400}>
              {theme.duration} / {theme.difficulty}
            </Typography>
          </div>
          <div 
            css={[checkboxStyle, selectedThemes.includes(theme) && checkedStyle]}
          />
        </div>
      ))}
    </div>
  );
};