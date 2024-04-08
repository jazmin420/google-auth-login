import React, { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from '@react-oauth/google';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "need strong password";
      toast.error(validationErrors.email);
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "email is not valid";
      toast.error(validationErrors.email);
    }

    if (!formData.password.trim()) {
      validationErrors.password = "password is required";
      toast.error(validationErrors.password);
    } else if (formData.password.length < 6) {
      validationErrors.password = "password should be at least 6 characters";
      toast.error(validationErrors.password);
    }

    if (Object.keys(validationErrors).length === 0) {
      toast.success("login successfully");
      setFormData({ email: " ", password: " " });
    }
  };

  return (
    <>
      <div className="wrapper">
        <form action="#" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="input-field">
            <input type="email" name="email" required onChange={handleChange} />
            <label>Enter your email</label>
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div className="input-field">
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
            />
            <label>Enter your password</label>
            {errors.password && <span>{errors.password}</span>}
          </div>
          <div className="forget">
            <label htmlFor="remember">
              <input type="checkbox" id="remember" />
              <p>Remember me</p>
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Log In</button>
          <div className="register">
            <p>
              Don't have an account? <a href="#">Register</a>
            </p>
          </div>
        </form>
        <div className="google">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              toast.success("Logged in with Google successfully!");
            }}
            onError={() => {
              console.log("Login Failed");
              toast.error("Google login failed.");
            }}
          />
          ;
        </div>
      </div>
      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
    </>
  );
}

export default Login;
