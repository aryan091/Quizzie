import React from 'react';
import './QuestionAnalysis.css';
const QuestionAnalysis = ({ questionNumber , questionText, attempted, correct, incorrect }) => {
  return (
    <div className="question-analysis-container ">
      <h2 className="question-analysis-title ">
        Q.{questionNumber} {questionText}
      </h2>
      <div className="question-analysis-stats ">
        <div className="attempted-stat ">
          <h3 className="attempted-count ">{attempted}</h3>
          <p className="attempted-text">people Attempted the question</p>
        </div>
        <div className="correct-stat ">
          <h3 className="correct-count">{correct}</h3>
          <p className="correct-text ">people Answered Correctly</p>
        </div>
        <div className="incorrect-stat ">
          <h3 className="incorrect-count">{incorrect}</h3>
          <p className="incorrect-text">people Answered Incorrectly</p>
        </div>
      </div>
    </div>
  );
  
};

export default QuestionAnalysis;
