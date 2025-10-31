import React from 'react';
import './PDFLayout.css';

const PDFLayout = React.memo(({ result, birthInfo }) => {
  if (!result || !birthInfo) return null;

  const currentDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="pdf-layout" id="pdf-content">
      {/* 헤더 */}
      <div className="pdf-header">
        <h1 className="pdf-title">🔮 사주 풀이 결과</h1>
        <p className="pdf-subtitle">Claude AI 기반 사주팔자 계산 및 해석</p>
        <div className="pdf-date">발급일: {currentDate}</div>
      </div>

      <div className="pdf-divider"></div>

      {/* 생년월일시 정보 */}
      <div className="pdf-section">
        <h2 className="pdf-section-title">📅 생년월일시</h2>
        <div className="pdf-birth-info">
          <table className="pdf-table">
            <tbody>
              <tr>
                <td className="pdf-table-label">출생 연월일</td>
                <td className="pdf-table-value">
                  {birthInfo.year}년 {birthInfo.month}월 {birthInfo.day}일
                </td>
              </tr>
              <tr>
                <td className="pdf-table-label">출생 시간</td>
                <td className="pdf-table-value">
                  {birthInfo.hour}시 {birthInfo.minute || 0}분
                </td>
              </tr>
              <tr>
                <td className="pdf-table-label">성별</td>
                <td className="pdf-table-value">
                  {birthInfo.gender === 'male' ? '남성' : '여성'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 사주팔자 */}
      <div className="pdf-section">
        <h2 className="pdf-section-title">📋 사주팔자</h2>
        <div className="pdf-pillars">
          <div className="pdf-pillar">
            <div className="pdf-pillar-label">년주</div>
            <div className="pdf-pillar-value">
              <span className="pdf-stem">{result.saju_result.year_pillar.heavenly_stem}</span>
              <span className="pdf-branch">{result.saju_result.year_pillar.earthly_branch}</span>
            </div>
          </div>
          <div className="pdf-pillar">
            <div className="pdf-pillar-label">월주</div>
            <div className="pdf-pillar-value">
              <span className="pdf-stem">{result.saju_result.month_pillar.heavenly_stem}</span>
              <span className="pdf-branch">{result.saju_result.month_pillar.earthly_branch}</span>
            </div>
          </div>
          <div className="pdf-pillar">
            <div className="pdf-pillar-label">일주</div>
            <div className="pdf-pillar-value">
              <span className="pdf-stem">{result.saju_result.day_pillar.heavenly_stem}</span>
              <span className="pdf-branch">{result.saju_result.day_pillar.earthly_branch}</span>
            </div>
          </div>
          <div className="pdf-pillar">
            <div className="pdf-pillar-label">시주</div>
            <div className="pdf-pillar-value">
              <span className="pdf-stem">{result.saju_result.hour_pillar.heavenly_stem}</span>
              <span className="pdf-branch">{result.saju_result.hour_pillar.earthly_branch}</span>
            </div>
          </div>
        </div>
        <div className="pdf-day-master">
          <strong>일간:</strong> {result.saju_result.day_master}
        </div>
      </div>

      {/* 오행 분석 */}
      <div className="pdf-section">
        <h2 className="pdf-section-title">🔥 오행 분석</h2>
        <table className="pdf-table pdf-elements-table">
          <thead>
            <tr>
              <th>목(木)</th>
              <th>화(火)</th>
              <th>토(土)</th>
              <th>금(金)</th>
              <th>수(水)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{result.saju_result.five_elements.wood}</td>
              <td>{result.saju_result.five_elements.fire}</td>
              <td>{result.saju_result.five_elements.earth}</td>
              <td>{result.saju_result.five_elements.metal}</td>
              <td>{result.saju_result.five_elements.water}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 십성 분석 */}
      <div className="pdf-section">
        <h2 className="pdf-section-title">⭐ 십성 분석</h2>
        <div className="pdf-ten-gods">
          {Object.entries(result.saju_result.ten_gods).map(([key, value]) => (
            value > 0 && (
              <div key={key} className="pdf-ten-god-item">
                <span className="pdf-ten-god-name">{key}</span>
                <span className="pdf-ten-god-value">{value}</span>
              </div>
            )
          ))}
        </div>
      </div>

      {/* AI 해석 */}
      <div className="pdf-section pdf-interpretation">
        <h2 className="pdf-section-title">🤖 AI 해석</h2>
        <div className="pdf-interpretation-content">
          {result.interpretation.interpretation.split('\n').map((paragraph, index) => (
            paragraph.trim() && <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* 푸터 */}
      <div className="pdf-footer">
        <div className="pdf-footer-divider"></div>
        <p>본 사주 풀이는 AI(Claude)를 활용한 참고 자료입니다.</p>
        <p className="pdf-footer-small">Made with ❤️ and 🤖 Claude AI</p>
      </div>
    </div>
  );
});

PDFLayout.displayName = 'PDFLayout';

export default PDFLayout;
