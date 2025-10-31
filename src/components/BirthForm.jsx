import React from 'react';

const BirthForm = React.memo(({
  formData,
  onInputChange,
  onSubmit,
  loading,
  isStreaming,
  useStreaming,
  onStreamingToggle,
  currentYear,
  solarLunar,
  onSolarLunarChange,
  isLeapMonth,
  onLeapMonthChange,
  timeUnknown,
  onTimeUnknownChange
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="birth-form"
      aria-label="사주 정보 입력 폼"
    >
      <h2 id="form-title">생년월일시 입력</h2>

      {/* 음력/양력 토글 */}
      <div
        className="calendar-type-toggle"
        role="group"
        aria-labelledby="calendar-type-label"
      >
        <span id="calendar-type-label" className="visually-hidden">달력 유형 선택</span>
        <button
          type="button"
          className={solarLunar === 'solar' ? 'active' : ''}
          onClick={() => onSolarLunarChange('solar')}
          aria-pressed={solarLunar === 'solar'}
          aria-label="양력 선택"
        >
          양력
        </button>
        <button
          type="button"
          className={solarLunar === 'lunar' ? 'active' : ''}
          onClick={() => onSolarLunarChange('lunar')}
          aria-pressed={solarLunar === 'lunar'}
          aria-label="음력 선택"
        >
          음력
        </button>
      </div>

      {/* 윤달 옵션 (음력일 때만 표시) */}
      {solarLunar === 'lunar' && (
        <div className="leap-month-option">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isLeapMonth}
              onChange={onLeapMonthChange}
              className="checkbox-input"
              aria-describedby="leap-month-description"
            />
            <span className="checkbox-text">
              🌙 윤달입니다
              <small id="leap-month-description">음력에서 윤달이 있는 달에 태어났을 경우 체크하세요</small>
            </span>
          </label>
        </div>
      )}

      <fieldset className="form-row">
        <legend className="visually-hidden">출생 연월일</legend>
        <div className="form-group">
          <label htmlFor="year">출생 연도 {solarLunar === 'solar' ? '(양력)' : '(음력)'}</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={onInputChange}
            min="1900"
            max={currentYear}
            required
            aria-required="true"
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
            onChange={onInputChange}
            min="1"
            max="12"
            required
            aria-required="true"
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
            onChange={onInputChange}
            min="1"
            max="31"
            required
            aria-required="true"
            placeholder="1-31"
          />
        </div>
      </fieldset>

      <fieldset className="form-row">
        <legend className="visually-hidden">출생 시간 및 성별</legend>
        <div className="form-group">
          <label htmlFor="hour">출생 시</label>
          <input
            type="number"
            id="hour"
            name="hour"
            value={formData.hour}
            onChange={onInputChange}
            min="0"
            max="23"
            required={!timeUnknown}
            disabled={timeUnknown}
            aria-disabled={timeUnknown}
            aria-required={!timeUnknown}
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
            onChange={onInputChange}
            min="0"
            max="59"
            disabled={timeUnknown}
            aria-disabled={timeUnknown}
            placeholder="0-59"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">성별</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={onInputChange}
            aria-required="true"
          >
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>
      </fieldset>

      {/* 시간 모름 옵션 */}
      <div className="time-unknown-option">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={timeUnknown}
            onChange={onTimeUnknownChange}
            className="checkbox-input"
            aria-describedby="time-unknown-description"
          />
          <span className="checkbox-text">
            ⏰ 태어난 시간을 모릅니다
            <small id="time-unknown-description">시간을 모를 경우 정오(12시)를 기준으로 계산됩니다</small>
          </span>
        </label>
      </div>

      <div className="form-group full-width">
        <label htmlFor="question">질문 (선택사항)</label>
        <input
          type="text"
          id="question"
          name="question"
          value={formData.question}
          onChange={onInputChange}
          placeholder="예: 제 연애운은 어떤가요?"
          aria-describedby="question-description"
        />
        <small id="question-description">특정 주제를 물어보거나 비워두면 전체 운세를 분석합니다.</small>
      </div>

      <div className="streaming-toggle">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={useStreaming}
            onChange={onStreamingToggle}
            className="toggle-checkbox"
            role="switch"
            aria-checked={useStreaming}
            aria-describedby="streaming-description"
          />
          <span className="toggle-switch" aria-hidden="true"></span>
          <span className="toggle-text">
            🔄 실시간 스트리밍 모드
            <small id="streaming-description">AI 해석을 실시간으로 확인합니다</small>
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={loading}
        aria-busy={loading}
        aria-live="polite"
      >
        {loading ? (isStreaming ? '해석 생성 중...' : '분석 중...') : '사주 풀이 시작'}
      </button>
    </form>
  );
});

BirthForm.displayName = 'BirthForm';

export default BirthForm;
