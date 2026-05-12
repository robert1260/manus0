import { useEffect, useRef } from 'react';
import { POKEMON_TYPES, TYPE_COLORS, PokemonType } from '../data/typeChart';
import './TypeWheel.css';

interface TypeWheelProps {
  selectedType: PokemonType | null;
  onTypeSelect: (type: PokemonType) => void;
}

export default function TypeWheel({ selectedType, onTypeSelect }: TypeWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 計算環形佈局的位置
  const getTypePosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      angle: (angle * 180) / Math.PI + 90
    };
  };

  // 繪製連接線和背景
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) * 0.35;

    // 繪製背景圓形
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 60, 0, Math.PI * 2);
    ctx.fill();

    // 繪製環形網格線
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let r = radius * 0.3; r <= radius + 60; r += radius * 0.15) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 繪製徑向線
    for (let i = 0; i < POKEMON_TYPES.length; i++) {
      const pos = getTypePosition(i, POKEMON_TYPES.length, radius);
      const x = centerX + pos.x;
      const y = centerY + pos.y;
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }, []);

  return (
    <div className="type-wheel-container" ref={containerRef}>
      <canvas ref={canvasRef} className="wheel-canvas"></canvas>
      
      <div className="wheel-center">
        <div className="center-glow"></div>
        <div className="center-text">
          {selectedType ? (
            <>
              <div className="selected-type-name">{selectedType}</div>
              <div className="selected-type-hint">屬性相剋表</div>
            </>
          ) : (
            <div className="center-hint">點擊屬性</div>
          )}
        </div>
      </div>

      <div className="types-ring">
        {POKEMON_TYPES.map((type, index) => {
          const total = POKEMON_TYPES.length;
          const angle = (index / total) * 360;
          const radius = 35; // 百分比
          
          const isSelected = selectedType === type;
          const colors = TYPE_COLORS[type];

          return (
            <button
              key={type}
              className={`type-button ${isSelected ? 'selected' : ''}`}
              style={{
                '--angle': `${angle}deg`,
                '--radius': `${radius}%`,
                '--bg-color': colors.bg,
                '--text-color': colors.text,
                '--glow-color': colors.glow,
              } as React.CSSProperties}
              onClick={() => onTypeSelect(type)}
              title={type}
            >
              <span className="type-label">{type}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
