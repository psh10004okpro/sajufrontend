import React from 'react';
import TermTooltip from './TermTooltip';

const YongsinAnalysis = ({ yongsin }) => {
  if (!yongsin) return null;

  // 오행별 색상 매핑
  const elementColors = {
    '목': 'var(--wood-pro)',
    '화': 'var(--fire-pro)',
    '토': 'var(--earth-pro)',
    '금': 'var(--metal-pro)',
    '수': 'var(--water-pro)',
  };

  // 오행별 아이콘
  const elementIcons = {
    '목': '🌲',
    '화': '🔥',
    '토': '⛰️',
    '금': '⚡',
    '수': '💧',
  };

  // 강약별 스타일
  const strengthStyles = {
    '강': { color: '#ef4444', label: '강함' },
    '약': { color: '#3b82f6', label: '약함' },
    '중화': { color: '#10b981', label: '중화됨' },
  };

  const strengthInfo = strengthStyles[yongsin.strength] || strengthStyles['중화'];

  return (
    <div className="yongsin-analysis professional-card">
      <h3>
        <TermTooltip term="용신">🎯 용신(用神) 분석</TermTooltip>
      </h3>
      <p className="yongsin-intro">
        용신은 사주의 균형을 맞추는 가장 중요한 오행입니다.
        일간의 강약을 파악하여 필요한 오행을 찾아냅니다.
      </p>

      {/* 일간 강약 */}
      <div className="yongsin-section">
        <h4>📊 일간 강약 분석</h4>
        <div className="strength-container">
          <div className="strength-badge" style={{ borderColor: strengthInfo.color }}>
            <span className="strength-value" style={{ color: strengthInfo.color }}>
              {yongsin.day_element} 일간
            </span>
            <span className="strength-label" style={{ backgroundColor: strengthInfo.color }}>
              {strengthInfo.label}
            </span>
          </div>
          <div className="strength-score">
            강약 점수: <strong>{yongsin.strength_score}</strong>
          </div>
        </div>

        <p className="strength-description">{yongsin.strength_description}</p>

        {yongsin.strength_factors && yongsin.strength_factors.length > 0 && (
          <div className="strength-factors">
            <h5>📋 판단 근거</h5>
            <ul>
              {yongsin.strength_factors.map((factor, idx) => (
                <li key={idx}>{factor}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 용신 (필요한 오행) */}
      {yongsin.yongsin && yongsin.yongsin.length > 0 && (
        <div className="yongsin-section">
          <h4>✨ 용신 (必要五行)</h4>
          <p className="section-desc">사주의 균형을 맞추기 위해 필요한 오행입니다.</p>
          <div className="element-cards">
            {yongsin.yongsin.map((item, idx) => (
              <div
                key={idx}
                className="element-card yongsin-card"
                style={{ borderLeftColor: elementColors[item.element] }}
              >
                <div className="element-header">
                  <span className="element-icon">{elementIcons[item.element]}</span>
                  <span className="element-name" style={{ color: elementColors[item.element] }}>
                    {item.element}
                  </span>
                  <span className="element-reason">({item.reason})</span>
                </div>
                <p className="element-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 희신 (보조 오행) */}
      {yongsin.heesin && yongsin.heesin.length > 0 && (
        <div className="yongsin-section">
          <h4>💫 희신 (補助五行)</h4>
          <p className="section-desc">용신을 돕는 보조 오행입니다.</p>
          <div className="element-cards">
            {yongsin.heesin.map((item, idx) => (
              <div
                key={idx}
                className="element-card heesin-card"
                style={{ borderLeftColor: elementColors[item.element] }}
              >
                <div className="element-header">
                  <span className="element-icon">{elementIcons[item.element]}</span>
                  <span className="element-name" style={{ color: elementColors[item.element] }}>
                    {item.element}
                  </span>
                  <span className="element-reason">({item.reason})</span>
                </div>
                <p className="element-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 기신 (피해야 할 오행) */}
      {yongsin.gisin && yongsin.gisin.length > 0 && (
        <div className="yongsin-section">
          <h4>⚠️ 기신 (忌神) - 피해야 할 오행</h4>
          <p className="section-desc">사주의 균형을 해치는 오행입니다.</p>
          <div className="gisin-list">
            {yongsin.gisin.map((item, idx) => (
              <div key={idx} className="gisin-item">
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 실용 조언 */}
      {yongsin.practical_advice && yongsin.practical_advice.length > 0 && (
        <div className="yongsin-section practical-advice-section">
          <h4>💡 실생활 활용 가이드</h4>
          <div className="advice-grid">
            {yongsin.practical_advice.map((advice, idx) => {
              // 방향, 색상, 직업 등을 파싱
              const parts = advice.split('|').map(p => p.trim());
              return (
                <div key={idx} className="advice-card">
                  {parts.map((part, pIdx) => {
                    const [label, value] = part.split(':').map(s => s.trim());
                    return (
                      <div key={pIdx} className="advice-item">
                        <span className="advice-label">{label}</span>
                        <span className="advice-value">{value}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

YongsinAnalysis.displayName = 'YongsinAnalysis';

export default YongsinAnalysis;
