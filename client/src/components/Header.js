import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ isAuth, logout /* ,getUserDetails */ }) {
  console.log(isAuth);
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="logo" onClick={() => navigate("/")}>
        <img className="img front" src={require("../Images/logo.png")} alt="" />
      </div>
      <div className="navy">
        <div className="user-profile" /*   */>
          <i className="fa-solid fa-user"></i>
        </div>
        <NavLink className="nav-link" to="/">
          <div className="navy-home">Home</div>
        </NavLink>
        <NavLink className="nav-link" to="/courselist">
          <div className="navy-courses">Online courses</div>
        </NavLink>
        <NavLink className="nav-link" to="login">
          <div className="navy-login" onClick={logout}>
            {isAuth ? "Logoout" : "Login"}
          </div>
        </NavLink>
        <NavLink className="nav-link" to="/about">
          <div className="navy-login">About us</div>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
