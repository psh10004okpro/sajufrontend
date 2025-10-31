import React from 'react';

const LoadingSpinner = React.memo(({ message = '사주팔자를 계산하고 해석하는 중입니다...' }) => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
