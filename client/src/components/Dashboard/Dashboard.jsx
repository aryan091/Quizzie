import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { QuizContext } from '../../context/QuizContext';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Shimmer from '../Shimmer/Shimmer';
import './Dashboard.css'

const Dashboard = () => {
    const { finalQuizData, refreshData } = useContext(QuizContext);
    const [quizData, setQuizData] = useState([]);
    const [loading , setLoading] = useState(true)

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        await refreshData();
        setLoading(false);
      };
  
      fetchData();
    }, []);
  

    useEffect(() => {
        setQuizData(finalQuizData);
    }, [finalQuizData]);

    const questions = quizData.map((quiz) => quiz.questions.length).reduce((a, b) => a + b, 0);
    const impressions = quizData.map((quiz) => quiz.impressions).reduce((a, b) => a + b, 0);

    function formatImpressions(impressions) {
        if (impressions > 999) {
            const rounded = Math.round(impressions / 100);
            const formatted = (rounded / 10).toFixed(1);
            return formatted + 'K';
        } else {
            return impressions.toString();
        }
    }

    const formattedImpressions = formatImpressions(impressions);
    const trendingQuizzes = quizData.filter((quiz) => quiz.impressions > 10);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    }
    if(loading){
      return <Shimmer/>
    }

    return (
        <div className="dashboard-container">
          {/* Statistics Section */}
          <div className="statistics-section">
            <div className="stat-box">
              <h2 className="stat-number " style={{ lineHeight: "2rem" }}>
                {quizData.length} <span className="stat-text">Quiz Created</span>
              </h2>
            </div>
            <div className="stat-box-ques">
              <h2 className="stat-number-ques" style={{ lineHeight: "2rem" }}>
                {questions} <span className="stat-text-ques">questions Created</span>
              </h2>
            </div>
            <div className="stat-box-imp">
              <h2 className="stat-number-imp " style={{ lineHeight: "2rem" }}>
                {formattedImpressions} <span className="stat-text-imp">Total Impressions</span>
              </h2>
            </div>
          </div>
      
          {/* Trending Quizzes Section */}
          <div className="trending-quizzes-section">
            <h2 className="trending-title ">Trending Quizzes</h2>
            <div className="trending-box">
              {trendingQuizzes.length > 0 ? (
                <div className="trending-list ">
                  {trendingQuizzes.map((quiz, index) => (
                    <div key={index} className="quiz-card ">
                      <div className="quiz-header ">
                        <h3 className="quiz-title-dash ">{quiz.title}</h3>
                        <div className="quiz-impressions-dash ">
                          <p className="impressions-number">{quiz.impressions}</p>
                          <p className="impressions-icon"><MdOutlineRemoveRedEye size={20} color='#FF5D01' /></p>
                        </div>
                      </div>
                      <p className="quiz-date-dash" style={{ lineHeight: 0 }}>
                        Created on: {formatDate(quiz.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-trending-quiz">No trending quizzes available</p>
              )}
            </div>
          </div>
        </div>
      );
      };

export default Dashboard;
