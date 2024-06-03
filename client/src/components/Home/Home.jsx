import React , {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';

import './Home.css'

const Home = () => {


    const [isSignUp, setIsSignUp] = useState(true);
    const [isLogin, setIsLogin] = useState(false);

    const navigate = useNavigate();
    const handleSignUpSuccess = () => {
        setIsSignUp(false);
        setIsLogin(true);
      };
      
  
    const clickLogin = () => {
        setIsLogin(true);
        setIsSignUp(false);
    }

    const clickSignUp = () => {
        setIsSignUp(true);
        setIsLogin(false);
    }
  

return (
    <div >
         <div className='login-sign-up-container '>
     {isSignUp && <SignUp handleSignUpSuccess={handleSignUpSuccess} clickLogin={clickLogin} clickSignUp={clickSignUp} />}
    { isLogin && <Login clickLogin={clickLogin} clickSignUp={clickSignUp}/>}

</div>


    </div>

  )
}

export default Home;

