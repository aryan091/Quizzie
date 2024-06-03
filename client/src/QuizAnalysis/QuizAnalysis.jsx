import React, { useEffect , useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionAnalysis from '../components/QuestionAnalysis/QuestionAnalysis'; 
import PollAnalysis from '../components/PollAnalysis/PollAnalysis';
import { QuizContext } from "../context/QuizContext";
import './QuizAnalysis.css'
const QuizAnalysis = ({  }) => {
  const { finalQuizData } = useContext(QuizContext);
  const {id} = useParams()
    const [quiz , setQuiz] = useState(null)

  useEffect(()=>{
  
      const foundQuiz = finalQuizData.find(item => item._id === id);
      setQuiz(foundQuiz);
  
  },[])




  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    const parts = formattedDate.split(' ');
    return `${parts[0]} ${parts[1]}, ${parts[2]}`;
  }

  if (!quiz) {
    return <div>Loading...</div>;
  }



  return (
<div className="quiz-analysis-container ">
    <div className="quiz-analysis-header ">
        <div className="quiz-analysis-header-content ">
            <h1 className="quiz-title ">{quiz.title} Question Analysis</h1>
            <div className="quiz-details">
                <p className="quiz-date ">Created on: {formatDate(quiz.createdAt)}</p>
                <p className="quiz-impressions-text-analysis">Impressions: {quiz.impressions}</p>
            </div>
        </div>
    </div>
    {quiz.isQuiz ? (
        quiz.questions.map((question, index) => (
            <QuestionAnalysis
                key={question._id}
                questionNumber={index + 1}
                questionText={question.pollQuestion}
                attempted={question.attempts}
                correct={question.correctAnswers}
                incorrect={question.incorrectAnswers}
            />
        ))
    ) : (
        quiz.questions.map((question, index) => (
            <PollAnalysis
                key={question._id}
                questionNumber={index + 1}
                questionText={question.pollQuestion}
                options={question.options}
            />
        ))
    )}
</div>
  );
};

export default QuizAnalysis;
