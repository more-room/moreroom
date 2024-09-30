import React from 'react';

export const ThemeList = ({ selectedThemeId }: { selectedThemeId: number | null }) => {
  const themes = [
    { themeId: 1, title: 'Heaven', genre: '공포, 미스터리, 추리', location: '넥스트 에디션' },
    { themeId: 2, title: 'Inferno', genre: '스릴러, 드라마', location: '넥스트 에디션' },
    { themeId: 3, title: 'Purgatory', genre: '미스터리, 판타지', location: '넥스트 에디션' },
  ];

  return (
    <div>
      {themes.map((theme) => (
        <div key={theme.themeId} className="theme-item">
          <img src={`path-to-image/${theme.themeId}.png`} alt={theme.title} />
          <div>
            <p>{theme.title}</p>
            <p>{theme.genre}</p>
            <p>{theme.location}</p>
          </div>

          {/* 선택된 테마에 체크 마크 표시 */}
          {selectedThemeId === theme.themeId && <span>✔</span>}
        </div>
      ))}
    </div>
  );
};
