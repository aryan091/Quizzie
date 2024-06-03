import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import './Login.css'
const Login = (props) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // Loading state

  const [statusMessage, setStatusMessage] = useState('');

  const handleLogin = async () => {
    setLoading(true); // Set loading to true when API call starts
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/login`;
      const response = await axios.post(reqUrl, {
        email: form.email,
        password: form.password
      });

      localStorage.setItem("token", response.data.message.token);
      console.log(response);
      toast.success(`Welcome ${response.data.message.user.name}!`);

      // Navigate to the dashboard
      navigate('/app/dashboard');
    } catch (error) {
      console.log(error);
      // setStatusMessage(error.response.data.message);
    } finally {
      setLoading(false); // Set loading back to false when API call completes
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let errors = {};

    if (!form.email) {
      errors.email = 'Please provide Email';
      valid = false;
    }
    if (!form.password) {
      errors.password = 'Please provide password';
      valid = false;
    }
    setErrors(errors);

    if (valid) {
      handleLogin();
    }
  };

  return (
    <div className="login-modal-container">
      <p className="modal-text">QUIZZIE</p>
      <div className="login-button-container">
        <button onClick={props.clickSignUp} className="sign-up-button ">
          Sign Up
        </button>
        <button onClick={props.clickLogin} className="login-button ">
          Login
        </button>
      </div>
  
      <div className="login-form-container ">
        <div className="form-group ">
          <div className="form-row ">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-input "
            />
          </div>
        </div>
  
        <div className="form-group ">
          <div className="form-row">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-input "
            />
          </div>
        </div>
  
        <div className="submit-button-container  ">
          <div onClick={handleSubmit} className="submit-button">
            Login
          </div>
        </div>
      </div>
    </div>
  );
  };

export default Login;
