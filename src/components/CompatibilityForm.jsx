import React, { useState } from 'react';

const CompatibilityForm = React.memo(({ onSubmit, loading }) => {
  const currentYear = new Date().getFullYear();

  const [person1, setPerson1] = useState({
    year: '',
    month: '',
    day: '',
    hour: '12',
    minute: '0',
    gender: 'male',
    solarLunar: 'solar',
    isLeapMonth: false
  });

  const [person2, setPerson2] = useState({
    year: '',
    month: '',
    day: '',
    hour: '12',
    minute: '0',
    gender: 'female',
    solarLunar: 'solar',
    isLeapMonth: false
  });

  const handlePerson1Change = (e) => {
    const { name, value, type, checked } = e.target;
    setPerson1(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePerson2Change = (e) => {
    const { name, value, type, checked } = e.target;
    setPerson2(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      person1: {
        year: parseInt(person1.year),
        month: parseInt(person1.month),
        day: parseInt(person1.day),
        hour: parseInt(person1.hour),
        minute: parseInt(person1.minute),
        gender: person1.gender,
        is_lunar: person1.solarLunar === 'lunar',
        is_leap_month: person1.solarLunar === 'lunar' && person1.isLeapMonth
      },
      person2: {
        year: parseInt(person2.year),
        month: parseInt(person2.month),
        day: parseInt(person2.day),
        hour: parseInt(person2.hour),
        minute: parseInt(person2.minute),
        gender: person2.gender,
        is_lunar: person2.solarLunar === 'lunar',
        is_leap_month: person2.solarLunar === 'lunar' && person2.isLeapMonth
      }
    });
  };

  const PersonInputSection = ({ person, onChange, label, genderLabel1, genderLabel2 }) => (
    <div className="compatibility-person-section" role="group" aria-labelledby={`${label}-title`}>
      <h3 className="person-label" id={`${label}-title`}>{label}</h3>

      {/* 양력/음력 선택 */}
      <div className="solar-lunar-toggle" role="group" aria-label={`${label} 달력 유형`}>
        <button
          type="button"
          className={`toggle-btn ${person.solarLunar === 'solar' ? 'active' : ''}`}
          onClick={() => onChange({ target: { name: 'solarLunar', value: 'solar' } })}
          aria-pressed={person.solarLunar === 'solar'}
          aria-label={`${label} 양력 선택`}
        >
          양력 ☀️
        </button>
        <button
          type="button"
          className={`toggle-btn ${person.solarLunar === 'lunar' ? 'active' : ''}`}
          onClick={() => onChange({ target: { name: 'solarLunar', value: 'lunar' } })}
          aria-pressed={person.solarLunar === 'lunar'}
          aria-label={`${label} 음력 선택`}
        >
          음력 🌙
        </button>
      </div>

      {/* 생년월일 */}
      <fieldset className="form-row">
        <legend className="visually-hidden">{label} 생년월일</legend>
        <div className="form-group">
          <label htmlFor={`${label}-year`}>년도 *</label>
          <input
            type="number"
            id={`${label}-year`}
            name="year"
            value={person.year}
            onChange={onChange}
            min="1900"
            max={currentYear}
            required
            aria-required="true"
            placeholder="예: 1990"
          />
        </div>
        <div className="form-group">
          <label htmlFor={`${label}-month`}>월 *</label>
          <input
            type="number"
            id={`${label}-month`}
            name="month"
            value={person.month}
            onChange={onChange}
            min="1"
            max="12"
            required
            aria-required="true"
            placeholder="1-12"
          />
        </div>
        <div className="form-group">
          <label htmlFor={`${label}-day`}>일 *</label>
          <input
            type="number"
            id={`${label}-day`}
            name="day"
            value={person.day}
            onChange={onChange}
            min="1"
            max="31"
            required
            aria-required="true"
            placeholder="1-31"
          />
        </div>
      </fieldset>

      {/* 시간 */}
      <fieldset className="form-row">
        <legend className="visually-hidden">{label} 출생 시간 및 성별</legend>
        <div className="form-group">
          <label htmlFor={`${label}-hour`}>시 *</label>
          <input
            type="number"
            id={`${label}-hour`}
            name="hour"
            value={person.hour}
            onChange={onChange}
            min="0"
            max="23"
            required
            aria-required="true"
            aria-describedby={`${label}-hour-description`}
            placeholder="0-23"
          />
          <small id={`${label}-hour-description`}>24시간 형식 (0-23시)</small>
        </div>
        <div className="form-group">
          <label htmlFor={`${label}-minute`}>분</label>
          <input
            type="number"
            id={`${label}-minute`}
            name="minute"
            value={person.minute}
            onChange={onChange}
            min="0"
            max="59"
            placeholder="0-59"
          />
        </div>
        <div className="form-group">
          <label htmlFor={`${label}-gender`}>성별 *</label>
          <select
            id={`${label}-gender`}
            name="gender"
            value={person.gender}
            onChange={onChange}
            required
            aria-required="true"
          >
            <option value="male">{genderLabel1 || '남성'}</option>
            <option value="female">{genderLabel2 || '여성'}</option>
          </select>
        </div>
      </fieldset>

      {/* 윤달 체크박스 (음력일 때만) */}
      {person.solarLunar === 'lunar' && (
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              id={`${label}-leap-month`}
              name="isLeapMonth"
              checked={person.isLeapMonth}
              onChange={onChange}
              aria-describedby={`${label}-leap-description`}
            />
            <span>윤달</span>
          </label>
          <small id={`${label}-leap-description`}>해당 월이 윤달인 경우 체크해주세요</small>
        </div>
      )}
    </div>
  );

  return (
    <form
      className="compatibility-form"
      onSubmit={handleSubmit}
      aria-label="궁합 분석 입력 폼"
    >
      <div className="compatibility-form-header">
        <h2 id="compatibility-form-title">💕 궁합 분석</h2>
        <p id="compatibility-form-description">두 사람의 생년월일을 입력해주세요</p>
      </div>

      <div
        className="compatibility-persons"
        role="group"
        aria-labelledby="compatibility-form-title"
        aria-describedby="compatibility-form-description"
      >
        <PersonInputSection
          person={person1}
          onChange={handlePerson1Change}
          label="첫 번째 사람"
          genderLabel1="남성"
          genderLabel2="여성"
        />

        <div className="compatibility-divider" aria-hidden="true">
          <div className="divider-line"></div>
          <div className="divider-icon">❤️</div>
          <div className="divider-line"></div>
        </div>

        <PersonInputSection
          person={person2}
          onChange={handlePerson2Change}
          label="두 번째 사람"
          genderLabel1="남성"
          genderLabel2="여성"
        />
      </div>

      <button
        type="submit"
        className="compatibility-submit-button"
        disabled={loading}
        aria-busy={loading}
        aria-live="polite"
      >
        {loading ? '궁합 분석 중...' : '💝 궁합 보기'}
      </button>
    </form>
  );
});

CompatibilityForm.displayName = 'CompatibilityForm';

export default CompatibilityForm;
