import React, { useMemo } from 'react';
import TermTooltip from './TermTooltip';
import { getElementColor } from '../utils/hanjaData';

const DaeunTimeline = ({ daeunPeriods, birthYear, showHanja }) => {
  // 현재 나이 계산
  const currentAge = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  }, [birthYear]);

  // 현재 대운 찾기
  const currentDaeunIndex = useMemo(() => {
    return daeunPeriods.findIndex(
      period => currentAge >= period.start_age && currentAge <= period.end_age
    );
  }, [daeunPeriods, currentAge]);

  if (!daeunPeriods || daeunPeriods.length === 0) {
    return null;
  }

  return (
    <div className="daeun-timeline">
      <h3>
        📅 <TermTooltip term="대운">대운 (10년 운)</TermTooltip>
      </h3>
      <p className="daeun-description">
        10년 단위로 흐르는 큰 운의 흐름입니다. 현재 나이: {currentAge}세
      </p>

      <div className="daeun-periods">
        {daeunPeriods.map((period, index) => {
          const isCurrent = index === currentDaeunIndex;
          const isPast = index < currentDaeunIndex;
          const isFuture = index > currentDaeunIndex;

          return (
            <div
              key={index}
              className={`daeun-period ${isCurrent ? 'current' : ''} ${isPast ? 'past' : ''} ${isFuture ? 'future' : ''}`}
            >
              <div className="daeun-period-header">
                <div
                  className="daeun-characters"
                  style={{
                    color: getElementColor(period.heavenly_stem)
                  }}
                >
                  {period.heavenly_stem}
                  {period.earthly_branch}
                </div>
                <div className="daeun-age-range">
                  {period.start_age}~{period.end_age}세
                </div>
              </div>
              {isCurrent && (
                <div className="daeun-current-badge">
                  ← 현재 대운
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="daeun-legend">
        <span className="legend-item past-legend">■ 지나간 대운</span>
        <span className="legend-item current-legend">■ 현재 대운</span>
        <span className="legend-item future-legend">■ 앞으로의 대운</span>
      </div>
    </div>
  );
};

export default DaeunTimeline;
