import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({
  isAuth,
  logout,
  userName,
  setUserName,
  setHeaderAlarm,
  isAdmin,
}) {
  const [showUserPro, setShowUserPro] = useState(false);
  const navigate = useNavigate();

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
          </ul>
        </i>
        {isAuth && isAdmin && (
          <NavLink className="nav-link" to="/adminpanel">
            <div className="navy-home user-pro-color">Admin panel</div>
          </NavLink>
        )}
        <NavLink className="nav-link" to="/">
          <div className="navy-home user-pro-color">Home</div>
        </NavLink>
        <NavLink className="nav-link" to="/courselist">
          <div className="navy-courses user-pro-color">Online courses</div>
        </NavLink>
        <NavLink className="nav-link" to={isAuth ? "/" : "login"}>
          <div className="navy-login user-pro-color" onClick={logout}>
            {isAuth ? "Logout" : "Login"}
          </div>
        </NavLink>

        <NavLink className="nav-link" to="/about">
          <div className="navy-login user-pro-color">About us</div>
        </NavLink>
      </div>
     
    </div>
  );
}

export default Header;
