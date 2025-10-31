import React from 'react';
import './SkeletonUI.css';

const SajuResultSkeleton = () => {
  return (
    <div className="skeleton-container">
      {/* 사주팔자 카드 스켈레톤 */}
      <div className="skeleton-card">
        <div className="skeleton-header">
          <div className="skeleton-title skeleton-shimmer"></div>
          <div className="skeleton-subtitle skeleton-shimmer"></div>
        </div>

        {/* 사주 기둥들 */}
        <div className="skeleton-pillars">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="skeleton-pillar">
              <div className="skeleton-box skeleton-shimmer"></div>
              <div className="skeleton-box skeleton-shimmer"></div>
            </div>
          ))}
        </div>

        {/* 십성 */}
        <div className="skeleton-ten-gods">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="skeleton-badge skeleton-shimmer"></div>
          ))}
        </div>
      </div>

      {/* 오행 차트 스켈레톤 */}
      <div className="skeleton-card">
        <div className="skeleton-title skeleton-shimmer"></div>
        <div className="skeleton-chart-container">
          <div className="skeleton-chart-circle skeleton-shimmer"></div>
          <div className="skeleton-chart-bars">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="skeleton-bar">
                <div className="skeleton-bar-label skeleton-shimmer"></div>
                <div className="skeleton-bar-fill skeleton-shimmer"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 해석 텍스트 스켈레톤 */}
      <div className="skeleton-card">
        <div className="skeleton-title skeleton-shimmer"></div>
        <div className="skeleton-text-block">
          <div className="skeleton-text-line skeleton-shimmer"></div>
          <div className="skeleton-text-line skeleton-shimmer"></div>
          <div className="skeleton-text-line skeleton-shimmer" style={{ width: '80%' }}></div>
          <div className="skeleton-text-line skeleton-shimmer"></div>
          <div className="skeleton-text-line skeleton-shimmer" style={{ width: '90%' }}></div>
        </div>
      </div>
    </div>
  );
};

SajuResultSkeleton.displayName = 'SajuResultSkeleton';

export default SajuResultSkeleton;
