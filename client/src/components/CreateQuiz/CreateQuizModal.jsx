import React, { useState } from 'react';
import './CreateQuizModal.css';
const CreateQuizModal = ({ onClose, onContinue, selectedType, onTypeChange , quizName , setQuizName , pollName , setPollName}) => {
  const [error, setError] = useState('');

  const handleQuizNameChange = (event) => {
    const name = event.target.value;
    setQuizName(name); 
    setPollName(name);

  };

  const handleContinue = () => {
    if (!quizName || !selectedType) {
      setError('Please select quiz type and provide a name for the quiz.');
      return;
    }

    

    // Clear error if all conditions are met
    setError('');
    // Proceed with continue action
    onContinue();
  };

  return (
    <div className="create-quiz-modal">
      <div className=" create-quiz-container">
        <form>
          <div className="quiz-name-input-container">
            <input
              id="quizName"
              type="text"
              placeholder="Quiz Name"
              value={quizName}
              onChange={handleQuizNameChange}
              className=" quiz-name-input"
            />
          </div>
          <div className="quiz-type-container">
            <div className="quiz-type-buttons">
              <label className="quiz-type-label">
                Quiz Type
              </label>
              <button
                type="button"
                className={`quiz-type-button`}
                onClick={() => onTypeChange('Q&A')}
                style={{
                backgroundColor: selectedType === 'Q&A' ? '#60B84B' : '#ffffff',
                  color: selectedType === 'Q&A' ? '#ffffff' : '#4a5568'
              }}
          
              >
                Q & A
              </button>
              <button
                type="button"
                className={` quiz-type-button`}
                style={{
                  backgroundColor: selectedType === 'Poll' ? '#60B84B' : '#ffffff',
                  color: selectedType === 'Poll' ? '#ffffff' : '#4a5568'
                }}
                onClick={() => onTypeChange('Poll')}
              >
                Poll Type
              </button>
            </div>
          </div>
          <p className=" quiz-error-message">{error}</p>
          <div className=" quiz-buttons-container">
            <button
              type="button"
              className=" quiz-cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="  quiz-continue-button"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuizModal;
