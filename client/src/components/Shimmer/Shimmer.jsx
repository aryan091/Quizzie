import React from 'react';
import './Shimmer.css';

const Shimmer = () => {
  return (
    <div className="shimmer-dashboard-container">
      {/* Statistics Section Shimmer */}
      <div className="shimmer-statistics-section">
        <div className="shimmer-stat-box"></div>
        <div className="shimmer-stat-box"></div>
        <div className="shimmer-stat-box"></div>
      </div>

      {/* Trending Quizzes Section Shimmer */}
      <div className="shimmer-trending-quizzes-section">
        <h2 className="shimmer-trending-title"></h2>
        <div className="shimmer-trending-box">
          <div className="shimmer-trending-list">
            <div className="shimmer-quiz-card"></div>
            <div className="shimmer-quiz-card"></div>
            <div className="shimmer-quiz-card"></div>
            <div className="shimmer-quiz-card"></div>
            <div className="shimmer-quiz-card"></div>
            <div className="shimmer-quiz-card"></div>
            <div className="shimmer-quiz-card"></div>
            <div className="shimmer-quiz-card"></div>

            <div className="shimmer-quiz-card"></div>
            <div className="shimmer-quiz-card"></div>
            <div className="shimmer-quiz-card"></div>
            <div className="shimmer-quiz-card"></div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
