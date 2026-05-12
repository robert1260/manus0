import { PokemonType, TYPE_COLORS } from '../data/typeChart';
import './DetailPanel.css';

interface DetailPanelProps {
  type: PokemonType;
  advantages: PokemonType[];
  disadvantages: PokemonType[];
}

export default function DetailPanel({ type, advantages, disadvantages }: DetailPanelProps) {
  const colors = TYPE_COLORS[type];

  return (
    <div className="detail-panel" style={{ '--type-color': colors.bg } as React.CSSProperties}>
      <div className="panel-header">
        <div className="header-title">
          <div className="type-badge" style={{ backgroundColor: colors.bg, color: colors.text }}>
            {type}
          </div>
          <h2>相剋分析</h2>
        </div>
      </div>

      <div className="panel-content">
        {/* 優勢區 */}
        <div className="relation-section advantages">
          <div className="section-header">
            <span className="section-icon">⚔️</span>
            <h3>克制屬性 (超級有效)</h3>
            <span className="count">{advantages.length}</span>
          </div>
          <div className="type-list">
            {advantages.length > 0 ? (
              advantages.map(adv => (
                <div
                  key={adv}
                  className="type-item advantage-item"
                  style={{
                    backgroundColor: TYPE_COLORS[adv].bg,
                    color: TYPE_COLORS[adv].text,
                  }}
                >
                  <span className="type-name">{adv}</span>
                  <span className="multiplier">1.25x</span>
                </div>
              ))
            ) : (
              <div className="empty-state">沒有克制屬性</div>
            )}
          </div>
        </div>

        {/* 劣勢區 */}
        <div className="relation-section disadvantages">
          <div className="section-header">
            <span className="section-icon">🛡️</span>
            <h3>被克制屬性 (不太有效)</h3>
            <span className="count">{disadvantages.length}</span>
          </div>
          <div className="type-list">
            {disadvantages.length > 0 ? (
              disadvantages.map(dis => (
                <div
                  key={dis}
                  className="type-item disadvantage-item"
                  style={{
                    backgroundColor: TYPE_COLORS[dis].bg,
                    color: TYPE_COLORS[dis].text,
                  }}
                >
                  <span className="type-name">{dis}</span>
                  <span className="multiplier">0.8x</span>
                </div>
              ))
            ) : (
              <div className="empty-state">沒有被克制屬性</div>
            )}
          </div>
        </div>
      </div>

      <div className="panel-footer">
        <p className="tip">💡 提示：超級有效表示該屬性的攻擊對目標屬性造成1.25倍傷害；不太有效表示只造成0.8倍傷害</p>
      </div>
    </div>
  );
}
