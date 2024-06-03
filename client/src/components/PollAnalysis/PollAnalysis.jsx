import React from 'react';
import './PollAnalysis.css';
const PollAnalysis = ({ questionNumber, questionText, options }) => {
  return (
    <div className="poll-question-container">
      <h2 className="poll-question-title text-2xl font-semibold mb-4 text-left">Q.{questionNumber} {questionText}</h2>
      <div className="poll-options-container">
        {options.map((option, index) => (
          <div key={index} className="poll-option">
            <h3 className="poll-option-count">{option.selectionCount}</h3>
            <p className="poll-option-text">{option.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default PollAnalysis;
