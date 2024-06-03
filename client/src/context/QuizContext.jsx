import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
    const [quizData, setQuizData] = useState([]);
    const [pollData, setPollData] = useState([]);
    const [loading, setLoading] = useState(true);


    const getAllQuizzes = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/quiz/get-quizzes`;
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;

            const response = await axios.get(url);
            const quizzesWithIsQuiz = response.data.message.map(quiz => ({
                ...quiz,
                isQuiz: true
            }));
            setQuizData(quizzesWithIsQuiz);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllPolls = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/poll/get-all-polls`;
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;

            const response = await axios.get(url);
            const pollsWithIsQuiz = response.data.message.map(poll => ({
                ...poll,
                isQuiz: false
            }));
            setPollData(pollsWithIsQuiz);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshData = async () => {
        setLoading(true); // Set loading to true when refresh starts

        await Promise.all([getAllQuizzes(), getAllPolls()]);

        setLoading(false); // Set loading back to false when refresh completes
    };

    useEffect(() => {
        refreshData();
    }, []);

    const finalQuizData = [...quizData, ...pollData];
    finalQuizData.sort((a, b) => b.impressions - a.impressions);

    return (
        <QuizContext.Provider value={{ finalQuizData, refreshData }}>
            {children}
        </QuizContext.Provider>
    );
};

export { QuizProvider, QuizContext };
