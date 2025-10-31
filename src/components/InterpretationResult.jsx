import React, { useMemo } from 'react';

const InterpretationResult = React.memo(({ interpretation, isStreaming, streamingText }) => {
  const paragraphs = useMemo(() => {
    if (!interpretation?.interpretation) return [];
    return interpretation.interpretation.split('\n').filter(p => p.trim());
  }, [interpretation]);

  return (
    <div className="interpretation-result">
      <h2>🤖 AI 해석</h2>
      {isStreaming ? (
        <div className="interpretation-content streaming">
          <p className="streaming-text">{streamingText}<span className="cursor">|</span></p>
        </div>
      ) : (
        <>
          <div className="interpretation-content">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {interpretation.topics_covered && interpretation.topics_covered.length > 0 && (
            <div className="topics-covered">
              <h4>다룬 주제</h4>
              <div className="topics-list">
                {interpretation.topics_covered.map((topic, index) => (
                  <span key={index} className="topic-tag">{topic}</span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
});

InterpretationResult.displayName = 'InterpretationResult';

export default InterpretationResult;
