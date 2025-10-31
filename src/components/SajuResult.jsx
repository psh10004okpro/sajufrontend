import React, { useMemo } from 'react';
import TermTooltip from './TermTooltip';
import { elementColors, getElementColor, pillarHanja, tenGodsHanja, elementHanja } from '../utils/hanjaData';

const SajuResult = React.memo(({ sajuResult, showHanja = false }) => {
  const nonZeroTenGods = useMemo(() => {
    return Object.entries(sajuResult.ten_gods).filter(([_, value]) => value > 0);
  }, [sajuResult.ten_gods]);

  return (
    <div className="saju-result">
      <h2>📋 <TermTooltip term="사주팔자">사주팔자</TermTooltip></h2>

      <div className="pillars">
        <div className="pillar">
          <h3>
            <TermTooltip term="년주">년주</TermTooltip>
            {showHanja && <span className="hanja-text"> {pillarHanja['년주']}</span>}
          </h3>
          <div className="pillar-chars">
            <span
              className="heavenly-stem"
              style={{ color: getElementColor(sajuResult.year_pillar.heavenly_stem) }}
            >
              {sajuResult.year_pillar.heavenly_stem}
            </span>
            <span
              className="earthly-branch"
              style={{ color: getElementColor(sajuResult.year_pillar.earthly_branch) }}
            >
              {sajuResult.year_pillar.earthly_branch}
            </span>
          </div>
        </div>

        <div className="pillar">
          <h3>
            <TermTooltip term="월주">월주</TermTooltip>
            {showHanja && <span className="hanja-text"> {pillarHanja['월주']}</span>}
          </h3>
          <div className="pillar-chars">
            <span
              className="heavenly-stem"
              style={{ color: getElementColor(sajuResult.month_pillar.heavenly_stem) }}
            >
              {sajuResult.month_pillar.heavenly_stem}
            </span>
            <span
              className="earthly-branch"
              style={{ color: getElementColor(sajuResult.month_pillar.earthly_branch) }}
            >
              {sajuResult.month_pillar.earthly_branch}
            </span>
          </div>
        </div>

        <div className="pillar">
          <h3>
            <TermTooltip term="일주">일주</TermTooltip>
            {showHanja && <span className="hanja-text"> {pillarHanja['일주']}</span>}
          </h3>
          <div className="pillar-chars">
            <span
              className="heavenly-stem"
              style={{ color: getElementColor(sajuResult.day_pillar.heavenly_stem) }}
            >
              {sajuResult.day_pillar.heavenly_stem}
            </span>
            <span
              className="earthly-branch"
              style={{ color: getElementColor(sajuResult.day_pillar.earthly_branch) }}
            >
              {sajuResult.day_pillar.earthly_branch}
            </span>
          </div>
        </div>

        <div className="pillar">
          <h3>
            <TermTooltip term="시주">시주</TermTooltip>
            {showHanja && <span className="hanja-text"> {pillarHanja['시주']}</span>}
          </h3>
          <div className="pillar-chars">
            <span
              className="heavenly-stem"
              style={{ color: getElementColor(sajuResult.hour_pillar.heavenly_stem) }}
            >
              {sajuResult.hour_pillar.heavenly_stem}
            </span>
            <span
              className="earthly-branch"
              style={{ color: getElementColor(sajuResult.hour_pillar.earthly_branch) }}
            >
              {sajuResult.hour_pillar.earthly_branch}
            </span>
          </div>
        </div>
      </div>

      <div className="analysis-sections">
        <div className="analysis-section">
          <h3>🔥 <TermTooltip term="오행">오행 분석</TermTooltip></h3>
          <div className="elements">
            <div className="element">
              <span className="element-name" style={{ color: elementColors['목'] }}>
                목{showHanja && `(${elementHanja['목']})`}
              </span>
              <span className="element-value" style={{ backgroundColor: elementColors['목'] }}>
                {sajuResult.five_elements.wood}
              </span>
            </div>
            <div className="element">
              <span className="element-name" style={{ color: elementColors['화'] }}>
                화{showHanja && `(${elementHanja['화']})`}
              </span>
              <span className="element-value" style={{ backgroundColor: elementColors['화'] }}>
                {sajuResult.five_elements.fire}
              </span>
            </div>
            <div className="element">
              <span className="element-name" style={{ color: elementColors['토'] }}>
                토{showHanja && `(${elementHanja['토']})`}
              </span>
              <span className="element-value" style={{ backgroundColor: elementColors['토'] }}>
                {sajuResult.five_elements.earth}
              </span>
            </div>
            <div className="element">
              <span className="element-name" style={{ color: elementColors['금'] }}>
                금{showHanja && `(${elementHanja['금']})`}
              </span>
              <span className="element-value" style={{ backgroundColor: elementColors['금'] }}>
                {sajuResult.five_elements.metal}
              </span>
            </div>
            <div className="element">
              <span className="element-name" style={{ color: elementColors['수'] }}>
                수{showHanja && `(${elementHanja['수']})`}
              </span>
              <span className="element-value" style={{ backgroundColor: elementColors['수'] }}>
                {sajuResult.five_elements.water}
              </span>
            </div>
          </div>
        </div>

        <div className="analysis-section">
          <h3>⭐ <TermTooltip term="십성">십성 분석</TermTooltip></h3>
          <div className="ten-gods">
            {nonZeroTenGods.map(([key, value]) => (
              <div key={key} className="ten-god-item">
                <TermTooltip term={key}>
                  <span className="ten-god-name">
                    {key}{showHanja && ` (${tenGodsHanja[key] || ''})`}
                  </span>
                </TermTooltip>
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
