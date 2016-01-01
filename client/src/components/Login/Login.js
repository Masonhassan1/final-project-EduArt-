import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findLDeskIdAndAddCourse } from "../CoursePage/CoursePage";
import { MyContext } from "../../App";
import axios from "axios";
import "./Login.css";

function Login({ handelSuccessfullLogin, isAuth }) {
  const contextContent = useContext(MyContext);
  const { selectedCourse, setSelectedCourse } = contextContent;

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector(".login-email").focus();
  });

  const formEl = useRef(null);
  const emailEl = useRef(null);
  const passwordEl = useRef(null);

  const submitHandler = async (e) => {
    setError(false);
    e.preventDefault();

    const data = {
      eMail: emailEl.current.value,
      password: passwordEl.current.value,
    };
    console.log(data);
    try {
      setLoginLoading(true);
      const axiosResp = await axios.post("http://localhost:4000/login", data);
      /* console.log("axiosResp.data:", axiosResp.data); */
      setLoginLoading(false);

      if (axiosResp.data.error) {
        setLoginLoading(false);
        setError(axiosResp.data.error);
        console.log("error", error);
        return;
      }

      setError("");
      handelSuccessfullLogin(axiosResp.data);
      if (selectedCourse) {
        await findLDeskIdAndAddCourse(selectedCourse);
        setSelectedCourse(null);
      }
    } catch (error) {
      setLoginLoading(false);
      /*  console.error("Error while sending with axios", error); */
      setError(error);
      return;
    }

    formEl.current.reset();
  };

  function passwordHandler() {
    if (passwordEl.current.value) setShowPassword(!showPassword);
  }
  if (isAuth) {
    setTimeout(() => navigate("/"), 1000);
  }

  return (
    <div className="login">
      <form
        className={loginLoading ? "log-form log-form-opacity" : "log-form"}
        ref={formEl}
        method="post"
        action="/login"
        onSubmit={submitHandler}
      >
        <div>Login</div>
        <p>
          Don´t have an account?{" "}
          <Link className="link" to="/register">
            register
          </Link>{" "}
        </p>
        <p>or sign in via email</p>

        <input
          className="login-input login-email"
          ref={emailEl}
          type="email"
          required
          placeholder="Email"
        />
        <div className="log-password-div">
          <input
            className="login-input"
            ref={passwordEl}
            type={showPassword ? "text" : "password"}
            required
            placeholder="Password"
          />
          <div className="login-show-password" onClick={passwordHandler}>
            {showPassword ? (
              <span>
                <i className="fa-solid fa-eye-slash"></i>
              </span>
            ) : (
              <span>
                <i className="fa-solid fa-eye"></i>
              </span>
            )}
          </div>
        </div>
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
      {loginLoading ? <div className="login-loading">loading...</div> : ""}
    </div>
  );
}

export default Login;
