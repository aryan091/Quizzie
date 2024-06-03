import React from 'react';
import './ShimmerQuizAnalysis.css';

const ShimmerQuizAnalysis = () => {
  return (
    <div className="shimmer-quiz-analysis-container">
      <h2 className="shimmer-quiz-analysis-title"></h2>
      <div className="shimmer-quiz-analysis-table-container">
        <div className="shimmer-quiz-analysis-table">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="shimmer-quiz-analysis-row">
              <div className="shimmer-quiz-analysis-cell shimmer-sno"></div>
              <div className="shimmer-quiz-analysis-cell shimmer-title"></div>
              <div className="shimmer-quiz-analysis-cell shimmer-date"></div>
              <div className="shimmer-quiz-analysis-cell shimmer-impressions"></div>
              <div className="shimmer-quiz-analysis-cell shimmer-actions"></div>
              <div className="shimmer-quiz-analysis-cell shimmer-analysis"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShimmerQuizAnalysis;
