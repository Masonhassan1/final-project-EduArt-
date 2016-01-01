import {NavLink,useNavigate} from "react-router-dom";
import "./Header.css"



function Header() {
  const navigate = useNavigate()
  
    
  return (
  <div className='header'>
   
    <div className="logo" onClick={()=>navigate("/")}><img className='img front' src={require ("../Images/logo.png")} alt="" />
   
    </div>
    <div className='navy'>
      <NavLink className="nav-link" to="/">

    <div className="navy-home">Home</div>
      </NavLink>
      <NavLink className="nav-link" to="/courselist">

    <div className="navy-courses">Online courses</div>
      </NavLink>
      <NavLink className="nav-link" to="login">

    <div className="navy-login">Login</div>
      </NavLink>

    </div>
  </div>
   
  )
}

export default Header