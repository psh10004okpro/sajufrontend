import React from 'react';

const StreamingIndicator = React.memo(({ onCancel }) => {
  return (
    <div className="streaming-container">
      <div className="streaming-header">
        <span className="streaming-indicator">
          <span className="pulse"></span>
          실시간 해석 생성 중...
        </span>
        <button onClick={onCancel} className="cancel-button">
          중단
        </button>
      </div>
    </div>
  );
});

StreamingIndicator.displayName = 'StreamingIndicator';

export default StreamingIndicator;
