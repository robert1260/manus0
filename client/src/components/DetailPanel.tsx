import { PokemonType, TYPE_COLORS, POKEMON_TYPES, TYPE_EFFECTIVENESS } from '../data/typeChart';
import './DetailPanel.css';

interface DetailPanelProps {
  type: PokemonType;
  advantages: PokemonType[];
  disadvantages: PokemonType[];
}

// 計算被該屬性克制的屬性 (受擊被剋)
function getWeakTo(type: PokemonType): PokemonType[] {
  return POKEMON_TYPES.filter(t => TYPE_EFFECTIVENESS[t][type] === 1.25);
}

// 計算對該屬性有抵抗的屬性 (受擊防禦)
function getResistsFrom(type: PokemonType): PokemonType[] {
  return POKEMON_TYPES.filter(t => TYPE_EFFECTIVENESS[t][type] === 0.8);
}

export default function DetailPanel({ type, advantages, disadvantages }: DetailPanelProps) {
  const colors = TYPE_COLORS[type];
  
  const weakTo = getWeakTo(type);
  const resistsFrom = getResistsFrom(type);

  return (
    <div className="detail-panel-circular" style={{ '--type-color': colors.bg } as React.CSSProperties}>
      {/* 上方 - 攻擊強化 */}
      <div className="panel-quadrant quadrant-top">
        <div className="quadrant-header">攻擊強化</div>
        <div className="type-list">
          {advantages.length > 0 ? (
            advantages.map(adv => (
              <div
                key={adv}
                className="type-badge"
                style={{
                  backgroundColor: TYPE_COLORS[adv].bg,
                  color: TYPE_COLORS[adv].text,
                }}
              >
                {adv}
              </div>
            ))
          ) : (
            <div className="empty-state">無</div>
          )}
        </div>
      </div>

      {/* 左方 - 攻擊弱化 */}
      <div className="panel-quadrant quadrant-left">
        <div className="quadrant-header">攻擊弱化</div>
        <div className="type-list">
          {disadvantages.length > 0 ? (
            disadvantages.map(dis => (
              <div
                key={dis}
                className="type-badge"
                style={{
                  backgroundColor: TYPE_COLORS[dis].bg,
                  color: TYPE_COLORS[dis].text,
                }}
              >
                {dis}
              </div>
            ))
          ) : (
            <div className="empty-state">無</div>
          )}
        </div>
      </div>

      {/* 中心 - 屬性名稱 */}
      <div className="panel-center">
        <div className="center-badge" style={{ backgroundColor: colors.bg, color: colors.text }}>
          {type}
        </div>
      </div>

      {/* 右方 - 受擊被剋 */}
      <div className="panel-quadrant quadrant-right">
        <div className="quadrant-header">受擊被剋</div>
        <div className="type-list">
          {weakTo.length > 0 ? (
            weakTo.map(w => (
              <div
                key={w}
                className="type-badge"
                style={{
                  backgroundColor: TYPE_COLORS[w].bg,
                  color: TYPE_COLORS[w].text,
                }}
              >
                {w}
              </div>
            ))
          ) : (
            <div className="empty-state">無</div>
          )}
        </div>
      </div>

      {/* 下方 - 受擊防禦 */}
      <div className="panel-quadrant quadrant-bottom">
        <div className="quadrant-header">受擊防禦</div>
        <div className="type-list">
          {resistsFrom.length > 0 ? (
            resistsFrom.map(r => (
              <div
                key={r}
                className="type-badge"
                style={{
                  backgroundColor: TYPE_COLORS[r].bg,
                  color: TYPE_COLORS[r].text,
                }}
              >
                {r}
              </div>
            ))
          ) : (
            <div className="empty-state">無</div>
          )}
        </div>
      </div>
    </div>
  );
}
