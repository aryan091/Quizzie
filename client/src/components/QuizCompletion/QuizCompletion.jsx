import React,{ useEffect } from 'react';
import Trophy from "../../assets/Trophy.png"
import axios from 'axios';
import './QuizCompletion.css';
const formatNumber = (number) => {
    return number.toString().padStart(2, '0');
};



const QuizCompletion = ({ correctAnswers, totalQuestions , isQuiz ,quizId , attemptedQuestions , questionResults }) => {
    console.log("Ques Stats ",questionResults);
    const totalCorrectOptions = questionResults.reduce((total, question) => total + question.correct, 0);

    useEffect(() => {
        const updateQuizStats = async () => {
            try {
                const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/quiz/update-quiz-stats/${quizId}`, {
                    questionResults
                });
                console.log('Quiz results submitted successfully:', response.data);
            } catch (error) {
                console.error('Error submitting quiz results:', error);
            }
        };

        updateQuizStats();
    }, [quizId, questionResults]);


    return (
        <div className="quiz-completion-container">
          <div className="quiz-completion-content">
            {isQuiz ? (
              <>
                <h2 className="quiz-completion-title ">Congrats Quiz is completed</h2>
                <img
                  src={Trophy} 
                  alt="Trophy"
                  className="quiz-completion-trophy mx-auto mb-4"
                />
                <p className="quiz-completion-score ">
                  Your Score is <span className="quiz-completion-score-value ">{formatNumber(totalCorrectOptions)}/{formatNumber(totalQuestions)}</span>
                </p>
              </>
            ) : (
              <h2 className="quiz-completion-title">Thank you for participating in the Poll</h2>
            )}
          </div>
        </div>
      );
      };

export default QuizCompletion;
