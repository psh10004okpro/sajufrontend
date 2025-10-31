import { useState } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

function App() {
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '0',
    gender: 'male',
    question: '전체적인 운세를 알려주세요'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const birthInfo = {
        year: parseInt(formData.year),
        month: parseInt(formData.month),
        day: parseInt(formData.day),
        hour: parseInt(formData.hour),
        minute: parseInt(formData.minute) || 0,
        gender: formData.gender
      };

      const response = await fetch(`${API_BASE_URL}/api/v1/full-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          birth_info: birthInfo,
          question: formData.question || '전체적인 운세를 알려주세요',
          detail_level: 'normal',
          tone: 'friendly'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || '사주 분석 중 오류가 발생했습니다.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔮 사주 풀이</h1>
        <p>Claude AI 기반 사주팔자 계산 및 해석</p>
      </header>

      <main className="app-main">
        <form onSubmit={handleSubmit} className="birth-form">
          <h2>생년월일시 입력</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="year">출생 연도 (양력)</label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                min="1900"
                max={currentYear}
                required
                placeholder="예: 1990"
              />
            </div>

            <div className="form-group">
              <label htmlFor="month">출생 월</label>
              <input
                type="number"
                id="month"
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                min="1"
                max="12"
                required
                placeholder="1-12"
              />
            </div>

            <div className="form-group">
              <label htmlFor="day">출생 일</label>
              <input
                type="number"
                id="day"
                name="day"
                value={formData.day}
                onChange={handleInputChange}
                min="1"
                max="31"
                required
                placeholder="1-31"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hour">출생 시</label>
              <input
                type="number"
                id="hour"
                name="hour"
                value={formData.hour}
                onChange={handleInputChange}
                min="0"
                max="23"
                required
                placeholder="0-23"
              />
            </div>

            <div className="form-group">
              <label htmlFor="minute">출생 분</label>
              <input
                type="number"
                id="minute"
                name="minute"
                value={formData.minute}
                onChange={handleInputChange}
                min="0"
                max="59"
                placeholder="0-59"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">성별</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="question">질문 (선택사항)</label>
            <input
              type="text"
              id="question"
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              placeholder="예: 제 연애운은 어떤가요?"
            />
            <small>특정 주제를 물어보거나 비워두면 전체 운세를 분석합니다.</small>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? '분석 중...' : '사주 풀이 시작'}
          </button>
        </form>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>사주팔자를 계산하고 해석하는 중입니다...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <h3>⚠️ 오류가 발생했습니다</h3>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="result-container">
            <div className="saju-result">
              <h2>📋 사주팔자</h2>

              <div className="pillars">
                <div className="pillar">
                  <h3>년주</h3>
                  <div className="pillar-chars">
                    <span className="heavenly-stem">{result.saju_result.year_pillar.heavenly_stem}</span>
                    <span className="earthly-branch">{result.saju_result.year_pillar.earthly_branch}</span>
                  </div>
                </div>

                <div className="pillar">
                  <h3>월주</h3>
                  <div className="pillar-chars">
                    <span className="heavenly-stem">{result.saju_result.month_pillar.heavenly_stem}</span>
                    <span className="earthly-branch">{result.saju_result.month_pillar.earthly_branch}</span>
                  </div>
                </div>

                <div className="pillar">
                  <h3>일주</h3>
                  <div className="pillar-chars">
                    <span className="heavenly-stem">{result.saju_result.day_pillar.heavenly_stem}</span>
                    <span className="earthly-branch">{result.saju_result.day_pillar.earthly_branch}</span>
                  </div>
                </div>

                <div className="pillar">
                  <h3>시주</h3>
                  <div className="pillar-chars">
                    <span className="heavenly-stem">{result.saju_result.hour_pillar.heavenly_stem}</span>
                    <span className="earthly-branch">{result.saju_result.hour_pillar.earthly_branch}</span>
                  </div>
                </div>
              </div>

              <div className="analysis-sections">
                <div className="analysis-section">
                  <h3>🔥 오행 분석</h3>
                  <div className="elements">
                    <div className="element">
                      <span className="element-name">목(木)</span>
                      <span className="element-value">{result.saju_result.five_elements.wood}</span>
                    </div>
                    <div className="element">
                      <span className="element-name">화(火)</span>
                      <span className="element-value">{result.saju_result.five_elements.fire}</span>
                    </div>
                    <div className="element">
                      <span className="element-name">토(土)</span>
                      <span className="element-value">{result.saju_result.five_elements.earth}</span>
                    </div>
                    <div className="element">
                      <span className="element-name">금(金)</span>
                      <span className="element-value">{result.saju_result.five_elements.metal}</span>
                    </div>
                    <div className="element">
                      <span className="element-name">수(水)</span>
                      <span className="element-value">{result.saju_result.five_elements.water}</span>
                    </div>
                  </div>
                </div>

                <div className="analysis-section">
                  <h3>⭐ 십성 분석</h3>
                  <div className="ten-gods">
                    {Object.entries(result.saju_result.ten_gods).map(([key, value]) => (
                      value > 0 && (
                        <div key={key} className="ten-god-item">
                          <span className="ten-god-name">{key}</span>
                          <span className="ten-god-value">{value}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="interpretation-result">
              <h2>🤖 AI 해석</h2>
              <div className="interpretation-content">
                {result.interpretation.interpretation.split('\n').map((paragraph, index) => (
                  paragraph.trim() && <p key={index}>{paragraph}</p>
                ))}
              </div>
              {result.interpretation.topics_covered && result.interpretation.topics_covered.length > 0 && (
                <div className="topics-covered">
                  <h4>다룬 주제</h4>
                  <div className="topics-list">
                    {result.interpretation.topics_covered.map((topic, index) => (
                      <span key={index} className="topic-tag">{topic}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Made with Claude AI 🤖</p>
      </footer>
    </div>
  );
}

export default App;
