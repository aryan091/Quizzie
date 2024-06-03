import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../context/QuizContext";
import axios from "axios";
import { HiMiniShare } from "react-icons/hi2";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { toast } from 'react-toastify';


import DeleteDialog from "../DeleteDailog/DeleteDailog"; // Ensure the correct path
import './QuizAnalysisReport.css'

const QuizAnalysisReport = () => {
  const navigate = useNavigate();
  const { finalQuizData, refreshData } = useContext(QuizContext);
  console.log(finalQuizData);
  const [quizData, setQuizData] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    refreshData(); 
  }, []);

  useEffect(() => {
    setQuizData(finalQuizData);
  }, [finalQuizData]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    const parts = formattedDate.split(" ");
    return `${parts[0]} ${parts[1]}, ${parts[2]}`;
  }

  const handleCopyLink = (quiz) => {
    const link = quiz.isQuiz
      ? `http://localhost:5173/api/v1/quiz/view-quiz/${quiz._id}`
      : `http://localhost:5173/api/v1/poll/view-poll/${quiz._id}`;

    navigator.clipboard.writeText(link).then(() => {
      toast.success(`Link copied to clipboard!`);

    }).catch(err => {
      console.error("Failed to copy link: ", err);
    });
  };

  const handleDelete = async () => {
    if (!selectedQuiz) return;

    const link = selectedQuiz.isQuiz
      ? `${import.meta.env.VITE_BACKEND_URL}/quiz/delete-quiz/${selectedQuiz._id}`
      : `${import.meta.env.VITE_BACKEND_URL}/poll/delete-poll/${selectedQuiz._id}`;

    console.log("Deleting:", link);

    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;

      const response = await axios.delete(link);
      console.log(response.data.message);
      await refreshData(); 
      setDeleteDialog(false); 
      toast.success(`${response.data.message.title} deleted successfully!`);
    } catch (error) {
      console.log(error);
    }
  };

  const openDeleteDialog = (quiz) => {
    setSelectedQuiz(quiz);
    setDeleteDialog(true);
  };

  const handleEditQuiz = (quiz) => {
    quiz.isQuiz ?     navigate('/app/analytics/create-quiz' , { state: { quiz: quiz, edit: true } }) : navigate('/app/analytics/create-poll' , { state: { poll: quiz, edit: true } })

  };
  

  return (
    <div className="quiz-analysis-container ">
      <h2 className="quiz-analysis-title ">
        Quiz Analysis
      </h2>
      <div className="quiz-analysis-table-container">
        <table className="quiz-analysis-table ">
          <thead>
            <tr className="quiz-analysis-table-header">
              <th className="quiz-analysis-table-header-cell py-2 text-center px-4 font-bold">S.No</th>
              <th className="quiz-analysis-table-header-cell ">Quiz Name</th>
              <th className="quiz-analysis-table-header-cell ">Created on</th>
              <th className="quiz-analysis-table-header-cell ">Impression</th>
              <th className="quiz-analysis-table-header-cell ">Actions</th>
              <th className="quiz-analysis-table-header-cell ">Analysis</th>
            </tr>
          </thead>
          <tbody>
            {quizData.map((quiz, index) => (
              <tr
                key={quiz._id}
                className={`quiz-analysis-table-row `}
              >
                <td className="quiz-analysis-table-cell ">{index + 1}</td>
                <td className="quiz-analysis-table-cell ">{quiz.title}</td>
                <td className="quiz-analysis-table-cell ">{formatDate(quiz.createdAt)}</td>
                <td className="quiz-analysis-table-cell ">{quiz.impressions}</td>
                <td className="quiz-analysis-table-actions ">
                  <div className="quiz-action-edit">
                    <BiEdit size={20} color="#854CFF" onClick={() => handleEditQuiz(quiz)} />
                  </div>
                  <div className="quiz-action-delete">
                    <RiDeleteBin6Fill size={20} color="#D60000" onClick={() => openDeleteDialog(quiz)} />
                  </div>
                  <div className="quiz-action-share">
                    <HiMiniShare size={20} color="#60B84B" onClick={() => handleCopyLink(quiz)} />
                  </div>
                </td>
                <td
                  className="quiz-analysis-link "
                  onClick={() => navigate(`/app/analytics/${quiz._id}`)}
                  style={{ cursor: 'pointer', textDecoration: 'none' }}
                >
                  Question Wise Analysis
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {deleteDialog && (
        <DeleteDialog
          onConfirm={handleDelete}
          onCancel={() => setDeleteDialog(false)}
        />
      )}
    </div>
  );
  };

export default QuizAnalysisReport;
