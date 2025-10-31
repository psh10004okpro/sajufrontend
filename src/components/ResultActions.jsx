import React from 'react';

const ResultActions = React.memo(({
  isBookmarked,
  onToggleBookmark,
  onShare,
  copySuccess,
  onPDFPreview
}) => {
  return (
    <div className="result-actions">
      <button
        className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
        onClick={onToggleBookmark}
        title={isBookmarked ? '북마크 삭제' : '북마크 추가'}
      >
        {isBookmarked ? '⭐ 북마크됨' : '☆ 북마크'}
      </button>
      <button
        className="share-button"
        onClick={onShare}
        title="결과 복사"
      >
        📋 {copySuccess ? '복사됨!' : '결과 복사'}
      </button>
      <button
        className="pdf-button"
        onClick={onPDFPreview}
        title="PDF 다운로드"
      >
        📄 PDF 저장
      </button>
    </div>
  );
});

ResultActions.displayName = 'ResultActions';

export default ResultActions;
