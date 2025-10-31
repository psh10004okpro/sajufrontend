/**
 * LocalStorage 유틸리티 함수
 */

const HISTORY_KEY = 'saju_history';
const BOOKMARKS_KEY = 'saju_bookmarks';

/**
 * 히스토리 저장
 */
export const saveToHistory = (data) => {
  try {
    const history = getHistory();

    // 새 항목 추가 (최신순)
    const newItem = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      birthInfo: data.birth_info || data.saju_result?.birth_info,
      sajuResult: data.saju_result,
      interpretation: data.interpretation,
      question: data.question || '전체 운세'
    };

    // 최대 50개까지만 저장
    const updatedHistory = [newItem, ...history].slice(0, 50);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    return newItem;
  } catch (error) {
    console.error('히스토리 저장 오류:', error);
    return null;
  }
};

/**
 * 히스토리 불러오기
 */
export const getHistory = () => {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('히스토리 불러오기 오류:', error);
    return [];
  }
};

/**
 * 히스토리 항목 삭제
 */
export const deleteHistoryItem = (id) => {
  try {
    const history = getHistory();
    const updatedHistory = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    return true;
  } catch (error) {
    console.error('히스토리 삭제 오류:', error);
    return false;
  }
};

/**
 * 전체 히스토리 삭제
 */
export const clearHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY);
    return true;
  } catch (error) {
    console.error('히스토리 전체 삭제 오류:', error);
    return false;
  }
};

/**
 * 북마크 저장
 */
export const saveBookmark = (data) => {
  try {
    const bookmarks = getBookmarks();

    const newBookmark = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      name: data.name || `${data.birthInfo.year}년생 사주`,
      birthInfo: data.birthInfo,
      sajuResult: data.sajuResult,
      interpretation: data.interpretation
    };

    const updatedBookmarks = [newBookmark, ...bookmarks];
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
    return newBookmark;
  } catch (error) {
    console.error('북마크 저장 오류:', error);
    return null;
  }
};

/**
 * 북마크 불러오기
 */
export const getBookmarks = () => {
  try {
    const bookmarks = localStorage.getItem(BOOKMARKS_KEY);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error('북마크 불러오기 오류:', error);
    return [];
  }
};

/**
 * 북마크 삭제
 */
export const deleteBookmark = (id) => {
  try {
    const bookmarks = getBookmarks();
    const updatedBookmarks = bookmarks.filter(item => item.id !== id);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
    return true;
  } catch (error) {
    console.error('북마크 삭제 오류:', error);
    return false;
  }
};

/**
 * 북마크 여부 확인
 */
export const isBookmarked = (birthInfo) => {
  try {
    const bookmarks = getBookmarks();
    return bookmarks.some(bookmark =>
      bookmark.birthInfo.year === birthInfo.year &&
      bookmark.birthInfo.month === birthInfo.month &&
      bookmark.birthInfo.day === birthInfo.day &&
      bookmark.birthInfo.hour === birthInfo.hour &&
      bookmark.birthInfo.gender === birthInfo.gender
    );
  } catch (error) {
    console.error('북마크 확인 오류:', error);
    return false;
  }
};

/**
 * 결과를 텍스트로 변환
 */
export const convertToText = (result) => {
  try {
    const { saju_result, interpretation } = result;
    const birthInfo = saju_result.birth_info;

    let text = '━━━━━━━━━━━━━━━━━━━━━━\n';
    text += '🔮 사주 풀이 결과\n';
    text += '━━━━━━━━━━━━━━━━━━━━━━\n\n';

    text += '📅 생년월일시\n';
    text += `${birthInfo.year}년 ${birthInfo.month}월 ${birthInfo.day}일 ${birthInfo.hour}시\n`;
    text += `성별: ${birthInfo.gender === 'male' ? '남성' : '여성'}\n\n`;

    text += '📋 사주팔자\n';
    text += `년주: ${saju_result.year_pillar.heavenly_stem}${saju_result.year_pillar.earthly_branch}\n`;
    text += `월주: ${saju_result.month_pillar.heavenly_stem}${saju_result.month_pillar.earthly_branch}\n`;
    text += `일주: ${saju_result.day_pillar.heavenly_stem}${saju_result.day_pillar.earthly_branch}\n`;
    text += `시주: ${saju_result.hour_pillar.heavenly_stem}${saju_result.hour_pillar.earthly_branch}\n\n`;

    text += '🔥 오행 분석\n';
    text += `목: ${saju_result.five_elements.wood} | `;
    text += `화: ${saju_result.five_elements.fire} | `;
    text += `토: ${saju_result.five_elements.earth} | `;
    text += `금: ${saju_result.five_elements.metal} | `;
    text += `수: ${saju_result.five_elements.water}\n\n`;

    text += '🤖 AI 해석\n';
    text += '━━━━━━━━━━━━━━━━━━━━━━\n';
    text += interpretation.interpretation + '\n';
    text += '━━━━━━━━━━━━━━━━━━━━━━\n\n';

    text += 'Made with Claude AI 🤖\n';

    return text;
  } catch (error) {
    console.error('텍스트 변환 오류:', error);
    return '';
  }
};

/**
 * 클립보드에 복사
 */
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    }
  } catch (error) {
    console.error('클립보드 복사 오류:', error);
    return false;
  }
};
