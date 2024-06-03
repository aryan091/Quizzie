import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import {BounceLoader} from 'react-spinners'
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import './Home.css';

const Home = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const[loading , setLoading] = useState(true)
  
  const { setUsername, setId, setIsUserLoggedIn, isUserLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const loadingSpinnerStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transform:"none"
  
  }
  

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
    setLoading(true);
    if (isUserLoggedIn) {
      navigate('/app/dashboard');
    }
    setLoading(false)
  }, [isUserLoggedIn, navigate]);



  return (
    <div>
      {loading ? 
      <>      <div className="loading-spinner" >
      <BounceLoader
        color={"#ffffff"}
        loading={loading}
        cssOverride={loadingSpinnerStyles}
        size={150}
        aria-label="Loading Spinner"
      />
    </div>

      
      </>
      
    :
    
    <>
          <div className='login-sign-up-container'>
        {isSignUp && <SignUp handleSignUpSuccess={handleSignUpSuccess} clickLogin={clickLogin} clickSignUp={clickSignUp} />}
        {isLogin && <Login clickLogin={clickLogin} clickSignUp={clickSignUp} />}
      </div>

    </>}
    </div>
  );
};

export default Home;
