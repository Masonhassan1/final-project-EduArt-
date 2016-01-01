import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { MyContext } from "../App";
import { LOCALES } from "../util/lang/locales";

import "./Header.css";

const languages = [
  { name: "English", code: LOCALES.ENGLISH },
  { name: "Russian", code: LOCALES.RUSSIAN },
];

function Header({
  isAuth,
  logout,
  userName,
  setUserName,
  setHeaderAlarm,
  isAdmin,
}) {
  const contextContent = useContext(MyContext);
  const { lang, setLang } = contextContent;
  const [showUserPro, setShowUserPro] = useState(false);
  const navigate = useNavigate();

  console.log("LOCALES", LOCALES.ENGLISH);

  function shwoUserProHandler() {
    document
      .querySelector("#user-profile-list")
      .removeAttribute("class", "hide-user-profile-list");
    setShowUserPro(!showUserPro);
  }
  useEffect(() => {
    if (!isAuth) {
      setUserName("");
      document
        .querySelector("#user-profile-list")
        .setAttribute("class", "hide-user-profile-list");
    }
    setShowUserPro(false);
  }, [isAuth]);

  function hideUserProHandler() {
    setShowUserPro(false);
    setHeaderAlarm(true);
    /*  document.querySelector("#alarm").setAttribute("class", "alarm"); */
    setTimeout(() => {
      /*  document.querySelector("#alarm").removeAttribute("class", "alarm"); */
      setHeaderAlarm(false);
    }, 2500);
  }

  const userProfileColor = localStorage.getItem("color");
  useEffect(() => {
    const navEl = document.querySelectorAll(".user-pro-color");
    navEl.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        el.style.color = userProfileColor;
      });
      el.addEventListener("mouseleave", () => {
        el.style.color = "#8b8b8b";
      });
    });
  }, [userProfileColor]);

  useEffect(() => {
    document
      .querySelector("#user-profile-list")
      .setAttribute("class", "hide-user-profile-list");
  }, []);

  return (
    <div className="header" style={{ gap: `${isAdmin ? "11%" : "15%"}` }}>
      <div className="logo" onClick={() => navigate("/")}>
        <img className="img front" src={require("../Images/logo.png")} alt="" />
      </div>
      <div className="navy">
        <div className="change-lang">
          <select
            value={localStorage.getItem("lang") || LOCALES.ENGLISH}
            onChange={(event) => {
              const value = event.currentTarget.value;
              setLang(value);
              localStorage.setItem("lang", value);
            }}
          >
            {languages.map(({ name, code }) =>
              code === localStorage.getItem("lang") ? (
                <option key={code} value={code}>
                  {name}
                </option>
              ) : (
                <option key={code} value={code}>
                  {name}
                </option>
              )
            )}
          </select>
        </div>
        <div className="header-user-name">
          {userName ? `Logged in as ${userName}` : ""}
        </div>
        <i
          className="fa-solid fa-user user-pro-color"
          id="user-profile"
          onClick={isAuth ? shwoUserProHandler : hideUserProHandler}
        >
          <ul
            id="user-profile-list"
            className={showUserPro ? "user-pro-ul" : "hide-userPro-ul"}
          >
            <li
              className="user-pro-color"
              onClick={() => navigate("/mylearningdesk")}
            >
              Learning desk
            </li>
            <li
              className="user-pro-color"
              onClick={() => navigate("/userprofile")}
            >
              My profile
            </li>
            <li
              className="user-pro-color"
              onClick={() => navigate("/random")}
            >
              Random
            </li>
          </ul>
        </i>
        {isAuth && isAdmin && (
          <NavLink className="nav-link" to="/adminpanel">
            <div className="navy-home user-pro-color">
              <FormattedMessage id="admin_panel" />
            </div>
          </NavLink>
        )}
        <NavLink className="nav-link" to="/">
          <div className="navy-home user-pro-color">
            <FormattedMessage id="home" />
          </div>
        </NavLink>
        <NavLink className="nav-link" to="/courselist">
          <div className="navy-courses user-pro-color">
            <FormattedMessage id="online_courses" />
          </div>
        </NavLink>
        <NavLink className="nav-link" to={isAuth ? "/" : "login"}>
          <div className="navy-login user-pro-color" onClick={logout}>
            {isAuth ? (
              <FormattedMessage id="logout" />
            ) : (
              <FormattedMessage id="login" />
            )}
          </div>
        </NavLink>

        <NavLink className="nav-link" to="/about">
          <div className="navy-login user-pro-color">
            <FormattedMessage id="about_us" />
          </div>
        </NavLink>
      </div>
      <div id="alarm">
        <FormattedMessage id="please_login_first" />
      </div>
    </div>
  );
}

export default Header;
