import React, { useEffect } from 'react';
import axios from 'axios';
import './PollCompletion.css';

const PollCompletion = ({ pollId, questionResults }) => {
    console.log("Ques Stats ", questionResults);

    useEffect(() => {
        const updatePollStats = async () => {
            try {
                const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/poll/update-poll-stats/${pollId}`, {
                    questionResults
                });
                console.log('Poll results submitted successfully:', response.data);
            } catch (error) {
                console.error('Error submitting quiz results:', error);
            }
        };

        updatePollStats();
    }, [pollId, questionResults]);

    return (
        <div className="thank-you-container ">
          <div className="thank-you-box">
            <div className="thank-you-text">
              <h2 className="thank-you-title ">Thank you</h2>
              <h2 className="thank-you-title ">for participating</h2>
              <h2 className="thank-you-title">in the poll</h2>
            </div>
          </div>
        </div>
      );
      
};

export default PollCompletion;
