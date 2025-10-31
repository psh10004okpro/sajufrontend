import React, { useMemo } from 'react';
import TermTooltip from './TermTooltip';
import { getElementColor } from '../utils/hanjaData';

const SaeunCard = ({ saeunYears, showHanja }) => {
  const currentYear = new Date().getFullYear();

  if (!saeunYears || saeunYears.length === 0) {
    return null;
  }

  // 세운을 년도순으로 정렬
  const sortedSaeun = useMemo(() => {
    return [...saeunYears].sort((a, b) => a.year - b.year);
  }, [saeunYears]);

  return (
    <div className="saeun-card">
      <h3>
        📆 <TermTooltip term="세운">세운 (년운)</TermTooltip>
      </h3>
      <p className="saeun-description">
        매년 바뀌는 운세의 흐름입니다. 현재: {currentYear}년
      </p>

      <div className="saeun-grid">
        {sortedSaeun.map((saeun, index) => {
          const isCurrentYear = saeun.year === currentYear;
          const isPast = saeun.year < currentYear;
          const isFuture = saeun.year > currentYear;

          return (
            <div
              key={index}
              className={`saeun-item ${isCurrentYear ? 'current-year' : ''} ${isPast ? 'past-year' : ''} ${isFuture ? 'future-year' : ''}`}
            >
              <div className="saeun-year">
                {saeun.year}년
                {isCurrentYear && <span className="current-badge">올해</span>}
              </div>
              <div
                className="saeun-pillar"
                style={{
                  color: getElementColor(saeun.year_pillar.heavenly_stem)
                }}
              >
                {saeun.year_pillar.heavenly_stem}
                {saeun.year_pillar.earthly_branch}
              </div>
              <div className="saeun-age">
                {saeun.age}세
              </div>
            </div>
          );
        })}
      </div>

      <div className="saeun-note">
        💡 세운은 매년 입춘(2월 4일경)을 기준으로 바뀝니다
      </div>
    </div>
  );
};

export default SaeunCard;
