import React from "react";
import "./ShimmerQuizQuestion.css";

const ShimmerQuizQuestion = () => {
  return (
    <div className="shimmer-quiz-question-container">
      <div className="shimmer-quiz-question-content">
        <div className="shimmer-element-question-index-wrapper"></div>
        <div className="shimmer-element-question-text"></div>
        <div className="shimmer-options-wrapper">
          <div className="shimmer-element-shimmer-option"></div>
          <div className="shimmer-element-shimmer-option"></div>
          <div className="shimmer-element-shimmer-option"></div>
        </div>
        <div className="button-wrapper">
          <div className="shimmer-element-shimmer-button"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerQuizQuestion;
