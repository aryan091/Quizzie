import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import './Home.css';

const Home = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  
  const { setUsername, setId, setIsUserLoggedIn, isUserLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUpSuccess = () => {
    setIsSignUp(false);
    setIsLogin(true);
  };

  const clickLogin = () => {
    setIsLogin(true);
    setIsSignUp(false);
  };

  const clickSignUp = () => {
    setIsSignUp(true);
    setIsLogin(false);
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/app/dashboard');
    }
  }, [isUserLoggedIn, navigate]);

  return (
    <div>
      <div className='login-sign-up-container'>
        {isSignUp && <SignUp handleSignUpSuccess={handleSignUpSuccess} clickLogin={clickLogin} clickSignUp={clickSignUp} />}
        {isLogin && <Login clickLogin={clickLogin} clickSignUp={clickSignUp} />}
      </div>
    </div>
  );
};

export default Home;
