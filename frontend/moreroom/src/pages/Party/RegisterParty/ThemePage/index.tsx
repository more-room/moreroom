import React, { useState } from 'react';
import ThemeSelector from './ThemeSelector';
import { ThemeList } from './ThemeList';


const ThemePage = () => {
  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);

  // 테마 선택 시 호출될 함수
  const handleThemeSelect = (themeId: number) => {
    setSelectedThemeId(themeId); // 선택한 테마 ID를 상태로 저장
  };

  return (
    <div className="theme-page">
      {/* 선택 컴포넌트 */}
      <ThemeSelector onThemeSelect={handleThemeSelect} selectedThemeId={selectedThemeId} />

      {/* 선택된 테마 ID를 리스트에 전달 */}
      <ThemeList selectedThemeId={selectedThemeId} />
    </div>
  );
};

export default ThemePage;
