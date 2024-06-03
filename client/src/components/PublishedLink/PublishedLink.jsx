import React,{ useEffect, useContext } from 'react';
import { RxCross2 } from "react-icons/rx";
import { QuizContext } from '../../context/QuizContext';
import { toast } from 'react-toastify';
import './PublishedLink.css'

const PublishedLinkModal = ({ link, onShare, onClose , publishedLink , setPublishedModal , gameType }) => {
    const { refreshData } = useContext(QuizContext);

    useEffect(() => {
        refreshData(); // Ensure data is up-to-date when component mounts
    }, []);

    const handleShare = () => {
      navigator.clipboard.writeText(publishedLink).then(() => {
          toast.success('Link copied to clipboard!');
      }).catch(err => {
          toast.error('Failed to copy link.');
          console.error('Failed to copy link: ', err);
      });
  };


    return (
        <div className="published-link-container ">
          <div className="published-link-box">
            <div className="published-link-header">
              <h2 className="published-link-title ">
                {`Congrats your ${gameType} is Published!`}
              </h2>
                <div>

                <RxCross2 onClick={onClose} size={30} className='publish-close' />

                </div>
\            </div>
            <div className="published-link-input-container ">
              <input
                type="text"
                readOnly
                value={publishedLink}
                className="published-link-input "
                placeholder="your link is here"
              />
            </div>
            <div className="published-link-button-container ">
              <button
                onClick={handleShare}
                className="published-link-button "
              >
                Share
              </button>
            </div>
          </div>
        </div>
      );
      
};

export default PublishedLinkModal;

