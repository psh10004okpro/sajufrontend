import React from 'react';

const ResultActions = React.memo(({
  isBookmarked,
  onToggleBookmark,
  onShare,
  copySuccess
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
    </div>
  );
});

ResultActions.displayName = 'ResultActions';

export default ResultActions;
