import { useState } from 'react';

const CompatibilityForm = ({ onSubmit, loading }) => {
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
    <div className="compatibility-person-section">
      <h3 className="person-label">{label}</h3>

      {/* 양력/음력 선택 */}
      <div className="solar-lunar-toggle">
        <button
          type="button"
          className={`toggle-btn ${person.solarLunar === 'solar' ? 'active' : ''}`}
          onClick={() => onChange({ target: { name: 'solarLunar', value: 'solar' } })}
        >
          양력 ☀️
        </button>
        <button
          type="button"
          className={`toggle-btn ${person.solarLunar === 'lunar' ? 'active' : ''}`}
          onClick={() => onChange({ target: { name: 'solarLunar', value: 'lunar' } })}
        >
          음력 🌙
        </button>
      </div>

      {/* 생년월일 */}
      <div className="form-row">
        <div className="form-group">
          <label>년도 *</label>
          <input
            type="number"
            name="year"
            value={person.year}
            onChange={onChange}
            min="1900"
            max={currentYear}
            required
            placeholder="예: 1990"
          />
        </div>
        <div className="form-group">
          <label>월 *</label>
          <input
            type="number"
            name="month"
            value={person.month}
            onChange={onChange}
            min="1"
            max="12"
            required
            placeholder="1-12"
          />
        </div>
        <div className="form-group">
          <label>일 *</label>
          <input
            type="number"
            name="day"
            value={person.day}
            onChange={onChange}
            min="1"
            max="31"
            required
            placeholder="1-31"
          />
        </div>
      </div>

      {/* 시간 */}
      <div className="form-row">
        <div className="form-group">
          <label>시 *</label>
          <input
            type="number"
            name="hour"
            value={person.hour}
            onChange={onChange}
            min="0"
            max="23"
            required
            placeholder="0-23"
          />
          <small>24시간 형식 (0-23시)</small>
        </div>
        <div className="form-group">
          <label>분</label>
          <input
            type="number"
            name="minute"
            value={person.minute}
            onChange={onChange}
            min="0"
            max="59"
            placeholder="0-59"
          />
        </div>
        <div className="form-group">
          <label>성별 *</label>
          <select
            name="gender"
            value={person.gender}
            onChange={onChange}
            required
          >
            <option value="male">{genderLabel1 || '남성'}</option>
            <option value="female">{genderLabel2 || '여성'}</option>
          </select>
        </div>
      </div>

      {/* 윤달 체크박스 (음력일 때만) */}
      {person.solarLunar === 'lunar' && (
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isLeapMonth"
              checked={person.isLeapMonth}
              onChange={onChange}
            />
            <span>윤달</span>
          </label>
          <small>해당 월이 윤달인 경우 체크해주세요</small>
        </div>
      )}
    </div>
  );

  return (
    <form className="compatibility-form" onSubmit={handleSubmit}>
      <div className="compatibility-form-header">
        <h2>💕 궁합 분석</h2>
        <p>두 사람의 생년월일을 입력해주세요</p>
      </div>

      <div className="compatibility-persons">
        <PersonInputSection
          person={person1}
          onChange={handlePerson1Change}
          label="첫 번째 사람"
          genderLabel1="남성"
          genderLabel2="여성"
        />

        <div className="compatibility-divider">
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
      >
        {loading ? '궁합 분석 중...' : '💝 궁합 보기'}
      </button>
    </form>
  );
};

export default CompatibilityForm;
