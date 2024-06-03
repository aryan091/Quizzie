import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PollCompletion.css';

const PollCompletion = ({ pollId, questionResults }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const updatePollStats = async () => {
            try {
                const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/poll/update-poll-stats/${pollId}`, {
                    questionResults
                });
                console.log('Poll results submitted successfully:', response.data);
            } catch (error) {
                console.error('Error submitting poll results:', error);
            } finally {
                setIsLoading(false);
            }
        };

        updatePollStats();
    }, [pollId, questionResults]);

    return (
        <div className="thank-you-container">
            {isLoading ? (
                <div className="shimmer-container">
                    <div className="shimmer-text"></div>
                    <div className="shimmer-text"></div>
                    <div className="shimmer-text"></div>
                </div>
            ) : (
                <div className="thank-you-box">
                    <div className="thank-you-text">
                        <h2 className="thank-you-title">Thank you</h2>
                        <h2 className="thank-you-title">for participating</h2>
                        <h2 className="thank-you-title">in the poll</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PollCompletion;
