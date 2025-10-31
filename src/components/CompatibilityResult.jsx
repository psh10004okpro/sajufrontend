import { useMemo } from 'react';
import TermTooltip from './TermTooltip';

const CompatibilityResult = ({ compatibilityData, interpretation }) => {
  if (!compatibilityData) return null;

  const { overall_score, detailed_scores, strengths, weaknesses, advice } = compatibilityData;

  // 점수별 등급 계산
  const grade = useMemo(() => {
    if (overall_score >= 90) return { text: '최상', color: '#d946ef', emoji: '💯' };
    if (overall_score >= 80) return { text: '상', color: '#10b981', emoji: '🎉' };
    if (overall_score >= 70) return { text: '중상', color: '#3b82f6', emoji: '😊' };
    if (overall_score >= 60) return { text: '중', color: '#f59e0b', emoji: '🙂' };
    if (overall_score >= 50) return { text: '중하', color: '#f97316', emoji: '😐' };
    if (overall_score >= 40) return { text: '하', color: '#ef4444', emoji: '😔' };
    return { text: '최하', color: '#991b1b', emoji: '😢' };
  }, [overall_score]);

  // 점수별 메시지
  const scoreMessage = useMemo(() => {
    if (overall_score >= 80) return '매우 좋은 궁합입니다! 💖';
    if (overall_score >= 70) return '좋은 궁합입니다! 💕';
    if (overall_score >= 60) return '보통의 궁합입니다. 😊';
    if (overall_score >= 50) return '노력이 필요한 궁합입니다. 💪';
    return '많은 이해와 배려가 필요합니다. 🤝';
  }, [overall_score]);

  // 점수 바 스타일 계산
  const getScoreBarStyle = (score) => ({
    width: `${score}%`,
    background: score >= 70 ? 'linear-gradient(90deg, #10b981 0%, #3b82f6 100%)' :
                score >= 50 ? 'linear-gradient(90deg, #f59e0b 0%, #f97316 100%)' :
                'linear-gradient(90deg, #ef4444 0%, #991b1b 100%)'
  });

  return (
    <div className="compatibility-result">
      {/* 궁합 점수 섹션 */}
      <div className="compatibility-score-section">
        <div className="score-header">
          <h2>💕 <TermTooltip term="궁합">궁합</TermTooltip> 종합 점수</h2>
          <p className="score-message">{scoreMessage}</p>
        </div>

        <div className="overall-score-card">
          <div className="score-circle" style={{ borderColor: grade.color }}>
            <div className="score-value" style={{ color: grade.color }}>
              {overall_score}
            </div>
            <div className="score-label">점</div>
          </div>
          <div className="score-grade">
            <span className="grade-emoji">{grade.emoji}</span>
            <span className="grade-text" style={{ color: grade.color }}>{grade.text}</span>
          </div>
        </div>

        {/* 궁합 점수 바 */}
        <div className="score-bar-container">
          <div className="score-bar-bg">
            <div className="score-bar-fill" style={getScoreBarStyle(overall_score)}></div>
          </div>
          <div className="score-bar-labels">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>
      </div>

      {/* 세부 점수 */}
      {detailed_scores && detailed_scores.length > 0 && (
        <div className="compatibility-details-section">
          <h3>💝 세부 점수</h3>
          <div className="details-grid">
            {detailed_scores.map((item, index) => (
              <div key={index} className="detail-card">
                <div className="detail-header">
                  <h4>{item.category}</h4>
                  <span className="detail-score" style={{
                    color: item.score >= 70 ? '#10b981' : item.score >= 50 ? '#f59e0b' : '#ef4444'
                  }}>
                    {item.score}점
                  </span>
                </div>
                <div className="detail-bar-bg">
                  <div
                    className="detail-bar-fill"
                    style={{
                      width: `${item.score}%`,
                      background: item.score >= 70 ? '#10b981' : item.score >= 50 ? '#f59e0b' : '#ef4444'
                    }}
                  ></div>
                </div>
                <p className="detail-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 장점과 단점 */}
      <div className="compatibility-analysis-section">
        <div className="analysis-grid">
          {/* 장점 */}
          {strengths && strengths.length > 0 && (
            <div className="analysis-card strengths-card">
              <div className="analysis-header">
                <span className="analysis-icon">✨</span>
                <h4>관계의 장점</h4>
              </div>
              <ul className="analysis-list">
                {strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 약점 */}
          {weaknesses && weaknesses.length > 0 && (
            <div className="analysis-card weaknesses-card">
              <div className="analysis-header">
                <span className="analysis-icon">⚠️</span>
                <h4>주의할 점</h4>
              </div>
              <ul className="analysis-list">
                {weaknesses.map((weakness, index) => (
                  <li key={index}>{weakness}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 조언 */}
      {advice && (
        <div className="compatibility-advice-section">
          <div className="advice-card">
            <div className="advice-icon">💡</div>
            <div className="advice-content">
              <h4>궁합 조언</h4>
              <p>{advice}</p>
            </div>
          </div>
        </div>
      )}

      {/* AI 해석 */}
      {interpretation && (
        <div className="compatibility-interpretation-section">
          <div className="interpretation-header">
            <h3>🤖 AI 전문 해석</h3>
          </div>
          <div className="interpretation-content">
            {interpretation.split('\n').map((line, index) => (
              line.trim() && <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}

      {/* 설명 */}
      <div className="compatibility-legend">
        <h4>💝 궁합이란?</h4>
        <p>
          궁합은 두 사람의 사주를 비교하여 타고난 성격, 가치관, 생활 방식이 조화로운지를 분석합니다.
          궁합 점수는 참고용으로 활용하되, 실제 관계는 노력과 배려로 더욱 발전할 수 있습니다.
          점수가 낮더라도 서로를 이해하고 존중한다면 행복한 관계를 만들 수 있습니다.
        </p>
        <div className="legend-note">
          <strong>참고:</strong> 궁합은 세부 항목을 종합하여 계산되며, 각 항목은 오행, 십성 등 다양한 요소를 반영합니다. ❤️
        </div>
      </div>
    </div>
  );
};

export default CompatibilityResult;
