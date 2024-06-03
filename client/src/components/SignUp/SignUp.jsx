import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { PropagateLoader } from 'react-spinners'; // Import the spinner component

import "./SignUp.css";

const SignUp = (props) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [statusMessage, setStatusMessage] = useState("");

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
  };
  

  const handleRegister = async () => {
    setLoading(true);
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/register`;

      const response = await axios.post(reqUrl, {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      console.log(response.data);
      setStatusMessage("User registered successfully");
      toast.success(`${form.name} Registered Successfully!`);

      props.handleSignUpSuccess();
      return response.data;
    } catch (error) {
      console.error(error);
      setStatusMessage(
        error.response?.data?.message || "User registration failed"
      );
    } finally {
      setLoading(false); // Set loading back to false when API call completes
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let validationErrors = {};

    if (!form.name) {
      validationErrors.name = "Please provide name";
      valid = false;
    }

    if (!form.email) {
      validationErrors.email = "Please provide Email";
      valid = false;
    }

    if (!form.password) {
      validationErrors.password = "Please provide password";
      valid = false;
    }

    if (!form.confirmPassword) {
      validationErrors.confirmPassword = "Please confirm password";
      valid = false;
    }

    if (form.password !== form.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(validationErrors);

    if (valid) {
      handleRegister();
    }
  };

  return (
    <div className="sign-up-modal-container ">
      <p className="modal-text">QUIZZIE</p>
      <div className="sign-up-button-div ">
        <button
          onClick={props.clickSignUp}
          className="sign-up-button  "
        >
          Sign Up
        </button>
        <button
          onClick={props.clickLogin}
          className="login-button  "
        >
          Login
        </button>
      </div>

      <div className="sign-up-form ">
        <div className="form-group ">
          <div className=" formy ">
            <label className="name-field ">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder={errors.name}
              className="name-input "
              onChange={handleChange}
            />
          </div>
          {errors.name && <p className="error-msg">{errors.name}</p>}
        </div>

        <div className="form-group ">
          <div className="formy">
            <label className="name-field">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder={errors.email}
              className="name-input "
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className="error-msg">{errors.email}</p>}
        </div>

        <div className="form-group ">
          <div className="formy">
            <label className="name-field">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder={errors.password}
              className="name-input "
              onChange={handleChange}
            />
          </div>
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        <div className="form-group ">
          <div className="formy">
            <label className="name-field">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              placeholder={errors.confirmPassword}
              className="name-input"
              onChange={handleChange}
            />
          </div>
          {errors.confirmPassword && (
            <p className="error-msg">{errors.confirmPassword}</p>
          )}
        </div>

        <div className=" button-grp flex justify-center mx-auto">
          <button
            className="sign-up-submit-button"
            onClick={handleSubmit}
            disabled={loading}
          >
          Sign-Up
          </button>
        </div>
        {statusMessage && (
          <p className=" status-message ">{statusMessage}</p>
        )}
        {loading && (
        <div style={loadingSpinnerStyles}>
        <PropagateLoader color="#ffffff" />
      </div>
      )}
      </div>
    </div>
  );
};

export default SignUp;
