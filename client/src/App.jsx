import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Home from './components/Home/Home';
import MainLayout from './components/MainLayout/MainLayout';
import Dashboard from './components/Dashboard/Dashboard';
import QuizAnalysisReport from './components/QuizAnalysisReport/QuizAnalysisReport';
import QuizQuestion from './components/QuizQuestion/QuizQuestion';
import PollQuestion from './components/PollQuestions/PollQuestions';
import { QuizProvider } from './context/QuizContext'
import QuizAnalysis from './QuizAnalysis/QuizAnalysis';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './components/NotFound/NotFound';
import { UserContextProvider} from './context/UserContext';
import { ToastContainer , Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {

  return (
    <UserContextProvider>
    <QuizProvider>

    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/app/*" element={<MainLayout />}>
            <Route path="dashboard" element={<ProtectedRoute Component={Dashboard} />} />
            <Route path="analytics" element={<ProtectedRoute Component={QuizAnalysisReport} />} />
            <Route path="analytics/:id" element={<ProtectedRoute Component={QuizAnalysis} />} />
            <Route path="analytics/create-quiz" element={<ProtectedRoute Component={QuizAnalysis} />} />
            <Route path="analytics/create-poll" element={<ProtectedRoute Component={QuizAnalysis} />} />
          </Route>

          <Route path="/api/v1/quiz/view-quiz/:quizId" element={<QuizQuestion />} />
          <Route path="/api/v1/poll/view-poll/:pollId" element={<PollQuestion />} />
                        <Route path="*" element={<NotFound />} />

      </Routes>
      <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce} />

    </Router>
            </QuizProvider>
            </UserContextProvider>

  );
}

export default App;
