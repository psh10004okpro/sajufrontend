import { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react'
import './App.css'
import {
  saveToHistory,
  getHistory,
  deleteHistoryItem,
  clearHistory,
  saveBookmark,
  getBookmarks,
  deleteBookmark,
  isBookmarked as checkIsBookmarked,
  convertToText,
  copyToClipboard
} from './utils/storage'
import { generatePDFFromHTML } from './utils/pdfGenerator'

// 작은 컴포넌트는 직접 import
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import StreamingIndicator from './components/StreamingIndicator'
import ResultActions from './components/ResultActions'

// 큰 컴포넌트는 지연 로딩
const BirthForm = lazy(() => import('./components/BirthForm'))
const Sidebar = lazy(() => import('./components/Sidebar'))
const SajuResult = lazy(() => import('./components/SajuResult'))
const InterpretationResult = lazy(() => import('./components/InterpretationResult'))
const PDFLayout = lazy(() => import('./components/PDFLayout'))
const DaeunTimeline = lazy(() => import('./components/DaeunTimeline'))
const SaeunCard = lazy(() => import('./components/SaeunCard'))
const LifeStageAnalysis = lazy(() => import('./components/LifeStageAnalysis'))
const CategoryTabs = lazy(() => import('./components/CategoryTabs'))
const OhangChart = lazy(() => import('./components/OhangChart'))
const TwelveUnseong = lazy(() => import('./components/TwelveUnseong'))
const Sinsal = lazy(() => import('./components/Sinsal'))
const CompatibilityForm = lazy(() => import('./components/CompatibilityForm'))
const CompatibilityResult = lazy(() => import('./components/CompatibilityResult'))

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

function App() {
  // 모드 선택 (saju 또는 compatibility)
  const [mode, setMode] = useState('saju');
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '0',
    gender: 'male',
    question: '전체적인 운세를 알려주세요'
  });

  // Quick Wins 상태
  const [solarLunar, setSolarLunar] = useState('solar'); // 'solar' or 'lunar'
  const [isLeapMonth, setIsLeapMonth] = useState(false); // 윤달 여부
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [showHanja, setShowHanja] = useState(false); // 한자 표시 옵션

  // 궁합 관련 상태
  const [compatibilityResult, setCompatibilityResult] = useState(null);
  const [compatibilityLoading, setCompatibilityLoading] = useState(false);
  const [compatibilityError, setCompatibilityError] = useState(null);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useStreaming, setUseStreaming] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const abortControllerRef = useRef(null);

  // 히스토리 & 북마크 상태
  const [history, setHistory] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarTab, setSidebarTab] = useState('history');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // PDF 상태
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  // 분야별 운세 상태
  const [activeCategory, setActiveCategory] = useState('overall');
  const [categoryInterpretations, setCategoryInterpretations] = useState({});
  const [categoryLoading, setCategoryLoading] = useState(false);

  // 초기 로드
  useEffect(() => {
    setHistory(getHistory());
    setBookmarks(getBookmarks());
  }, []);

  // 메모이제이션된 핸들러들
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSolarLunarChange = useCallback((type) => {
    setSolarLunar(type);
    // 양력으로 변경 시 윤달 체크 해제
    if (type === 'solar') {
      setIsLeapMonth(false);
    }
  }, []);

  const handleLeapMonthChange = useCallback((e) => {
    setIsLeapMonth(e.target.checked);
  }, []);

  const handleTimeUnknownChange = useCallback((e) => {
    const checked = e.target.checked;
    setTimeUnknown(checked);
    if (checked) {
      // 시간 모름 체크 시 정오(12시)로 설정
      setFormData(prev => ({
        ...prev,
        hour: '12',
        minute: '0'
      }));
    }
  }, []);

  // 분야별 질문 생성
  const getCategoryQuestion = useCallback((category) => {
    const questions = {
      overall: '전체적인 운세를 종합적으로 알려주세요',
      love: '애정운과 결혼운에 대해 자세히 알려주세요. 연애, 배우자, 이성 관계에 대한 운세를 분석해주세요',
      wealth: '재물운과 금전운에 대해 자세히 알려주세요. 수입, 재산, 투자, 사업 운세를 분석해주세요',
      career: '직업운과 사업운에 대해 자세히 알려주세요. 직장, 승진, 창업, 경력 발전에 대한 운세를 분석해주세요',
      health: '건강운과 신체 운세에 대해 자세히 알려주세요. 건강 관리, 주의할 질병, 신체적 특징을 분석해주세요',
      study: '학업운과 시험운에 대해 자세히 알려주세요. 학습, 시험, 자격증, 학업 성취에 대한 운세를 분석해주세요'
    };
    return questions[category] || questions.overall;
  }, []);

  // 분야별 해석 가져오기
  const fetchCategoryInterpretation = useCallback(async (category) => {
    if (!result || !result.saju_result) return;

    // 이미 해석이 있으면 반환
    if (categoryInterpretations[category]) {
      return;
    }

    setCategoryLoading(true);
    try {
      const question = getCategoryQuestion(category);

      if (useStreaming) {
        // 스트리밍 방식
        setIsStreaming(true);
        setStreamingText('');

        abortControllerRef.current = new AbortController();

        const streamResponse = await fetch(`${API_BASE_URL}/api/v1/interpret/stream`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            saju_result: result.saju_result,
            question: question,
            detail_level: 'normal',
          }),
          signal: abortControllerRef.current.signal
        });

        if (!streamResponse.ok) {
          throw new Error('AI 해석 스트리밍 중 오류가 발생했습니다.');
        }

        const reader = streamResponse.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter(line => line.trim() !== '');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') break;

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  fullText += parsed.content;
                  setStreamingText(fullText);
                }
              } catch (e) {
                console.error('JSON 파싱 오류:', e);
              }
            }
          }
        }

        setCategoryInterpretations(prev => ({
          ...prev,
          [category]: fullText
        }));
        setIsStreaming(false);
      } else {
        // 일반 방식
        const response = await fetch(`${API_BASE_URL}/api/v1/interpret`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            saju_result: result.saju_result,
            question: question,
            detail_level: 'normal'
          })
        });

        if (!response.ok) {
          throw new Error('AI 해석 중 오류가 발생했습니다.');
        }

        const data = await response.json();
        setCategoryInterpretations(prev => ({
          ...prev,
          [category]: data.interpretation
        }));
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('해석 취소됨');
      } else {
        console.error('분야별 해석 오류:', err);
        setError(err.message);
      }
    } finally {
      setCategoryLoading(false);
    }
  }, [result, categoryInterpretations, getCategoryQuestion, useStreaming]);

  // 분야 변경 핸들러
  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    setStreamingText('');

    // overall이 아니고 해석이 없으면 가져오기
    if (category !== 'overall' && !categoryInterpretations[category]) {
      fetchCategoryInterpretation(category);
    }
  }, [categoryInterpretations, fetchCategoryInterpretation]);

  const handleStreamingAnalysis = useCallback(async (birthInfo) => {
    try {
      const calculateResponse = await fetch(`${API_BASE_URL}/api/v1/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(birthInfo)
      });

      if (!calculateResponse.ok) {
        const errorData = await calculateResponse.json();
        throw new Error(errorData.detail || '사주 계산 중 오류가 발생했습니다.');
      }

      const sajuResult = await calculateResponse.json();

      setResult({
        saju_result: sajuResult,
        interpretation: { interpretation: '', topics_covered: [] }
      });

      setIsStreaming(true);
      setStreamingText('');

      abortControllerRef.current = new AbortController();

      const streamResponse = await fetch(`${API_BASE_URL}/api/v1/interpret/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          saju_result: sajuResult,
          question: formData.question || '전체적인 운세를 알려주세요',
          detail_level: 'normal',
          tone: 'friendly'
        }),
        signal: abortControllerRef.current.signal
      });

      if (!streamResponse.ok) {
        throw new Error('스트리밍 해석 중 오류가 발생했습니다.');
      }

      const reader = streamResponse.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;
        setStreamingText(accumulatedText);
      }

      const finalResult = {
        saju_result: sajuResult,
        interpretation: { interpretation: accumulatedText, topics_covered: [] }
      };
      setResult(finalResult);

      // 전체 해석을 overall 카테고리에 저장
      setCategoryInterpretations({ overall: accumulatedText });
      setActiveCategory('overall');

      saveToHistory({
        birth_info: birthInfo,
        saju_result: sajuResult,
        interpretation: { interpretation: accumulatedText, topics_covered: [] },
        question: formData.question
      });
      setHistory(getHistory());

    } catch (err) {
      if (err.name === 'AbortError') {
        setError('스트리밍이 취소되었습니다.');
      } else {
        setError(err.message);
      }
    } finally {
      setIsStreaming(false);
      setLoading(false);
    }
  }, [formData.question]);

  const handleNormalAnalysis = useCallback(async (birthInfo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/full-analysis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

      // 전체 해석을 overall 카테고리에 저장
      setCategoryInterpretations({ overall: data.interpretation.interpretation });
      setActiveCategory('overall');

      saveToHistory({
        birth_info: birthInfo,
        saju_result: data.saju_result,
        interpretation: data.interpretation,
        question: formData.question
      });
      setHistory(getHistory());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [formData.question]);

  const handleCompatibilitySubmit = useCallback(async (data) => {
    setCompatibilityLoading(true);
    setCompatibilityError(null);
    setCompatibilityResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/compatibility`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          person1: data.person1,
          person2: data.person2,
          question: '두 사람의 궁합을 상세히 분석해주세요'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || '궁합 분석 중 오류가 발생했습니다.');
      }

      const result = await response.json();
      setCompatibilityResult(result);
    } catch (err) {
      setCompatibilityError(err.message);
    } finally {
      setCompatibilityLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setStreamingText('');
    setCategoryInterpretations({});
    setActiveCategory('overall');

    const birthInfo = {
      year: parseInt(formData.year),
      month: parseInt(formData.month),
      day: parseInt(formData.day),
      hour: parseInt(formData.hour),
      minute: parseInt(formData.minute) || 0,
      gender: formData.gender,
      is_lunar: solarLunar === 'lunar',
      is_leap_month: solarLunar === 'lunar' && isLeapMonth
    };

    if (useStreaming) {
      await handleStreamingAnalysis(birthInfo);
    } else {
      await handleNormalAnalysis(birthInfo);
    }
  }, [formData, useStreaming, solarLunar, isLeapMonth, handleStreamingAnalysis, handleNormalAnalysis]);

  const handleCancelStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const handleToggleBookmark = useCallback(() => {
    if (!result) return;

    const birthInfo = result.saju_result.birth_info;

    if (isBookmarked) {
      const bookmarkToDelete = bookmarks.find(bookmark =>
        bookmark.birthInfo.year === birthInfo.year &&
        bookmark.birthInfo.month === birthInfo.month &&
        bookmark.birthInfo.day === birthInfo.day &&
        bookmark.birthInfo.hour === birthInfo.hour &&
        bookmark.birthInfo.gender === birthInfo.gender
      );
      if (bookmarkToDelete) {
        deleteBookmark(bookmarkToDelete.id);
        setBookmarks(getBookmarks());
        setIsBookmarked(false);
      }
    } else {
      saveBookmark({
        birthInfo: birthInfo,
        sajuResult: result.saju_result,
        interpretation: result.interpretation
      });
      setBookmarks(getBookmarks());
      setIsBookmarked(true);
    }
  }, [result, bookmarks, isBookmarked]);

  const handleShare = useCallback(async () => {
    if (!result) return;

    const text = convertToText(result);
    const success = await copyToClipboard(text);

    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  }, [result]);

  const handlePDFPreview = useCallback(() => {
    setShowPDFPreview(true);
  }, []);

  const handleClosePDFPreview = useCallback(() => {
    setShowPDFPreview(false);
  }, []);

  const handleDownloadPDF = useCallback(async () => {
    if (!result) return;

    setPdfGenerating(true);
    try {
      const element = document.getElementById('pdf-content');
      if (element) {
        const birthInfo = result.saju_result.birth_info;
        const filename = `사주풀이_${birthInfo.year}년${birthInfo.month}월${birthInfo.day}일_${birthInfo.hour}시.pdf`;
        await generatePDFFromHTML(element, filename);
        setShowPDFPreview(false);
      }
    } catch (error) {
      console.error('PDF 생성 오류:', error);
      alert('PDF 생성 중 오류가 발생했습니다.');
    } finally {
      setPdfGenerating(false);
    }
  }, [result]);

  const handleHistoryItemClick = useCallback((item) => {
    setResult({
      saju_result: item.sajuResult,
      interpretation: item.interpretation
    });
    setFormData({
      year: item.birthInfo.year.toString(),
      month: item.birthInfo.month.toString(),
      day: item.birthInfo.day.toString(),
      hour: item.birthInfo.hour.toString(),
      minute: item.birthInfo.minute?.toString() || '0',
      gender: item.birthInfo.gender,
      question: item.question || '전체 운세'
    });
    setShowSidebar(false);
    setIsBookmarked(checkIsBookmarked(item.birthInfo));
  }, []);

  const handleBookmarkItemClick = useCallback((item) => {
    setResult({
      saju_result: item.sajuResult,
      interpretation: item.interpretation
    });
    setFormData({
      year: item.birthInfo.year.toString(),
      month: item.birthInfo.month.toString(),
      day: item.birthInfo.day.toString(),
      hour: item.birthInfo.hour.toString(),
      minute: item.birthInfo.minute?.toString() || '0',
      gender: item.birthInfo.gender,
      question: '전체 운세'
    });
    setShowSidebar(false);
    setIsBookmarked(true);
  }, []);

  const handleDeleteHistory = useCallback((id) => {
    deleteHistoryItem(id);
    setHistory(getHistory());
  }, []);

  const handleClearHistory = useCallback(() => {
    if (window.confirm('전체 히스토리를 삭제하시겠습니까?')) {
      clearHistory();
      setHistory([]);
    }
  }, []);

  const handleDeleteBookmark = useCallback((id) => {
    deleteBookmark(id);
    setBookmarks(getBookmarks());

    if (result && result.saju_result.birth_info) {
      setIsBookmarked(checkIsBookmarked(result.saju_result.birth_info));
    }
  }, [result]);

  // 결과가 변경될 때 북마크 상태 확인
  useEffect(() => {
    if (result && result.saju_result.birth_info) {
      setIsBookmarked(checkIsBookmarked(result.saju_result.birth_info));
    }
  }, [result]);

  const currentYear = new Date().getFullYear();

  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <Sidebar
          show={showSidebar}
          onClose={() => setShowSidebar(false)}
          tab={sidebarTab}
          onTabChange={setSidebarTab}
          history={history}
          bookmarks={bookmarks}
          onHistoryItemClick={handleHistoryItemClick}
          onBookmarkItemClick={handleBookmarkItemClick}
          onDeleteHistory={handleDeleteHistory}
          onDeleteBookmark={handleDeleteBookmark}
          onClearHistory={handleClearHistory}
        />
      </Suspense>

      <header className="app-header">
        <div className="header-content">
          <button
            className="history-button"
            onClick={() => setShowSidebar(true)}
            aria-label="히스토리 열기"
          >
            📜 히스토리
          </button>
          <div className="header-title">
            <h1>🔮 사주 풀이</h1>
            <p>Claude AI 기반 사주팔자 계산 및 해석</p>
            {/* 모드 선택 탭 */}
            <div
              className="mode-tabs"
              role="tablist"
              aria-label="사주 분석 모드 선택"
            >
              <button
                className={`mode-tab ${mode === 'saju' ? 'active' : ''}`}
                onClick={() => setMode('saju')}
                role="tab"
                aria-selected={mode === 'saju'}
                aria-controls="saju-panel"
                id="saju-tab"
              >
                📜 사주 보기
              </button>
              <button
                className={`mode-tab ${mode === 'compatibility' ? 'active' : ''}`}
                onClick={() => setMode('compatibility')}
                role="tab"
                aria-selected={mode === 'compatibility'}
                aria-controls="compatibility-panel"
                id="compatibility-tab"
              >
                💕 궁합 보기
              </button>
            </div>
          </div>
          <button
            className="hanja-toggle-button"
            onClick={() => setShowHanja(!showHanja)}
            aria-label={showHanja ? '한글로 표시' : '한자로 표시'}
            aria-pressed={showHanja}
          >
            {showHanja ? '🔤 한글' : '㊥ 漢字'}
          </button>
        </div>
      </header>

      <main className="app-main">
        {/* 사주 모드 */}
        {mode === 'saju' && (
          <Suspense fallback={<LoadingSpinner message="폼 로딩 중..." />}>
            <BirthForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            loading={loading}
            isStreaming={isStreaming}
            useStreaming={useStreaming}
            onStreamingToggle={(e) => setUseStreaming(e.target.checked)}
            currentYear={currentYear}
            solarLunar={solarLunar}
            onSolarLunarChange={handleSolarLunarChange}
            isLeapMonth={isLeapMonth}
            onLeapMonthChange={handleLeapMonthChange}
            timeUnknown={timeUnknown}
            onTimeUnknownChange={handleTimeUnknownChange}
          />
        </Suspense>
        )}

        {/* 궁합 모드 */}
        {mode === 'compatibility' && (
          <>
            <Suspense fallback={<LoadingSpinner message="궁합 폼 로딩 중..." />}>
              <CompatibilityForm
                onSubmit={handleCompatibilitySubmit}
                loading={compatibilityLoading}
              />
            </Suspense>

            {compatibilityLoading && <LoadingSpinner message="궁합 분석 중..." />}

            {compatibilityError && <ErrorMessage error={compatibilityError} />}

            {compatibilityResult && (
              <Suspense fallback={<LoadingSpinner message="궁합 결과 로딩 중..." />}>
                <CompatibilityResult
                  compatibilityData={compatibilityResult.compatibility_analysis}
                  interpretation={compatibilityResult.interpretation?.interpretation}
                />
              </Suspense>
            )}
          </>
        )}

        {mode === 'saju' && loading && !isStreaming && <LoadingSpinner />}

        {mode === 'saju' && isStreaming && <StreamingIndicator onCancel={handleCancelStreaming} />}

        {mode === 'saju' && error && <ErrorMessage error={error} />}

        {mode === 'saju' && result && (
          <>
            <ResultActions
              isBookmarked={isBookmarked}
              onToggleBookmark={handleToggleBookmark}
              onShare={handleShare}
              copySuccess={copySuccess}
              onPDFPreview={handlePDFPreview}
            />

            <div className="result-container">
              <Suspense fallback={<LoadingSpinner message="결과 로딩 중..." />}>
                <SajuResult sajuResult={result.saju_result} showHanja={showHanja} />
              </Suspense>

              {/* 오행 밸런스 차트 */}
              {result.saju_result.five_elements && (
                <Suspense fallback={<LoadingSpinner message="오행 차트 로딩 중..." />}>
                  <OhangChart
                    fiveElements={result.saju_result.five_elements}
                    showHanja={showHanja}
                  />
                </Suspense>
              )}

              {/* 12운성 */}
              {result.saju_result.twelve_unseong && (
                <Suspense fallback={<LoadingSpinner message="12운성 로딩 중..." />}>
                  <TwelveUnseong
                    twelveUnseong={result.saju_result.twelve_unseong}
                    fourPillars={{
                      year_pillar: result.saju_result.year_pillar,
                      month_pillar: result.saju_result.month_pillar,
                      day_pillar: result.saju_result.day_pillar,
                      hour_pillar: result.saju_result.hour_pillar
                    }}
                    showHanja={showHanja}
                  />
                </Suspense>
              )}

              {/* 신살 */}
              {result.saju_result.sinsal && (
                <Suspense fallback={<LoadingSpinner message="신살 로딩 중..." />}>
                  <Sinsal sinsal={result.saju_result.sinsal} />
                </Suspense>
              )}

              {/* 대운 타임라인 */}
              {result.saju_result.daeun_periods && result.saju_result.daeun_periods.length > 0 && (
                <Suspense fallback={<LoadingSpinner message="대운 로딩 중..." />}>
                  <DaeunTimeline
                    daeunPeriods={result.saju_result.daeun_periods}
                    birthYear={result.saju_result.birth_info.year}
                    showHanja={showHanja}
                  />
                </Suspense>
              )}

              {/* 세운 카드 */}
              {result.saju_result.saeun_years && result.saju_result.saeun_years.length > 0 && (
                <Suspense fallback={<LoadingSpinner message="세운 로딩 중..." />}>
                  <SaeunCard
                    saeunYears={result.saju_result.saeun_years}
                    showHanja={showHanja}
                  />
                </Suspense>
              )}

              {/* 인생 단계별 분석 */}
              {result.saju_result.daeun_periods && result.saju_result.daeun_periods.length > 0 && (
                <Suspense fallback={<LoadingSpinner message="인생 단계 분석 로딩 중..." />}>
                  <LifeStageAnalysis
                    daeunPeriods={result.saju_result.daeun_periods}
                    birthYear={result.saju_result.birth_info.year}
                  />
                </Suspense>
              )}

              <Suspense fallback={<LoadingSpinner message="해석 로딩 중..." />}>
                <InterpretationResult
                  interpretation={result.interpretation}
                  isStreaming={isStreaming}
                  streamingText={streamingText}
                />
              </Suspense>

              {/* 분야별 운세 탭 */}
              <Suspense fallback={<LoadingSpinner message="분야별 운세 탭 로딩 중..." />}>
                <CategoryTabs
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                  loading={categoryLoading || isStreaming}
                />
              </Suspense>

              {/* 분야별 운세 컨텐츠 */}
              {activeCategory !== 'overall' && categoryInterpretations[activeCategory] && (
                <div className="category-content">
                  <div className="category-content-header">
                    <span className="category-content-icon">
                      {activeCategory === 'love' && '💕'}
                      {activeCategory === 'wealth' && '💰'}
                      {activeCategory === 'career' && '💼'}
                      {activeCategory === 'health' && '🏥'}
                      {activeCategory === 'study' && '📚'}
                    </span>
                    <h3 className="category-content-title">
                      {activeCategory === 'love' && '애정운 상세 분석'}
                      {activeCategory === 'wealth' && '재물운 상세 분석'}
                      {activeCategory === 'career' && '직업운 상세 분석'}
                      {activeCategory === 'health' && '건강운 상세 분석'}
                      {activeCategory === 'study' && '학업운 상세 분석'}
                    </h3>
                  </div>
                  <div className="category-content-body">
                    {categoryInterpretations[activeCategory]}
                  </div>
                </div>
              )}

              {/* 분야별 운세 로딩 중 */}
              {activeCategory !== 'overall' && categoryLoading && (
                <div className="category-content">
                  <LoadingSpinner message={`${activeCategory} 운세 분석 중...`} />
                </div>
              )}

              {/* 분야별 운세 스트리밍 중 */}
              {activeCategory !== 'overall' && isStreaming && streamingText && (
                <div className="category-content">
                  <div className="category-content-header">
                    <span className="category-content-icon">
                      {activeCategory === 'love' && '💕'}
                      {activeCategory === 'wealth' && '💰'}
                      {activeCategory === 'career' && '💼'}
                      {activeCategory === 'health' && '🏥'}
                      {activeCategory === 'study' && '📚'}
                    </span>
                    <h3 className="category-content-title">
                      {activeCategory === 'love' && '애정운 상세 분석'}
                      {activeCategory === 'wealth' && '재물운 상세 분석'}
                      {activeCategory === 'career' && '직업운 상세 분석'}
                      {activeCategory === 'health' && '건강운 상세 분석'}
                      {activeCategory === 'study' && '학업운 상세 분석'}
                    </h3>
                  </div>
                  <div className="category-content-body">
                    {streamingText}
                  </div>
                  <StreamingIndicator />
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>Made with Claude AI 🤖</p>
      </footer>

      {/* PDF 미리보기 모달 */}
      {showPDFPreview && result && (
        <div className="pdf-preview-container">
          <div className="pdf-preview-content">
            <div className="pdf-preview-header">
              <h3 className="pdf-preview-title">PDF 미리보기</h3>
              <button className="pdf-preview-close" onClick={handleClosePDFPreview}>
                ×
              </button>
            </div>
            <div className="pdf-preview-body">
              <Suspense fallback={<LoadingSpinner message="PDF 레이아웃 로딩 중..." />}>
                <PDFLayout result={result} />
              </Suspense>
            </div>
            <div className="pdf-preview-actions">
              <button
                className="pdf-preview-button pdf-download-button"
                onClick={handleDownloadPDF}
                disabled={pdfGenerating}
              >
                {pdfGenerating ? '생성 중...' : '📥 PDF 다운로드'}
              </button>
              <button
                className="pdf-preview-button pdf-cancel-button"
                onClick={handleClosePDFPreview}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
