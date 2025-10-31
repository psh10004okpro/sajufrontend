import React, { useMemo } from 'react';
import { elementHanja, elementColors } from '../utils/hanjaData';

const OhangChart = ({ fiveElements, showHanja }) => {
  // 영문 키를 한글로 매핑
  const elementMapping = {
    wood: '목',
    fire: '화',
    earth: '토',
    metal: '금',
    water: '수'
  };

  // 오행 데이터 변환 및 정렬
  const elementData = useMemo(() => {
    const order = ['목', '화', '토', '금', '수'];
    return order.map(koreanName => {
      const englishKey = Object.keys(elementMapping).find(
        key => elementMapping[key] === koreanName
      );
      const count = fiveElements[englishKey] || 0;
      return {
        name: koreanName,
        hanja: elementHanja[koreanName],
        count: count,
        color: elementColors[koreanName]
      };
    });
  }, [fiveElements]);

  // 오행 상태 판단 (전체 8개 기둥 기준)
  const getElementStatus = (count) => {
    if (count === 0) return { status: 'none', label: '부족', color: '#ef4444' };
    if (count === 1) return { status: 'low', label: '약함', color: '#f59e0b' };
    if (count === 2 || count === 3) return { status: 'normal', label: '보통', color: '#10b981' };
    if (count === 4 || count === 5) return { status: 'high', label: '강함', color: '#3b82f6' };
    return { status: 'excess', label: '과다', color: '#8b5cf6' };
  };

  // 전체 통계
  const totalElements = useMemo(() => {
    return elementData.reduce((sum, el) => sum + el.count, 0);
  }, [elementData]);

  // 부족/과다 오행 찾기
  const analysis = useMemo(() => {
    const missing = elementData.filter(el => el.count === 0).map(el => el.name);
    const weak = elementData.filter(el => el.count === 1).map(el => el.name);
    const strong = elementData.filter(el => el.count >= 4).map(el => el.name);
    const excess = elementData.filter(el => el.count >= 6).map(el => el.name);

    return { missing, weak, strong, excess };
  }, [elementData]);

  return (
    <div className="ohang-chart">
      <div className="ohang-chart-header">
        <h3>📊 오행 밸런스</h3>
        <p className="ohang-chart-description">
          사주팔자에 나타난 오행(五行)의 분포를 분석합니다
        </p>
      </div>

      {/* 바 차트 */}
      <div className="ohang-bars">
        {elementData.map((element) => {
          const percentage = totalElements > 0 ? (element.count / totalElements) * 100 : 0;
          const status = getElementStatus(element.count);

          return (
            <div key={element.name} className="ohang-bar-container">
              <div className="ohang-bar-label">
                <span className="ohang-name">
                  {showHanja ? `${element.hanja} (${element.name})` : element.name}
                </span>
                <span className="ohang-count">{element.count}/8</span>
              </div>
              <div className="ohang-bar-wrapper">
                <div
                  className="ohang-bar"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: element.color,
                    minWidth: element.count > 0 ? '40px' : '0'
                  }}
                >
                  <span className="ohang-percentage">{Math.round(percentage)}%</span>
                </div>
              </div>
              <div className="ohang-status">
                <span
                  className="ohang-status-badge"
                  style={{ backgroundColor: status.color }}
                >
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 오행 분석 */}
      <div className="ohang-analysis">
        <h4>💡 오행 분석</h4>
        <div className="ohang-analysis-grid">
          {/* 부족한 오행 */}
          {analysis.missing.length > 0 && (
            <div className="ohang-analysis-item missing">
              <span className="ohang-analysis-icon">❌</span>
              <div className="ohang-analysis-content">
                <strong>부족한 오행:</strong>
                <p>{analysis.missing.join(', ')} - 해당 오행의 특성이 약할 수 있습니다</p>
              </div>
            </div>
          )}

          {/* 약한 오행 */}
          {analysis.weak.length > 0 && (
            <div className="ohang-analysis-item weak">
              <span className="ohang-analysis-icon">⚠️</span>
              <div className="ohang-analysis-content">
                <strong>약한 오행:</strong>
                <p>{analysis.weak.join(', ')} - 보완이 필요할 수 있습니다</p>
              </div>
            </div>
          )}

          {/* 강한 오행 */}
          {analysis.strong.length > 0 && (
            <div className="ohang-analysis-item strong">
              <span className="ohang-analysis-icon">✅</span>
              <div className="ohang-analysis-content">
                <strong>강한 오행:</strong>
                <p>{analysis.strong.join(', ')} - 해당 오행의 특성이 강하게 나타납니다</p>
              </div>
            </div>
          )}

          {/* 과다한 오행 */}
          {analysis.excess.length > 0 && (
            <div className="ohang-analysis-item excess">
              <span className="ohang-analysis-icon">⚡</span>
              <div className="ohang-analysis-content">
                <strong>과다한 오행:</strong>
                <p>{analysis.excess.join(', ')} - 지나치게 강할 수 있어 균형이 필요합니다</p>
              </div>
            </div>
          )}

          {/* 균형잡힌 경우 */}
          {analysis.missing.length === 0 && analysis.excess.length === 0 && (
            <div className="ohang-analysis-item balanced">
              <span className="ohang-analysis-icon">⚖️</span>
              <div className="ohang-analysis-content">
                <strong>균형잡힌 오행:</strong>
                <p>오행이 비교적 고르게 분포되어 있습니다</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 오행 설명 */}
      <div className="ohang-legend">
        <h4>🔮 오행이란?</h4>
        <p>
          오행(五行)은 목(木), 화(火), 토(土), 금(金), 수(水)를 말하며,
          사주에서 중요한 역할을 합니다. 오행의 균형이 좋을수록 운세가 조화롭습니다.
        </p>
        <div className="ohang-cycle">
          <div className="ohang-cycle-item">
            <strong>상생(相生):</strong> 목→화→토→금→수→목 (서로 생성)
          </div>
          <div className="ohang-cycle-item">
            <strong>상극(相剋):</strong> 목→토→수→화→금→목 (서로 극함)
          </div>
        </div>
      </div>
    </div>
  );
};

export default OhangChart;
