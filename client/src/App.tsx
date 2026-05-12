import { useState } from 'react';
import './App.css';
import { POKEMON_TYPES, TYPE_COLORS, getAdvantages, getDisadvantages, PokemonType } from './data/typeChart';
import TypeWheel from './components/TypeWheel';
import DetailPanel from './components/DetailPanel';

export default function App() {
  const [selectedType, setSelectedType] = useState<PokemonType | null>(null);

  return (
    <div className="app-container">
      {/* 背景層 */}
      <div className="background-layer"></div>
      
      {/* 主內容 */}
      <div className="main-content">
        {/* 標題區 */}
        <header className="header">
          <h1 className="title">寶可夢屬性相剋表</h1>
          <p className="subtitle">點擊屬性查看克制關係</p>
        </header>

        {/* 核心互動區 */}
        <div className="interactive-section">
          <TypeWheel 
            selectedType={selectedType} 
            onTypeSelect={setSelectedType}
          />
          
          {/* 詳情面板 */}
          {selectedType && (
            <DetailPanel 
              type={selectedType}
              advantages={getAdvantages(selectedType)}
              disadvantages={getDisadvantages(selectedType)}
            />
          )}
        </div>

        {/* 說明文字 */}
        <footer className="footer">
          <div className="legend">
            <div className="legend-item">
              <span className="legend-color advantage"></span>
              <span>超級有效 (1.25x 傷害)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color disadvantage"></span>
              <span>不太有效 (0.8x 傷害)</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
