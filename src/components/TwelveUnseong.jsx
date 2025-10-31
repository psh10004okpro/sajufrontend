import React, { useMemo } from 'react';
import TermTooltip from './TermTooltip';

const TwelveUnseong = React.memo(({ twelveUnseong, fourPillars, showHanja }) => {
  // 12운성별 한자, 색상, 설명
  const unseongInfo = {
    '장생': {
      hanja: '長生',
      color: '#10b981',
      strength: '강',
      description: '새로운 시작, 성장의 기운이 왕성함',
      detail: '탄생과 시작의 기운. 발전과 성장이 기대되는 길한 운세입니다.'
    },
    '목욕': {
      hanja: '沐浴',
      color: '#06b6d4',
      strength: '약',
      description: '성장 과정, 변화와 정화의 시기',
      detail: '변화와 정화의 시기. 불안정하지만 새로운 가능성이 있습니다.'
    },
    '관대': {
      hanja: '冠帶',
      color: '#3b82f6',
      strength: '중',
      description: '성장이 완성되어 가는 단계',
      detail: '기틀이 잡히는 시기. 사회적 위치가 확립되어 갑니다.'
    },
    '건록': {
      hanja: '建祿',
      color: '#8b5cf6',
      strength: '강',
      description: '충실하고 안정적인 시기',
      detail: '실력과 재능을 발휘하는 시기. 안정적이고 충실한 운세입니다.'
    },
    '제왕': {
      hanja: '帝旺',
      color: '#d946ef',
      strength: '최강',
      description: '최고의 전성기, 왕성한 기운',
      detail: '인생의 절정기. 권세와 명예가 최고조에 달하는 시기입니다.'
    },
    '쇠': {
      hanja: '衰',
      color: '#f59e0b',
      strength: '약',
      description: '쇠퇴의 시작, 기운이 약해짐',
      detail: '기운이 약해지는 시기. 조심스럽고 신중한 처신이 필요합니다.'
    },
    '병': {
      hanja: '病',
      color: '#ef4444',
      strength: '약',
      description: '어려움이 있는 시기',
      detail: '건강이나 운세에 문제가 생길 수 있는 시기. 주의가 필요합니다.'
    },
    '사': {
      hanja: '死',
      color: '#991b1b',
      strength: '최약',
      description: '활동이 정지됨, 가장 약한 상태',
      detail: '활동이 멈추는 시기. 휴식과 재충전이 필요한 때입니다.'
    },
    '묘': {
      hanja: '墓',
      color: '#78716c',
      strength: '약',
      description: '잠복하여 쉬는 시기',
      detail: '숨어서 때를 기다리는 시기. 준비와 계획의 시간입니다.'
    },
    '절': {
      hanja: '絕',
      color: '#52525b',
      strength: '약',
      description: '끊어짐, 전환의 시기',
      detail: '끝과 새로운 시작 사이. 전환과 변화의 기회가 있습니다.'
    },
    '태': {
      hanja: '胎',
      color: '#a3e635',
      strength: '중',
      description: '새 생명이 잉태됨, 준비의 시기',
      detail: '새로운 가능성이 싹트는 시기. 미래를 준비하는 때입니다.'
    },
    '양': {
      hanja: '養',
      color: '#84cc16',
      strength: '중',
      description: '양육하고 기르는 시기',
      detail: '성장과 발전을 준비하는 시기. 차근차근 키워가는 때입니다.'
    }
  };

  // 기둥별 12운성 데이터
  const pillarData = useMemo(() => {
    if (!twelveUnseong || !fourPillars) return [];

    const pillars = [
      { name: '년주', key: 'year', pillar: fourPillars.year_pillar },
      { name: '월주', key: 'month', pillar: fourPillars.month_pillar },
      { name: '일주', key: 'day', pillar: fourPillars.day_pillar },
      { name: '시주', key: 'hour', pillar: fourPillars.hour_pillar }
    ];

    return pillars.map(p => ({
      ...p,
      unseong: twelveUnseong[p.key],
      info: unseongInfo[twelveUnseong[p.key]]
    }));
  }, [twelveUnseong, fourPillars]);

  // 강약 통계
  const statistics = useMemo(() => {
    const strengths = pillarData.map(p => p.info.strength);
    return {
      strong: strengths.filter(s => s === '강' || s === '최강').length,
      medium: strengths.filter(s => s === '중').length,
      weak: strengths.filter(s => s === '약' || s === '최약').length
    };
  }, [pillarData]);

  if (!twelveUnseong || !fourPillars) return null;

  return (
    <div className="twelve-unseong">
      <div className="twelve-unseong-header">
        <h3>🎯 <TermTooltip term="12운성">12운성 (12運星)</TermTooltip></h3>
        <p className="twelve-unseong-description">
          일간을 기준으로 각 기둥의 생명력과 활동성을 분석합니다
        </p>
      </div>

      {/* 12운성 그리드 */}
      <div className="twelve-unseong-grid">
        {pillarData.map((pillar) => (
          <div
            key={pillar.key}
            className="unseong-card"
            style={{ '--unseong-color': pillar.info.color }}
          >
            <div className="unseong-card-header">
              <span className="unseong-pillar-name">{pillar.name}</span>
              <span className="unseong-pillar-chars">
                {pillar.pillar.heavenly_stem}{pillar.pillar.earthly_branch}
              </span>
            </div>
            <div className="unseong-card-body">
              <div className="unseong-name-container">
                <span className="unseong-name">
                  {showHanja ? `${pillar.info.hanja} (${pillar.unseong})` : pillar.unseong}
                </span>
                <span
                  className="unseong-strength-badge"
                  style={{ backgroundColor: pillar.info.color }}
                >
                  {pillar.info.strength}
                </span>
              </div>
              <p className="unseong-description">{pillar.info.description}</p>
              <p className="unseong-detail">{pillar.info.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 강약 통계 */}
      <div className="twelve-unseong-stats">
        <h4>📊 12운성 강약 분석</h4>
        <div className="unseong-stats-grid">
          <div className="unseong-stat-item">
            <span className="unseong-stat-label">강한 기둥</span>
            <span className="unseong-stat-value strong">{statistics.strong}개</span>
            <span className="unseong-stat-desc">왕성한 활동력</span>
          </div>
          <div className="unseong-stat-item">
            <span className="unseong-stat-label">보통 기둥</span>
            <span className="unseong-stat-value medium">{statistics.medium}개</span>
            <span className="unseong-stat-desc">안정적 상태</span>
          </div>
          <div className="unseong-stat-item">
            <span className="unseong-stat-label">약한 기둥</span>
            <span className="unseong-stat-value weak">{statistics.weak}개</span>
            <span className="unseong-stat-desc">주의 필요</span>
          </div>
        </div>
      </div>

      {/* 12운성 설명 */}
      <div className="twelve-unseong-legend">
        <h4>💡 12운성이란?</h4>
        <p>
          12운성(12運星)은 일간(日干)을 기준으로 각 기둥의 지지(地支)가
          인생의 어느 단계에 있는지를 나타냅니다. 사람의 일생을 12단계로 나누어
          각 시기의 기운과 활동성을 판단합니다.
        </p>
        <div className="unseong-cycle">
          <strong>12운성 순환:</strong>
          <span className="unseong-cycle-text">
            장생 → 목욕 → 관대 → 건록 → 제왕 → 쇠 → 병 → 사 → 묘 → 절 → 태 → 양
          </span>
        </div>
      </div>
    </div>
  );
});

TwelveUnseong.displayName = 'TwelveUnseong';

export default TwelveUnseong;
