import React from 'react';

const ThemeSelector = ({ onThemeSelect, selectedThemeId }: { onThemeSelect: (themeId: number) => void, selectedThemeId: number | null }) => {
  const themes = [
    { themeId: 1, title: '테마1' },
    { themeId: 2, title: '테마2' },
    { themeId: 3, title: '테마3' },
  ]; // 예시 데이터

  return (
    <div>
      {themes.map((theme) => (
        <div key={theme.themeId} onClick={() => onThemeSelect(theme.themeId)} className="theme-item">
          <span>{theme.title}</span>

          {/* 선택된 테마에 체크 표시 */}
          {selectedThemeId === theme.themeId && <span>✔</span>}
        </div>
      ))}
    </div>
  );
};

export default ThemeSelector;
