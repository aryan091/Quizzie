import React, { useState , useEffect} from 'react';
import axios from "axios";
import { useLocation , useNavigate } from 'react-router-dom';
import { MdOutlineAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from 'react-toastify';

import './PollCreator.css'


const PollCreator = ({ setIsPollModalOpen , setPublishedModal , onClose, pollName , pollId , setPollId }) => {
  const [questions, setQuestions] = useState([
    {
      pollQuestion: '',
      options: [{ text: '' }, { text: '' }],
      optionType: 'text'
    }
  ]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [optionType, setOptionType] = useState('text'); 
  const [error, setError] = useState(''); 

  const navigate = useNavigate();

  const { state } = useLocation();
  useEffect(() => {
    if (state?.edit && state?.poll) {
      const poll = state.poll;
      setQuestions(poll.questions);
      setPollId(poll._id);
      setOptionType(poll.questions[0].optionType);
    }
  }, [state, setPollId]);


  const handlePollQuestionChange = (index, question) => {
    const newQuestions = [...questions];
    newQuestions[index].pollQuestion = question;
    setQuestions(newQuestions);
  };

  const handleOptionTypeChange = (type) => {
    setOptionType(type); 
    const newQuestions = questions.map(question => ({
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
      newQuestions[index].options.push({ text: '' });
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

  const handleAddQuestion = () => {
    if (questions.length < 5) {
      setQuestions([
        ...questions,
        {
          pollQuestion: '',
          options: [{ text: '' }, { text: '' }],
          optionType: optionType
        }
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

  const handleCreatePoll = async (event) => {


    event.preventDefault();

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].pollQuestion.trim() === '') {
        setError(`Question ${i + 1} is empty`);
        return;
      }
      
      for (let j = 0; j < questions[i].options.length; j++) {
        if (questions[i].options[j].text.trim() === '') {
          setError(`Option ${j + 1} of question ${i + 1} is empty`);
          return;
        }
      }
    }

    // If validation passes, create the quiz
    setError('');
    console.log('Poll Created:', { pollName, questions });
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;

      if (state?.edit) {
        const url = `${import.meta.env.VITE_BACKEND_URL}/poll/update-poll/${pollId}`;
        const response = await axios.put(url, {
          title: pollName,
          questions
        });
        console.log("Poll Updated:", response.data);
      } else {
        const url = `${import.meta.env.VITE_BACKEND_URL}/poll/create-poll`;
        const response = await axios.post(url, {
          title: pollName,
          questions
        });
        console.log("Poll Created:", response.data);
        setPollId(response.data.data._id);
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while saving the poll. Please try again.");
    }

    if (state?.edit) 
      {
        setIsPollModalOpen(false) 
        setPublishedModal(false)
    toast.success("Poll updated successfully");
      navigate('/app/analytics')
      }
      else
      {
      onClose(); 
      toast.success("Poll created successfully");
      }
  };

  const handleCancelClick = () => {
    setIsPollModalOpen(false);
    setPublishedModal(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="poll-creator-container">
      <div className="poll-creator-box ">
        <div className="poll-creator-header ">
          <div className="question-nav ">
            {questions.map((_, index) => (
              <div key={index} className="question-nav-item">
                <div
                  onClick={() => handleQuestionChange(index)}
                  className={`question-button  ${
                    index === currentQuestionIndex ? 'active' : ''}`}
                                >
                  {index + 1}
                </div>
                {index > 0 && (
                  <button
                    onClick={() => handleRemoveQuestion(index)}
                    className="remove-question-button "
                  >
                    <div className="remove-question-icon ">
                      <RxCross2 color='#ef4444' />
                    </div>
                  </button>
                )}
              </div>
            ))}
            {questions.length < 5 && (
              <button
                onClick={handleAddQuestion}
                className="add-question-button "
              >
                <MdOutlineAdd className="add-sign text-3xl" />
              </button>
            )}
          </div>
          <span className="max-questions-text ">Max 5 questions</span>
        </div>
  
        <div className="poll-question-input ">
          <input
            type="text"
            placeholder="Poll Question"
            value={currentQuestion.pollQuestion}
            onChange={e => handlePollQuestionChange(currentQuestionIndex, e.target.value)}
            className="poll-question-field "
          />
        </div>
  
        <div className="option-type-selector ">
          <label className="option-type-label" htmlFor=" ">
            Option Type
          </label>
          <label className="option-type-radio">
            <input
              style={{ accentColor: 'black' }}
              type="radio"
              checked={optionType === 'text'}
              onChange={() => handleOptionTypeChange('text')}
              className="form-radio"
            />
            <span className="option-type-text ">Text</span>
          </label>
          <label className="option-type-radio ">
            <input
              style={{ accentColor: 'black' }}
              type="radio"
              checked={optionType === 'image'}
              onChange={() => handleOptionTypeChange('image')}
              className="form-radio"
            />
            <span className="option-type-text">Image URL</span>
          </label>
          <label className="option-type-radio ">
            <input
              style={{ accentColor: 'black' }}
              type="radio"
              checked={optionType === 'textImage'}
              onChange={() => handleOptionTypeChange('textImage')}
              className="form-radio"
            />
            <span className="option-type-text ">Text & Image URL</span>
          </label>
        </div>
  
        <div className="options-container ">
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="option-item ">
              <input
                type="text"
                value={option.text}
                onChange={e => handleOptionChange(currentQuestionIndex, index, e.target.value)}
                className="option-input "
              />
              {optionType === 'textImage' && (
                <input
                  type="text"
                  placeholder="Image URL"
                  value={option.imageUrl || ''}
                  onChange={e => handleOptionImageChange(currentQuestionIndex, index, e.target.value)}
                  className="option-image-input "
                />
              )}
              {currentQuestion.options.length > 2 && index >= 2 && (
                <button
                  onClick={() => handleDeleteOption(currentQuestionIndex, index)}
                  className="delete-option-button "
                  style={{ width: '24px', height: '24px' }}
                >
                  <RiDeleteBin6Fill size={24} />
                </button>
              )}
            </div>
          ))}
          {currentQuestion.options.length < 4 && (
            <button
              onClick={() => handleAddOption(currentQuestionIndex)}
              className="add-option-button "
            >
              Add option
            </button>
          )}
        </div>
  
        <div className="poll-actions button-box ">
          <button
            onClick={handleCancelClick}
            className="cancel-button "
          >
            Cancel
          </button>
          <button
            onClick={handleCreatePoll}
            className="create-button "
          >
            {state?.edit ? 'Update Poll' : 'Create Poll'}
          </button>
        </div>
  
        {error && <p className="error-message mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
  };

export default PollCreator;
