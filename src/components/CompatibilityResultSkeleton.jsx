import React from 'react';
import './SkeletonUI.css';

const CompatibilityResultSkeleton = () => {
  return (
    <div className="skeleton-container">
      {/* 종합 점수 스켈레톤 */}
      <div className="skeleton-card">
        <div className="skeleton-title skeleton-shimmer"></div>
        <div className="skeleton-score-section">
          <div className="skeleton-score-circle skeleton-shimmer"></div>
          <div className="skeleton-score-bar skeleton-shimmer"></div>
        </div>
      </div>

      {/* 세부 점수 스켈레톤 */}
      <div className="skeleton-card">
        <div className="skeleton-title skeleton-shimmer"></div>
        <div className="skeleton-detail-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton-detail-card">
              <div className="skeleton-subtitle skeleton-shimmer"></div>
              <div className="skeleton-bar-fill skeleton-shimmer"></div>
              <div className="skeleton-text-line skeleton-shimmer"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 장점/단점 스켈레톤 */}
      <div className="skeleton-card">
        <div className="skeleton-analysis-grid">
          <div className="skeleton-analysis-card">
            <div className="skeleton-subtitle skeleton-shimmer"></div>
            <div className="skeleton-list">
              {[1, 2, 3].map(i => (
                <div key={i} className="skeleton-list-item skeleton-shimmer"></div>
              ))}
            </div>
          </div>
          <div className="skeleton-analysis-card">
            <div className="skeleton-subtitle skeleton-shimmer"></div>
            <div className="skeleton-list">
              {[1, 2, 3].map(i => (
                <div key={i} className="skeleton-list-item skeleton-shimmer"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI 해석 스켈레톤 */}
      <div className="skeleton-card">
        <div className="skeleton-title skeleton-shimmer"></div>
        <div className="skeleton-text-block">
          <div className="skeleton-text-line skeleton-shimmer"></div>
          <div className="skeleton-text-line skeleton-shimmer"></div>
          <div className="skeleton-text-line skeleton-shimmer" style={{ width: '85%' }}></div>
          <div className="skeleton-text-line skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

CompatibilityResultSkeleton.displayName = 'CompatibilityResultSkeleton';

export default CompatibilityResultSkeleton;
