import React, { useMemo } from 'react';
import TermTooltip from './TermTooltip';

const LifeStageAnalysis = ({ daeunPeriods, birthYear }) => {
  const currentAge = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  }, [birthYear]);

  // 초년운, 중년운, 말년운 구분
  const lifeStages = useMemo(() => {
    if (!daeunPeriods || daeunPeriods.length === 0) return null;

    const earlyLife = daeunPeriods.filter(p => p.start_age < 30);
    const midLife = daeunPeriods.filter(p => p.start_age >= 30 && p.start_age < 60);
    const lateLife = daeunPeriods.filter(p => p.start_age >= 60);

    return { earlyLife, midLife, lateLife };
  }, [daeunPeriods]);

  if (!lifeStages) return null;

  const getCurrentStage = () => {
    if (currentAge < 30) return 'early';
    if (currentAge < 60) return 'mid';
    return 'late';
  };

  const currentStage = getCurrentStage();

  return (
    <div className="life-stage-analysis">
      <h3>📊 인생 시기별 운세</h3>
      <p className="life-stage-description">
        나이대별로 구분한 인생의 큰 흐름입니다. 현재: {currentAge}세
      </p>

      <div className="life-stages">
        {/* 초년운 (0-29세) */}
        <div className={`life-stage ${currentStage === 'early' ? 'current-stage' : ''}`}>
          <div className="stage-header">
            <h4>
              <TermTooltip term="년주">🌱 초년운 (0-29세)</TermTooltip>
            </h4>
            {currentStage === 'early' && <span className="stage-badge">현재</span>}
          </div>
          <div className="stage-content">
            <p className="stage-desc">
              어린 시절과 청년기입니다. 부모님, 가정환경, 학업, 성격 형성의 시기입니다.
            </p>
            <div className="stage-daeun">
              {lifeStages.earlyLife.map((period, idx) => (
                <div key={idx} className="stage-daeun-item">
                  <span className="daeun-char">{period.heavenly_stem}{period.earthly_branch}</span>
                  <span className="daeun-range">({period.start_age}-{period.end_age}세)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 중년운 (30-59세) */}
        <div className={`life-stage ${currentStage === 'mid' ? 'current-stage' : ''}`}>
          <div className="stage-header">
            <h4>
              <TermTooltip term="일주">🌳 중년운 (30-59세)</TermTooltip>
            </h4>
            {currentStage === 'mid' && <span className="stage-badge">현재</span>}
          </div>
          <div className="stage-content">
            <p className="stage-desc">
              사회 활동과 성취의 시기입니다. 결혼, 사업, 직장 생활의 전성기입니다.
            </p>
            <div className="stage-daeun">
              {lifeStages.midLife.map((period, idx) => (
                <div key={idx} className="stage-daeun-item">
                  <span className="daeun-char">{period.heavenly_stem}{period.earthly_branch}</span>
                  <span className="daeun-range">({period.start_age}-{period.end_age}세)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 말년운 (60세~) */}
        <div className={`life-stage ${currentStage === 'late' ? 'current-stage' : ''}`}>
          <div className="stage-header">
            <h4>
              <TermTooltip term="시주">🌾 말년운 (60세~)</TermTooltip>
            </h4>
            {currentStage === 'late' && <span className="stage-badge">현재</span>}
          </div>
          <div className="stage-content">
            <p className="stage-desc">
              인생의 결실과 여유의 시기입니다. 자녀, 건강, 노후 생활의 시기입니다.
            </p>
            <div className="stage-daeun">
              {lifeStages.lateLife.map((period, idx) => (
                <div key={idx} className="stage-daeun-item">
                  <span className="daeun-char">{period.heavenly_stem}{period.earthly_branch}</span>
                  <span className="daeun-range">({period.start_age}-{period.end_age}세)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeStageAnalysis;
