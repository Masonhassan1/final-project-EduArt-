import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { addCourseOnDashborad } from "../CoursePage/CoursePage";
import { MyContext } from "../../App";
import axios from "axios";
import "./Login.css";

function Login({ handelSuccessfullLogin, isAuth, isAdmin }) {
  const contextContent = useContext(MyContext);
  const intl = useIntl();
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
    try {
      setLoginLoading(true);
      const axiosResp = await axios.post("http://localhost:4000/login", data);
      console.log("my axiosResp.data:", axiosResp.data);
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
        await addCourseOnDashborad(selectedCourse);
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
    if (isAdmin) {
      setTimeout(() => navigate("/adminpanel"), 700);
    } else {
      setTimeout(() => navigate("/mylearningdesk"), 700);
    }
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
        <div>
          <FormattedMessage id="login_f" defaultMessage="Login" />
        </div>
        <p>
          <FormattedMessage
            id="dont_have_account"
            defaultMessage="Don´t have an account?"
          />
          <Link className="link" to="/register">
            <FormattedMessage id="register" defaultMessage="register" />
          </Link>
        </p>
        <p>
          <FormattedMessage
            id="or_sign_in_via_email"
            defaultMessage="or sign in via email"
          />
        </p>

        <input
          className="login-input login-email"
          ref={emailEl}
          type="email"
          required
          placeholder={intl.formatMessage({
            defaultMessage: "Email",
            id: "email",
          })}
        />
        <div className="log-password-div">
          <input
            className="login-input"
            ref={passwordEl}
            type={showPassword ? "text" : "password"}
            required
            placeholder={intl.formatMessage({
              defaultMessage: "Password",
              id: "password",
            })}
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
        <button id="login-btn" type="submit">
          <FormattedMessage id="login_f" defaultMessage="Login" />
        </button>
        {error ? (
          <div style={{ color: "red" }}>
            <FormattedMessage
              id="sorry"
              defaultMessage="Sorry.. something went wrong. please try again"
            />
          </div>
        ) : (
          ""
        )}
      </form>
      {loginLoading ? (
        <div className="login-loading">
          <FormattedMessage id="loading" defaultMessage="loading..." />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Login;
