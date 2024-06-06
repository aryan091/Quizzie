import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import axios from 'axios';
import Shimmer from '../Shimmer/Shimmer';
import './Home.css';

const Home = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [loading , setLoading] = useState(true);
  
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
    setLoading(true);
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token -", token);
        if (token) {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/profile`);
          setUsername(response.data.message.name);
          setId(response.data.message._id);
          navigate('/app/dashboard');
        } else {
          setIsUserLoggedIn(false);
          setUsername(null);
          setId(null);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
      finally {
        setLoading(false); // Set loading back to false when API call completes
      }
    };
    getUser();
  }, [isUserLoggedIn, navigate, setUsername, setId, setIsUserLoggedIn]);

  if(loading)
    {
      return <Shimmer />
    }

  return (
    <div className='login-sign-up-container'>
      {loading ? <Shimmer /> : (
        <>
          {isSignUp && <SignUp handleSignUpSuccess={handleSignUpSuccess} clickLogin={clickLogin} clickSignUp={clickSignUp} />}
          {isLogin && <Login clickLogin={clickLogin} clickSignUp={clickSignUp} />}
        </>
      )}
    </div>
  );
};

export default Home;
