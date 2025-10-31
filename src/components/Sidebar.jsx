import React, { useCallback } from 'react';

const Sidebar = React.memo(({
  show,
  onClose,
  tab,
  onTabChange,
  history,
  bookmarks,
  onHistoryItemClick,
  onBookmarkItemClick,
  onDeleteHistory,
  onDeleteBookmark,
  onClearHistory
}) => {
  const handleHistoryClick = useCallback((item) => {
    onHistoryItemClick(item);
  }, [onHistoryItemClick]);

  const handleBookmarkClick = useCallback((item) => {
    onBookmarkItemClick(item);
  }, [onBookmarkItemClick]);

  const handleDeleteHistoryClick = useCallback((e, id) => {
    e.stopPropagation();
    onDeleteHistory(id);
  }, [onDeleteHistory]);

  const handleDeleteBookmarkClick = useCallback((e, id) => {
    e.stopPropagation();
    onDeleteBookmark(id);
  }, [onDeleteBookmark]);

  if (!show) return null;

  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <div className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <div className="sidebar-tabs">
            <button
              className={`sidebar-tab ${tab === 'history' ? 'active' : ''}`}
              onClick={() => onTabChange('history')}
            >
              📜 히스토리 ({history.length})
            </button>
            <button
              className={`sidebar-tab ${tab === 'bookmarks' ? 'active' : ''}`}
              onClick={() => onTabChange('bookmarks')}
            >
              ⭐ 북마크 ({bookmarks.length})
            </button>
          </div>
          <button className="sidebar-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="sidebar-content">
          {tab === 'history' ? (
            <div className="history-list">
              {history.length === 0 ? (
                <p className="empty-message">아직 조회 내역이 없습니다</p>
              ) : (
                <>
                  <div className="history-actions">
                    <button onClick={onClearHistory} className="clear-button">
                      전체 삭제
                    </button>
                  </div>
                  {history.map((item) => (
                    <div key={item.id} className="history-item">
                      <div
                        className="history-item-content"
                        onClick={() => handleHistoryClick(item)}
                      >
                        <div className="history-item-date">
                          {new Date(item.timestamp).toLocaleString('ko-KR')}
                        </div>
                        <div className="history-item-info">
                          {item.birthInfo.year}년 {item.birthInfo.month}월{' '}
                          {item.birthInfo.day}일 {item.birthInfo.hour}시
                        </div>
                        <div className="history-item-question">{item.question}</div>
                      </div>
                      <button
                        className="history-item-delete"
                        onClick={(e) => handleDeleteHistoryClick(e, item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          ) : (
            <div className="bookmarks-list">
              {bookmarks.length === 0 ? (
                <p className="empty-message">저장된 북마크가 없습니다</p>
              ) : (
                bookmarks.map((item) => (
                  <div key={item.id} className="bookmark-item">
                    <div
                      className="bookmark-item-content"
                      onClick={() => handleBookmarkClick(item)}
                    >
                      <div className="bookmark-item-name">{item.name}</div>
                      <div className="bookmark-item-info">
                        {item.birthInfo.year}년 {item.birthInfo.month}월{' '}
                        {item.birthInfo.day}일 {item.birthInfo.hour}시
                      </div>
                      <div className="bookmark-item-date">
                        {new Date(item.timestamp).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                    <button
                      className="bookmark-item-delete"
                      onClick={(e) => handleDeleteBookmarkClick(e, item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
