import React from 'react';

const ErrorMessage = React.memo(({ error }) => {
  return (
    <div className="error-message">
      <h3>⚠️ 오류가 발생했습니다</h3>
      <p>{error}</p>
    </div>
  );
});

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
