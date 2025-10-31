import React, { useMemo } from 'react';

const SajuResult = React.memo(({ sajuResult }) => {
  const nonZeroTenGods = useMemo(() => {
    return Object.entries(sajuResult.ten_gods).filter(([_, value]) => value > 0);
  }, [sajuResult.ten_gods]);

  return (
    <div className="saju-result">
      <h2>📋 사주팔자</h2>

      <div className="pillars">
        <div className="pillar">
          <h3>년주</h3>
          <div className="pillar-chars">
            <span className="heavenly-stem">{sajuResult.year_pillar.heavenly_stem}</span>
            <span className="earthly-branch">{sajuResult.year_pillar.earthly_branch}</span>
          </div>
        </div>

        <div className="pillar">
          <h3>월주</h3>
          <div className="pillar-chars">
            <span className="heavenly-stem">{sajuResult.month_pillar.heavenly_stem}</span>
            <span className="earthly-branch">{sajuResult.month_pillar.earthly_branch}</span>
          </div>
        </div>

        <div className="pillar">
          <h3>일주</h3>
          <div className="pillar-chars">
            <span className="heavenly-stem">{sajuResult.day_pillar.heavenly_stem}</span>
            <span className="earthly-branch">{sajuResult.day_pillar.earthly_branch}</span>
          </div>
        </div>

        <div className="pillar">
          <h3>시주</h3>
          <div className="pillar-chars">
            <span className="heavenly-stem">{sajuResult.hour_pillar.heavenly_stem}</span>
            <span className="earthly-branch">{sajuResult.hour_pillar.earthly_branch}</span>
          </div>
        </div>
      </div>

      <div className="analysis-sections">
        <div className="analysis-section">
          <h3>🔥 오행 분석</h3>
          <div className="elements">
            <div className="element">
              <span className="element-name">목(木)</span>
              <span className="element-value">{sajuResult.five_elements.wood}</span>
            </div>
            <div className="element">
              <span className="element-name">화(火)</span>
              <span className="element-value">{sajuResult.five_elements.fire}</span>
            </div>
            <div className="element">
              <span className="element-name">토(土)</span>
              <span className="element-value">{sajuResult.five_elements.earth}</span>
            </div>
            <div className="element">
              <span className="element-name">금(金)</span>
              <span className="element-value">{sajuResult.five_elements.metal}</span>
            </div>
            <div className="element">
              <span className="element-name">수(水)</span>
              <span className="element-value">{sajuResult.five_elements.water}</span>
            </div>
          </div>
        </div>

        <div className="analysis-section">
          <h3>⭐ 십성 분석</h3>
          <div className="ten-gods">
            {nonZeroTenGods.map(([key, value]) => (
              <div key={key} className="ten-god-item">
                <span className="ten-god-name">{key}</span>
                <span className="ten-god-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

SajuResult.displayName = 'SajuResult';

export default SajuResult;
