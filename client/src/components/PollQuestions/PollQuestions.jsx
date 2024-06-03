import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ShimmerQuizQuestion from '../ShimmerQuizQuestion/ShimmerQuizQuestion';
import PollCompletion from '../PollCompletion/PollCompletion';
import axios from 'axios';
import './PollQuestions.css'

const PollQuestion = () => {
    const { pollId } = useParams();

    const [pollData, setPollData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [pollCompleted, setPollCompleted] = useState(false);
    const [attemptedQuestions, setAttemptedQuestions] = useState(0);
    const [loading, setLoading] = useState(true);


    const questionResults = useRef([]);

    useEffect(() => {
        const fetchPollData = async () => {
            try {
              setLoading(true)

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/poll/view-poll/${pollId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPollData(data.message);
                setLoading(false)

            } catch (error) {
                console.error('Error fetching poll data:', error);
            }
        };

        fetchPollData();
    }, []);

    useEffect(() => {
    
        const incrementPollImpression = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/poll/impression-increment/${pollId}`;
                const response = await axios.put(url);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
    
            console.log("Incrementing poll");
        };
    
        incrementPollImpression(); // Call the function directly inside useEffect
    
    }, []); // Ensure dependency array is empty since this effect should run only once


    const handleOptionSelect = (index) => {
        setSelectedOption(index);
    };

    const handleNextQuestion = () => {
        if (!pollData) return;

        const currentQuestion = pollData.questions[currentQuestionIndex];
        if (selectedOption !== null) {
            setAttemptedQuestions(attemptedQuestions + 1);

            questionResults.current[currentQuestionIndex] = {
                questionId: currentQuestion._id,
                optionsSelected: [selectedOption]
            };

            setSelectedOption(null);
        }

        if (currentQuestionIndex < pollData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
        } else {
            handleSubmitPoll();
        }
    };

    const handleSubmitPoll = async () => {
        if (!pollData) return;

        const currentQuestion = pollData.questions[currentQuestionIndex];
        if (selectedOption !== null) {
            setAttemptedQuestions(attemptedQuestions + 1);

            questionResults.current[currentQuestionIndex] = {
                questionId: currentQuestion._id,
                optionsSelected: [selectedOption]
            };

            setSelectedOption(null);
        }

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/poll/update-stats/${pollId}`, {
                questionResults: questionResults.current
            });
            console.log('Poll results submitted successfully');
        } catch (error) {
            console.error('Error submitting poll results:', error);
        }

        setPollCompleted(true);
    };

    if (!pollData) {
        return <div>Loading...</div>;
    }

    if (pollCompleted) {
        return (
            <PollCompletion
                isPoll={true}
                pollId={pollId}
                questionResults={questionResults.current}
            />
        );
    }

    console.log('Question Results:', questionResults.current);

    const currentQuestion = pollData?.questions[currentQuestionIndex];

    if(loading)
      {
        return <ShimmerQuizQuestion/>
      }

    return (
        <div className="poll-question-container-wrapper ">
        <div className="poll-question-box">
          <div className="poll-question-header ">
            <span className="question-counter ">
              {`${currentQuestionIndex + 1}/${pollData.questions.length}`}
            </span>
          </div>
          <div className="poll-question-text ">
            {currentQuestion?.pollQuestion}
          </div>
          <div className="poll-options ">
            {pollData.questions[currentQuestionIndex].optionType === "image"
              ? currentQuestion?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`option-button-image-option-poll  ${selectedOption === index ? 'selected' : ''}`}
                  >
                    <img
                      src={option.text}
                      alt={`Option ${index + 1}`}
                      className="poll-option-image-type-image"
                    />
                  </button>
                ))
              : pollData.questions[currentQuestionIndex].optionType ===
                "textImage"
              ? currentQuestion?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`option-button-text-image-option-poll ${selectedOption === index ? 'selected' : ''}`}
                  >
                    <span>{option.text}</span>
                    <img
                      src={option.imageUrl}
                      alt={`Option ${index + 1}`}
                      className="poll-option-image "
                    />
                  </button>
                ))
              : currentQuestion?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`option-button-text-option  ${selectedOption === index ? 'selected' : ''}`}
                  >
                    {option.text}
                  </button>
                ))}
          </div>
          <div className="poll-next-button-container ">
            <button
              onClick={handleNextQuestion}
              className="poll-next-button "
            >
              {currentQuestionIndex === pollData.questions.length - 1
                ? "SUBMIT"
                : "NEXT"}
            </button>
          </div>
        </div>
      </div>
  );
};

export default PollQuestion;
