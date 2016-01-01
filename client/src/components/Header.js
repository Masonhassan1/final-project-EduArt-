import { useState ,useEffect} from "react";
import {NavLink,useNavigate} from "react-router-dom";
import "./Header.css"



function Header({isAuth,logout/* ,getUserDetails */}) {

  const [showUserPro,setShowUserPro] = useState(false)
  
  const navigate = useNavigate()
  function shwoUserProHandler (){
    setShowUserPro(!showUserPro)
  }
    console.log(showUserPro)


  

  return (
  <div className='header'>
   
    <div className="logo" onClick={()=>navigate("/")}><img className='img front' src={require ("../Images/logo.png")} alt=""/>
   
    </div>
    <div className='navy'>
      <i className="fa-solid fa-user " id="user-profile" onClick={shwoUserProHandler}>
        <ul className={showUserPro?"user-pro-ul":"hide-userPro-ul "}>
          <li>My class</li>
          <li>Learning desk</li>
          <li>My profile</li>
         
        </ul>

      </i>
      
      
      <NavLink className="nav-link" to="/">

    <div className="navy-home">Home</div>
      </NavLink>
      <NavLink className="nav-link" to="/courselist">

    <div className="navy-courses">Online courses</div>
      </NavLink>
      <NavLink className="nav-link" to="login">

    <div className="navy-login" onClick={logout}>{isAuth? "Logoout":"Login"}</div>
      </NavLink>
      <NavLink className="nav-link" to="login">

<div className="navy-login">About us</div>
  </NavLink>

    </div>
  </div>
   
  )
}

export default Header