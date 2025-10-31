import React, { useState, useCallback } from 'react';

const CategoryTabs = ({ onCategoryChange, activeCategory, loading }) => {
  const categories = [
    { id: 'overall', name: '전체', icon: '🔮', color: '#667eea' },
    { id: 'love', name: '애정운', icon: '💕', color: '#f093fb' },
    { id: 'wealth', name: '재물운', icon: '💰', color: '#4facfe' },
    { id: 'career', name: '직업운', icon: '💼', color: '#43e97b' },
    { id: 'health', name: '건강운', icon: '🏥', color: '#fa709a' },
    { id: 'study', name: '학업운', icon: '📚', color: '#a8edea' }
  ];

  const handleTabClick = useCallback((categoryId) => {
    if (!loading && categoryId !== activeCategory) {
      onCategoryChange(categoryId);
    }
  }, [loading, activeCategory, onCategoryChange]);

  return (
    <div className="category-tabs">
      <div className="category-tabs-header">
        <h3>🎯 분야별 운세</h3>
        <p className="category-tabs-description">
          관심 있는 분야를 선택하여 자세한 운세를 확인하세요
        </p>
      </div>

      <div className="category-tabs-container">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''} ${loading ? 'loading' : ''}`}
            onClick={() => handleTabClick(category.id)}
            disabled={loading}
            style={{
              '--tab-color': category.color
            }}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
            {activeCategory === category.id && loading && (
              <span className="category-loading">⏳</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
