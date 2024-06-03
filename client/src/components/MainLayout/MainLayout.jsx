import React, { useState , useEffect , useContext } from 'react';
import { Outlet , useNavigate , useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import CreateQuizModal from '../CreateQuiz/CreateQuizModal';
import QuizCreator from '../QuizCreator/QuizCreator';
import PublishedLink from '../PublishedLink/PublishedLink'; 
import PollCreator from '../PollCreator/PollCreator';
import { QuizContext } from "../../context/QuizContext";

import './MainLayout.css'

const MainLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [isQNAModalOpen, setIsQNAModalOpen] = useState(false);
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);
  const [quizName, setQuizName] = useState('');
  const [quizId, setQuizId] = useState('');
  const [pollId, setPollId] = useState('');
  const [pollName, setPollName] = useState('');
  const [publishedModal, setPublishedModal] = useState(false);
  const { finalQuizData, refreshData } = useContext(QuizContext);


  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelectedType('');
    setQuizName('');
    setPollName('');

  },[])

  useEffect(() => {
    if (location.pathname === '/app/analytics/create-quiz') {
      setIsQNAModalOpen(true);
    }
    if (location.pathname === '/app/analytics/create-poll') {
      setIsPollModalOpen(true);
    }
    setSelectedType('');
    setQuizName('');
    setPollName('');

  }, [location]);

  useEffect(() => {
    refreshData(); 
  }, [publishedModal]);



  const publishedLinkQA = `http://localhost:5173/api/v1/quiz/view-quiz/${quizId}`;
  const publishedLinkPoll = `http://localhost:5173/api/v1/poll/view-poll/${pollId}`;

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSelectedType('');
    setQuizName('');
    setPollName('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    
  };
  

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    console.log('Continue with type:', selectedType);
    handleCloseModal();
    if (selectedType === 'Q&A') {
      setIsQNAModalOpen(true);
    } else if (selectedType === 'Poll') {
      setIsPollModalOpen(true);
    }
  };

  const handleCloseQuizCreator = () => {
    setIsQNAModalOpen(false);
    setPublishedModal(true);
  };

  const handleClosePollCreator = () => {
    setIsPollModalOpen(false);
    setPublishedModal(true);
  };

  const handlePublishModalClose = () => {
    setPublishedModal(false);
    navigate('/app/analytics');
  };
  

  return (
    <div className="main-layout flex text-center relative">
      <Sidebar onOpenModal={handleOpenModal} />
      <Outlet />
      {isModalOpen && (
        <CreateQuizModal
          onClose={handleCloseModal}
          onContinue={handleContinue}
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
          quizName={quizName}
          setQuizName={setQuizName}
          pollName={pollName}
          setPollName={setPollName}
        />
      )}
      {isQNAModalOpen && (
        <QuizCreator
        setIsQNAModalOpen={setIsQNAModalOpen}
        setPublishedModal={setPublishedModal}
          onClose={handleCloseQuizCreator}
          quizName={quizName}
          quizId={quizId}
          setQuizId={setQuizId}
        />
      )}
      {isPollModalOpen && (
        <PollCreator
        setIsPollModalOpen={setIsPollModalOpen}
        setPublishedModal={setPublishedModal}
          onClose={handleClosePollCreator}
          pollName={pollName}
          pollId={pollId}
          setPollId={setPollId}
        />
      )}
      {publishedModal && (
        <PublishedLink
          publishedLink={selectedType === 'Q&A' ? publishedLinkQA : publishedLinkPoll}
          gameType={selectedType === 'Q&A' ? 'Quiz' : 'Poll'}
          setPublishedModal={setPublishedModal}
          onClose={handlePublishModalClose}
        />
      )}
    </div>
  );
};

export default MainLayout;
