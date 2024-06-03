import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdOutlineAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify';
import { PropagateLoader } from 'react-spinners'; // Import the spinner component

import './QuizCreator.css'

const QuizCreator = ({ setIsQNAModalOpen, setPublishedModal, onClose, quizName, quizId, setQuizId }) => {
  const [questions, setQuestions] = useState([
    {
      pollQuestion: '',
      options: [{ text: '', correct: false }, { text: '', correct: false }],
      optionType: 'text',
      timer: 'off',
    },
  ]);

  const { state } = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [optionType, setOptionType] = useState('text'); // Single state for option type
  const [timer, setTimer] = useState('off'); // Single state for timer
  const [error, setError] = useState(''); // State for error message
  const [loading, setLoading] = useState(false); // Loading state
  const loadingSpinnerStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };
  


  console.log('state :', state);

  useEffect(() => {
    if (state?.edit && state?.quiz) {
      const quiz = state.quiz;
      setQuestions(quiz.questions);
      setQuizId(quiz._id);
      setOptionType(quiz.questions[0].optionType);
      setTimer(quiz.questions[0].timer);
    }
  }, [state, setQuizId]);

  const navigate = useNavigate();

  const handlePollQuestionChange = (index, question) => {
    const newQuestions = [...questions];
    newQuestions[index].pollQuestion = question;
    setQuestions(newQuestions);
  };

  const handleOptionTypeChange = (type) => {
    setOptionType(type); // Update option type for all questions
    const newQuestions = questions.map((question) => ({
      ...question,
      optionType: type,
    }));
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, text) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].text = text;
    setQuestions(newQuestions);
  };

  const handleOptionImageChange = (qIndex, oIndex, imageUrl) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].imageUrl = imageUrl;
    setQuestions(newQuestions);
  };

  const handleAddOption = (index) => {
    const newQuestions = [...questions];
    if (newQuestions[index].options.length < 4) {
      newQuestions[index].options.push({ text: '', correct: false });
    }
    setQuestions(newQuestions);
  };

  const handleDeleteOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    if (oIndex >= 2) {
      newQuestions[qIndex].options = newQuestions[qIndex].options.filter((_, i) => i !== oIndex);
    }
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (qIndex, oIndex) => {
    const newQuestions = questions.map((question, qIdx) => {
      if (qIdx === qIndex) {
        const options = question.options.map((option, oIdx) => ({
          ...option,
          correct: oIdx === oIndex,
        }));
        return { ...question, options };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const handleTimerChange = (time) => {
    setTimer(time); // Update timer for all questions
    const newQuestions = questions.map((question) => ({
      ...question,
      timer: time,
    }));
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    if (questions.length < 5) {
      setQuestions([
        ...questions,
        {
          pollQuestion: '',
          options: [{ text: '', correct: false }, { text: '', correct: false }],
          optionType: optionType,
          timer: timer,
        },
      ]);
      setCurrentQuestionIndex(questions.length);
    }
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
    setCurrentQuestionIndex(0);
  };

  const handleQuestionChange = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleCreateQuiz = async (event) => {
    event.preventDefault();
    // Validate all questions and options are filled
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].pollQuestion.trim() === '') {
        setError(`Question ${i + 1} is empty`);
        return;
      }
      let correctOptionSelected = false;
      for (let j = 0; j < questions[i].options.length; j++) {
        if (questions[i].options[j].text.trim() === '') {
          setError(`Option ${j + 1} of question ${i + 1} is empty`);
          return;
        }
        if (questions[i].options[j].correct) {
          correctOptionSelected = true;
        }
      }
      if (!correctOptionSelected) {
        setError(`No correct option selected for question ${i + 1}`);
        return;
      }
    }

    // If validation passes, create the quiz
    setError('');
    console.log('Quiz Created:', { quizName, questions });
    try {
      setLoading(true)
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;

      if (state?.edit) {
        // Update existing quiz
        const url = `${import.meta.env.VITE_BACKEND_URL}/quiz/update-quiz/${quizId}`;
        const response = await axios.put(url, {
          title: quizName,
          questions,
        });
        console.log('Quiz Updated:', response.data);
      } else {
        // Create new quiz
        const url = `${import.meta.env.VITE_BACKEND_URL}/quiz/create-quiz`;
        const response = await axios.post(url, {
          title: quizName,
          questions,
        });
        console.log('Quiz Created:', response.data);
        setQuizId(response.data.data._id);
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      setError('An error occurred while saving the quiz. Please try again.');
    }
    if (state?.edit) {
      setIsQNAModalOpen(false);
      setPublishedModal(false);
      toast.success(`Quiz updated successfully!`);
      navigate('/app/analytics');
    } else {
      onClose();
      toast.success(`Quiz created successfully!`);
    }
  };

  const handleCancelClick = () => {
    setIsQNAModalOpen(false);
    setPublishedModal(false);
    navigate('/app/analytics');
  };
  

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-creator-container ">
    <div className="quiz-creator-content ">
      <div className='quiz-creator-cl1 '>
        <div className="quiz-creator-cl2 ">
          <div className="quiz-creator-cl3">
            {questions.map((_, index) => (
              <div key={index} className="quiz-creator-cl4 ">
                <div
                  onClick={() => handleQuestionChange(index)}
                  className={`question-selector  ${index === currentQuestionIndex ? 'active' : ''}`}
                >
                  {index + 1}
                </div>
                {index > 0 && (
                  <button
                    onClick={() => handleRemoveQuestion(index)}
                    className="remove-question-btn "
                  >
                    <div className=".quiz-creator-cl5 ">
                      <RxCross2 color='red' />
                    </div>
                  </button>
                )}
              </div>
            ))}
            {questions.length < 5 && (
              <button
                onClick={handleAddQuestion}
                className="add-question-btn "
              >
                <MdOutlineAdd className="quiz-creator-cl6" />
              </button>
            )}
          </div>
          <span className="max-question-limit-text">Max 5 questions</span>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Quiz Question"
            value={currentQuestion.pollQuestion}
            onChange={(e) => handlePollQuestionChange(currentQuestionIndex, e.target.value)}
            className="poll-question-input "
          />
        </div>

        <div className=" quiz-creator-cl7   ">
          <label className="option-type-label" htmlFor="option-type">
            Option Type
          </label>
          <label className="option-type-radio-label">
            <input
              style={{ accentColor: 'black' }}
              type="radio"
              checked={optionType === 'text'}
              onChange={() => handleOptionTypeChange('text')}
              className="option-type-radio form-radio"
            />
            <span className="option-type-text">Text</span>
          </label>
          <label className="option-type-radio-label ">
            <input
              style={{ accentColor: 'black' }}
              type="radio"
              checked={optionType === 'image'}
              onChange={() => handleOptionTypeChange('image')}
              className="option-type-radio form-radio"
            />
            <span className="option-type-text ">Image URL</span>
          </label>
          <label className="option-type-radio-label ">
            <input
              style={{ accentColor: 'black' }}
              type="radio"
              checked={optionType === 'textImage'}
              onChange={() => handleOptionTypeChange('textImage')}
              className="option-type-radio form-radio"
            />
            <span className="option-type-text">Text & Image URL</span>
          </label>
        </div>
        <div className="quiz-creator-cl8 ">
          <div className="quiz-creator-cl9 ">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className="option-container"
              >
                <input
                  style={{ accentColor: '#60B84B' }}
                  type="radio"
                  checked={option.correct}
                  onChange={() => handleCorrectOptionChange(currentQuestionIndex, index)}
                  className="option-correct form-radio"
                />
                <input
                  style={{
                    backgroundColor: option.correct ? '#60B84B' : '',
                    color: option.correct ? 'white' : 'black',
                    boxShadow: option.correct ? '0px 0px 25px 0px #00000026' : '',
                    border: option.correct ? '1px solid #60B84B' : '',
                  }}
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(currentQuestionIndex, index, e.target.value)}
                  className="option-text-input"
                />
                {optionType === 'textImage' && (
                  <input
                    style={{
                      backgroundColor: option.correct ? '#60B84B' : '',
                      color: option.correct ? 'white' : 'black',
                    }}
                    type="text"
                    placeholder="Image URL"
                    value={option.imageUrl || ''}
                    onChange={(e) => handleOptionImageChange(currentQuestionIndex, index, e.target.value)}
                    className="option-image-input "
                  />
                )}
                {currentQuestion.options.length > 2 && index >= 2 && (
                  <button
                    onClick={() => handleDeleteOption(currentQuestionIndex, index)}
                    className="delete-option-btn "
                     // Set fixed width and height for the delete button
                  >
                    <RiDeleteBin6Fill size={24}/>
                  </button>
                )}
              </div>
            ))}
            {currentQuestion.options.length < 4 && (
              <button
                onClick={() => handleAddOption(currentQuestionIndex)}
                className="add-option-btn "
              >
                Add option
              </button>
            )}
          </div>


          <div className=" timer-container ">
            <label className=" timer-label" htmlFor=" ">
              Timer
            </label>
            <button
              className={` timer-choose  ${
               
    timer === 'off' ? 'timer-off' : 'timer-on'

              }`}
              onClick={() => handleTimerChange('off')}
            >
              OFF
            </button>
            <button
              className={` timer-button  ${
                timer === '5' ? 'timer-5' : 'timer-not-5'
              }`}
              onClick={() => handleTimerChange('5')}
            >
              5 sec
            </button>
            <button
              className={`timer-button  ${
                timer === '10' ? 'timer-10' : 'timer-not-10'

              }`}
              onClick={() => handleTimerChange('10')}
            >
              10 sec
            </button>
          </div>
        </div>

        <div className="button-box">

          <button
            onClick={handleCancelClick}
            className="cancel-button "
          >
            Cancel
          </button>
          <button
            onClick={handleCreateQuiz}
            className="create-quiz-button "
          >
            {state?.edit ? 'Update Quiz' : 'Create Quiz'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {loading && (
        <div style={loadingSpinnerStyles}>
          <PropagateLoader color="#ffffff" />
        </div>
      )}
        </div>
       </div>
    </div>
  );
};

export default QuizCreator;
