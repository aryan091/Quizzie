import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ShimmerQuizQuestion from "../ShimmerQuizQuestion/ShimmerQuizQuestion";
import QuizCompletion from "../QuizCompletion/QuizCompletion";
import axios from "axios";
import "./QuizQuestion.css";

const QuizQuestion = () => {
  const { quizId } = useParams();

  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [loading, setLoading] = useState(true);


  const questionResults = useRef([]);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/quiz/view-quiz/${quizId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQuizData(data.message);
        const initialTimer =
          data.message.questions[0].timer === "off"
            ? 0
            : Number(data.message.questions[0].timer);
        setTimer(initialTimer);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    console.log("Viewing quiz");
    fetchQuizData();
  }, [quizId]);

  useEffect(() => {

    const incrementQuizImpression = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/quiz/impression-increment/${quizId}`;
        const response = await axios.put(url);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }

      console.log("Incrementing quiz");
    };

    incrementQuizImpression();
  }, [quizId]);

  useEffect(() => {
    if (timer > 0) {
      const timerId = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (
      timer === 0 &&
      quizData &&
      quizData.questions[currentQuestionIndex].timer !== "off"
    ) {
      handleNextQuestion();
    }
  }, [timer, quizData, currentQuestionIndex]);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (!quizData) return;

    const currentQuestion = quizData.questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.options[selectedOption];
    let attempts = 0;
    let correct = 0;

    if (selectedOption !== null) {
      attempts = 1;
      correct = selectedAnswer && selectedAnswer.correct ? 1 : 0;
      setCorrectAnswers(correctAnswers + correct);
      setAttemptedQuestions(attemptedQuestions + 1);

      if (!questionResults.current[currentQuestionIndex]) {
        questionResults.current[currentQuestionIndex] = {
          questionId: currentQuestion._id,
          attempts: 0,
          correct: 0,
          incorrect: 0,
        };
      }

      questionResults.current[currentQuestionIndex].attempts = attempts;
      questionResults.current[currentQuestionIndex].correct = correct;
      questionResults.current[currentQuestionIndex].incorrect =
        attempts - correct;
    } else {
      if (!questionResults.current[currentQuestionIndex]) {
        questionResults.current[currentQuestionIndex] = {
          questionId: currentQuestion._id,
          attempts: 0,
          correct: 0,
          incorrect: 0,
        };
      }
    }

    if (currentQuestionIndex < quizData.questions.length - 1) {
      const nextQuestionIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedOption(null);
      const nextTimer =
        quizData.questions[nextQuestionIndex].timer === "off"
          ? 0
          : Number(quizData.questions[nextQuestionIndex].timer);
      setTimer(nextTimer);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = async () => {
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.options[selectedOption];
    let attempts = 0;
    let correct = 0;

    if (selectedOption !== null) {
      attempts = 1;
      correct = selectedAnswer && selectedAnswer.correct ? 1 : 0;
      setCorrectAnswers(correctAnswers + correct);
      setAttemptedQuestions(attemptedQuestions + 1);

      if (!questionResults.current[currentQuestionIndex]) {
        questionResults.current[currentQuestionIndex] = {
          questionId: currentQuestion._id,
          attempts: 0,
          correct: 0,
          incorrect: 0,
        };
      }

      questionResults.current[currentQuestionIndex].attempts = attempts;
      questionResults.current[currentQuestionIndex].correct = correct;
      questionResults.current[currentQuestionIndex].incorrect =
        attempts - correct;
    } else {
      if (!questionResults.current[currentQuestionIndex]) {
        questionResults.current[currentQuestionIndex] = {
          questionId: currentQuestion._id,
          attempts: 0,
          correct: 0,
          incorrect: 0,
        };
      }
    }

    setQuizCompleted(true);
  };

  const formatNumber = (number) => number.toString().padStart(2, "0");

  const formatTimer = (timer) => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${formatNumber(minutes)}:${formatNumber(seconds)}s`;
  };

if(loading)
  {
    return <ShimmerQuizQuestion/>
  }
  if (quizCompleted) {
    return (
      <QuizCompletion
        correctAnswers={correctAnswers}
        totalQuestions={quizData.questions.length}
        isQuiz={true}
        quizId={quizId}
        attemptedQuestions={attemptedQuestions}
        questionResults={questionResults.current}
      />
    );
  }

  const currentQuestion = quizData?.questions[currentQuestionIndex];

  return (
    <div className="quiz-question-container">
      <div className="quiz-question-content">
        <div className="question-index-wrapper ">
          <span className="question-index">
            {`${formatNumber(currentQuestionIndex + 1)}/${formatNumber(
              quizData.questions.length
            )}`}
          </span>
          {timer > 0 && (
            <span className="timer-display">
              {formatTimer(timer)}
            </span>
          )}
        </div>
        <div className="question-text ">
          {currentQuestion?.pollQuestion}
        </div>
        <div className="options-wrapper ">
          {quizData.questions[currentQuestionIndex].optionType === "image"
            ? currentQuestion?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`option-button-image-option-quiz  ${selectedOption === index ? 'selected' : ''}`}
                >
                  <img
                    src={option.text}
                    alt={`Option ${index + 1}`}
                    className="option-image-type-image "
                  />
                </button>
              ))
            : quizData.questions[currentQuestionIndex].optionType ===
              "textImage"
            ? currentQuestion?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`option-button-text-image-option-quiz  ${selectedOption === index ? 'selected' : ''}`}
                >
                  <span>{option.text}</span>
                  <img
                    src={option.imageUrl}
                    alt={`Option ${index + 1}`}
                    className="option-image"
                  />
                </button>
              ))
            : currentQuestion?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`option-button-text-option-quiz  ${selectedOption === index ? 'selected' : ''}`}
                >
                  {option.text}
                </button>
              ))}
        </div>
        <div className="button-wrapper">
          <button
            onClick={handleNextQuestion}
            className="next-button "
          >
            {currentQuestionIndex === quizData.questions.length - 1
              ? "SUBMIT"
              : "NEXT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
