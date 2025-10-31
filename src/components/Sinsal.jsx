import { useMemo } from 'react';
import TermTooltip from './TermTooltip';

const Sinsal = ({ sinsal }) => {
  if (!sinsal || !sinsal.sinsal_list || sinsal.sinsal_list.length === 0) {
    return (
      <div className="sinsal">
        <div className="sinsal-header">
          <h3>🔱 <TermTooltip term="신살">신살</TermTooltip> 분석</h3>
          <p className="sinsal-description">발견된 신살이 없습니다</p>
        </div>
      </div>
    );
  }

  // 신살 한자 및 상세 정보
  const sinsalHanja = {
    '천을귀인': '天乙貴人',
    '역마살': '驛馬殺',
    '도화살': '桃花殺',
    '화개살': '華蓋殺',
    '괴강살': '魁罡殺',
    '양인살': '羊刃殺',
    '공망': '空亡'
  };

  // 신살 타입별 색상
  const typeColors = {
    '길신': '#10b981',  // Green
    '흉신': '#ef4444',  // Red
    '중립': '#3b82f6'   // Blue
  };

  // 신살 타입별 아이콘
  const typeIcons = {
    '길신': '✨',
    '흉신': '⚠️',
    '중립': '⚖️'
  };

  // 영향력별 배지 색상
  const influenceColors = {
    '상': '#8b5cf6',  // Purple
    '중': '#f59e0b',  // Orange
    '하': '#6b7280'   // Gray
  };

  // 타입별 신살 분류
  const gilsinList = useMemo(() =>
    sinsal.sinsal_list.filter(s => s.type === '길신'),
    [sinsal.sinsal_list]
  );

  const hyungsinList = useMemo(() =>
    sinsal.sinsal_list.filter(s => s.type === '흉신'),
    [sinsal.sinsal_list]
  );

  const neutralList = useMemo(() =>
    sinsal.sinsal_list.filter(s => s.type === '중립'),
    [sinsal.sinsal_list]
  );

  return (
    <div className="sinsal">
      {/* 헤더 */}
      <div className="sinsal-header">
        <h3>🔱 <TermTooltip term="신살">신살</TermTooltip> 분석</h3>
        <p className="sinsal-description">
          사주에서 발견된 {sinsal.total_count}개의 신살 (길신 {sinsal.gilsin_count}개, 흉신 {sinsal.hyungsin_count}개, 중립 {sinsal.neutral_count}개)
        </p>
      </div>

      {/* 통계 요약 */}
      <div className="sinsal-summary">
        <div className="sinsal-summary-item gilsin">
          <div className="summary-icon">✨</div>
          <div className="summary-content">
            <div className="summary-label">길신</div>
            <div className="summary-value">{sinsal.gilsin_count}</div>
          </div>
        </div>
        <div className="sinsal-summary-item hyungsin">
          <div className="summary-icon">⚠️</div>
          <div className="summary-content">
            <div className="summary-label">흉신</div>
            <div className="summary-value">{sinsal.hyungsin_count}</div>
          </div>
        </div>
        <div className="sinsal-summary-item neutral">
          <div className="summary-icon">⚖️</div>
          <div className="summary-content">
            <div className="summary-label">중립</div>
            <div className="summary-value">{sinsal.neutral_count}</div>
          </div>
        </div>
      </div>

      {/* 길신 목록 */}
      {gilsinList.length > 0 && (
        <div className="sinsal-section">
          <div className="sinsal-section-header gilsin-header">
            <span className="section-icon">✨</span>
            <h4>길신 (吉神)</h4>
          </div>
          <div className="sinsal-grid">
            {gilsinList.map((item, index) => (
              <div
                key={index}
                className="sinsal-card gilsin-card"
                style={{ '--sinsal-color': typeColors[item.type] }}
              >
                <div className="sinsal-card-header">
                  <div className="sinsal-name-container">
                    <span className="sinsal-icon">{typeIcons[item.type]}</span>
                    <div className="sinsal-name-group">
                      <div className="sinsal-name">{item.name}</div>
                      {sinsalHanja[item.name] && (
                        <div className="sinsal-hanja">{sinsalHanja[item.name]}</div>
                      )}
                    </div>
                  </div>
                  <div className="sinsal-badges">
                    <span
                      className="sinsal-influence-badge"
                      style={{ backgroundColor: influenceColors[item.influence] }}
                    >
                      영향력: {item.influence}
                    </span>
                  </div>
                </div>
                <div className="sinsal-card-body">
                  <div className="sinsal-pillars">
                    <span className="pillars-label">출현:</span>
                    {item.pillars.map((pillar, idx) => (
                      <span key={idx} className="pillar-badge">{pillar}</span>
                    ))}
                  </div>
                  <p className="sinsal-description-text">{item.description}</p>
                  <div className="sinsal-category-badge">{item.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 흉신 목록 */}
      {hyungsinList.length > 0 && (
        <div className="sinsal-section">
          <div className="sinsal-section-header hyungsin-header">
            <span className="section-icon">⚠️</span>
            <h4>흉신 (凶神)</h4>
          </div>
          <div className="sinsal-grid">
            {hyungsinList.map((item, index) => (
              <div
                key={index}
                className="sinsal-card hyungsin-card"
                style={{ '--sinsal-color': typeColors[item.type] }}
              >
                <div className="sinsal-card-header">
                  <div className="sinsal-name-container">
                    <span className="sinsal-icon">{typeIcons[item.type]}</span>
                    <div className="sinsal-name-group">
                      <div className="sinsal-name">{item.name}</div>
                      {sinsalHanja[item.name] && (
                        <div className="sinsal-hanja">{sinsalHanja[item.name]}</div>
                      )}
                    </div>
                  </div>
                  <div className="sinsal-badges">
                    <span
                      className="sinsal-influence-badge"
                      style={{ backgroundColor: influenceColors[item.influence] }}
                    >
                      영향력: {item.influence}
                    </span>
                  </div>
                </div>
                <div className="sinsal-card-body">
                  <div className="sinsal-pillars">
                    <span className="pillars-label">출현:</span>
                    {item.pillars.map((pillar, idx) => (
                      <span key={idx} className="pillar-badge">{pillar}</span>
                    ))}
                  </div>
                  <p className="sinsal-description-text">{item.description}</p>
                  <div className="sinsal-category-badge">{item.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 중립 목록 */}
      {neutralList.length > 0 && (
        <div className="sinsal-section">
          <div className="sinsal-section-header neutral-header">
            <span className="section-icon">⚖️</span>
            <h4>중립 신살</h4>
          </div>
          <div className="sinsal-grid">
            {neutralList.map((item, index) => (
              <div
                key={index}
                className="sinsal-card neutral-card"
                style={{ '--sinsal-color': typeColors[item.type] }}
              >
                <div className="sinsal-card-header">
                  <div className="sinsal-name-container">
                    <span className="sinsal-icon">{typeIcons[item.type]}</span>
                    <div className="sinsal-name-group">
                      <div className="sinsal-name">{item.name}</div>
                      {sinsalHanja[item.name] && (
                        <div className="sinsal-hanja">{sinsalHanja[item.name]}</div>
                      )}
                    </div>
                  </div>
                  <div className="sinsal-badges">
                    <span
                      className="sinsal-influence-badge"
                      style={{ backgroundColor: influenceColors[item.influence] }}
                    >
                      영향력: {item.influence}
                    </span>
                  </div>
                </div>
                <div className="sinsal-card-body">
                  <div className="sinsal-pillars">
                    <span className="pillars-label">출현:</span>
                    {item.pillars.map((pillar, idx) => (
                      <span key={idx} className="pillar-badge">{pillar}</span>
                    ))}
                  </div>
                  <p className="sinsal-description-text">{item.description}</p>
                  <div className="sinsal-category-badge">{item.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 설명 섹션 */}
      <div className="sinsal-legend">
        <h4>💡 신살이란?</h4>
        <p>
          신살(神殺)은 사주에서 특별한 의미를 가지는 별자리나 기운을 말합니다.
          길신은 좋은 영향을, 흉신은 주의가 필요한 영향을 나타냅니다.
        </p>
        <div className="sinsal-legend-note">
          <strong>🔍 해석 방법:</strong>
          <div className="legend-note-text">
            길신이 많으면 귀인의 도움과 좋은 기회가 많고,
            흉신이 있어도 이를 극복하는 방법을 알면 오히려 강점으로 활용할 수 있습니다.
            중립 신살은 상황에 따라 길흉이 달라집니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sinsal;
