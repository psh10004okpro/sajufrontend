import React from 'react';
import TermTooltip from './TermTooltip';

const HapchunghyeonghaeparAnalysis = ({ hapchunghyeonghaepa }) => {
  if (!hapchunghyeonghaepa) return null;

  const { 천간합, 지지합, 충, 형, 해, 파, summary } = hapchunghyeonghaepa;

  // 요약 정보 표시
  const getSummaryColor = (level) => {
    switch(level) {
      case '높음': return '#ef4444';
      case '중간': return '#f59e0b';
      case '낮음': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="hapchung-analysis professional-card">
      <h3>
        <TermTooltip term="합충형해파">🔄 합충형해파(合沖刑害破) 분석</TermTooltip>
      </h3>
      <p className="hapchung-intro">
        사주 내 천간과 지지 간의 상호작용을 분석합니다.
        합(合)은 조화를, 충(沖)·형(刑)·해(害)·파(破)는 갈등을 의미합니다.
      </p>

      {/* 종합 평가 */}
      <div className="hapchung-summary">
        <h4>📊 종합 평가</h4>
        <div className="summary-grid">
          <div className="summary-card harmony-card">
            <div className="summary-label">조화 점수</div>
            <div className="summary-value" style={{ color: '#10b981' }}>
              {summary.harmony_score}
            </div>
            <div className="summary-detail">합: {summary.total_hap}개</div>
          </div>

          <div className="summary-card conflict-card">
            <div className="summary-label">갈등 점수</div>
            <div className="summary-value" style={{ color: getSummaryColor(summary.conflict_level) }}>
              {summary.conflict_score}
            </div>
            <div className="summary-detail">
              충 {summary.total_chung} / 형 {summary.total_hyeong} / 해 {summary.total_hae} / 파 {summary.total_pa}
            </div>
          </div>

          <div className="summary-card level-card">
            <div className="summary-label">갈등 수준</div>
            <div className="summary-value" style={{ color: getSummaryColor(summary.conflict_level) }}>
              {summary.conflict_level}
            </div>
          </div>
        </div>

        {summary.overall && (
          <div className="overall-assessment">
            <strong>종합:</strong> {summary.overall}
          </div>
        )}
      </div>

      {/* 천간합 */}
      {천간합 && 천간합.length > 0 && (
        <div className="hapchung-section">
          <h4>✨ 천간합 (天干合)</h4>
          <p className="section-desc">천간 간의 조화로운 결합입니다.</p>
          <div className="interaction-list">
            {천간합.map((item, idx) => (
              <div key={idx} className="interaction-item hap-item">
                <div className="interaction-header">
                  <span className="position-badge">{item.position}</span>
                  <span className="stems-badge">{item.stems}</span>
                </div>
                <div className="interaction-type">{item.type}</div>
                <div className="interaction-desc">{item.description}</div>
                <div className="element-tag" style={{ backgroundColor: getElementColor(item.element) }}>
                  오행: {item.element}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 지지합 */}
      {지지합 && (지지합.육합?.length > 0 || 지지합.삼합?.length > 0 || 지지합.방합?.length > 0) && (
        <div className="hapchung-section">
          <h4>🤝 지지합 (地支合)</h4>

          {/* 육합 */}
          {지지합.육합 && 지지합.육합.length > 0 && (
            <div className="sub-section">
              <h5>육합 (六合)</h5>
              <div className="interaction-list">
                {지지합.육합.map((item, idx) => (
                  <div key={idx} className="interaction-item hap-item">
                    <div className="interaction-header">
                      <span className="position-badge">{item.position}</span>
                      <span className="stems-badge">{item.branches}</span>
                    </div>
                    <div className="interaction-type">{item.type}</div>
                    <div className="interaction-desc">{item.description}</div>
                    <div className="element-tag" style={{ backgroundColor: getElementColor(item.element) }}>
                      오행: {item.element}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 삼합 */}
          {지지합.삼합 && 지지합.삼합.length > 0 && (
            <div className="sub-section">
              <h5>삼합 (三合)</h5>
              <div className="interaction-list">
                {지지합.삼합.map((item, idx) => (
                  <div key={idx} className="interaction-item hap-item samhap-item">
                    <div className="interaction-header">
                      <span className="type-badge">{item.type}</span>
                      <span className="strength-badge" style={{
                        backgroundColor: item.strength === '강함' ? '#10b981' : '#f59e0b'
                      }}>
                        {item.strength}
                      </span>
                    </div>
                    <div className="branches-display">
                      {item.branches.join(' + ')}
                    </div>
                    <div className="interaction-desc">{item.description}</div>
                    <div className="element-tag" style={{ backgroundColor: getElementColor(item.element) }}>
                      오행: {item.element}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 방합 */}
          {지지합.방합 && 지지합.방합.length > 0 && (
            <div className="sub-section">
              <h5>방합 (方合)</h5>
              <div className="interaction-list">
                {지지합.방합.map((item, idx) => (
                  <div key={idx} className="interaction-item hap-item banghap-item">
                    <div className="interaction-header">
                      <span className="type-badge">{item.type}</span>
                    </div>
                    <div className="branches-display">
                      {item.branches.join(' + ')}
                    </div>
                    <div className="interaction-desc">{item.description}</div>
                    <div className="element-tag" style={{ backgroundColor: getElementColor(item.element) }}>
                      오행: {item.element}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 충 */}
      {충 && 충.length > 0 && (
        <div className="hapchung-section conflict-section">
          <h4>⚡ 충 (沖)</h4>
          <p className="section-desc">정면 충돌로 급격한 변화를 가져옵니다.</p>
          <div className="interaction-list">
            {충.map((item, idx) => (
              <div key={idx} className="interaction-item conflict-item chung-item">
                <div className="interaction-header">
                  <span className="position-badge conflict-badge">{item.position}</span>
                  <span className="stems-badge">{item.branches}</span>
                </div>
                <div className="interaction-desc">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 형 */}
      {형 && 형.length > 0 && (
        <div className="hapchung-section conflict-section">
          <h4>⚠️ 형 (刑)</h4>
          <p className="section-desc">형벌과 갈등을 의미합니다.</p>
          <div className="interaction-list">
            {형.map((item, idx) => (
              <div key={idx} className="interaction-item conflict-item hyeong-item">
                <div className="interaction-header">
                  <span className="position-badge conflict-badge">{item.position}</span>
                  <span className="stems-badge">{item.branches}</span>
                </div>
                <div className="interaction-desc">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 해 */}
      {해 && 해.length > 0 && (
        <div className="hapchung-section conflict-section">
          <h4>🚫 해 (害)</h4>
          <p className="section-desc">손해와 방해를 의미합니다.</p>
          <div className="interaction-list">
            {해.map((item, idx) => (
              <div key={idx} className="interaction-item conflict-item hae-item">
                <div className="interaction-header">
                  <span className="position-badge conflict-badge">{item.position}</span>
                  <span className="stems-badge">{item.branches}</span>
                </div>
                <div className="interaction-desc">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 파 */}
      {파 && 파.length > 0 && (
        <div className="hapchung-section conflict-section">
          <h4>💥 파 (破)</h4>
          <p className="section-desc">파괴와 손상을 의미합니다.</p>
          <div className="interaction-list">
            {파.map((item, idx) => (
              <div key={idx} className="interaction-item conflict-item pa-item">
                <div className="interaction-header">
                  <span className="position-badge conflict-badge">{item.position}</span>
                  <span className="stems-badge">{item.branches}</span>
                </div>
                <div className="interaction-desc">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 조화와 갈등이 모두 없는 경우 */}
      {summary.total_hap === 0 && summary.total_chung === 0 &&
       summary.total_hyeong === 0 && summary.total_hae === 0 && summary.total_pa === 0 && (
        <div className="no-interactions">
          <p>특별한 합충형해파가 발견되지 않았습니다.</p>
          <p>사주가 평온하고 독립적인 구조를 가지고 있습니다.</p>
        </div>
      )}
    </div>
  );
};

// 오행별 색상
const getElementColor = (element) => {
  const colors = {
    '목': '#10b981',
    '화': '#ef4444',
    '토': '#f59e0b',
    '금': '#6366f1',
    '수': '#3b82f6',
    '화/토': 'linear-gradient(90deg, #ef4444 0%, #f59e0b 100%)'
  };
  return colors[element] || '#6b7280';
};

HapchunghyeonghaeparAnalysis.displayName = 'HapchunghyeonghaeparAnalysis';

export default HapchunghyeonghaeparAnalysis;
