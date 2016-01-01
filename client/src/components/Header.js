import { useState,useEffect } from "react";
import {NavLink,useNavigate} from "react-router-dom";
import "./Header.css"



function Header({isAuth,logout/* ,getUserDetails */}) {

  const [showUserPro,setShowUserPro] = useState(false)
  const navigate = useNavigate()

 
  function shwoUserProHandler (){
    document.querySelector("#user-profile-list").removeAttribute("class","hide-user-profile-list")
    setShowUserPro(!showUserPro)
  }
  function hideUserProHandler (){
    setShowUserPro(false)
    document.querySelector("#alarm").setAttribute("class","alarm")
    setTimeout(() => {
      document.querySelector("#alarm").removeAttribute("class","alarm")
      
    }, 2500);
   
  }
   
useEffect(()=>{
  document.querySelector("#user-profile-list").setAttribute("class","hide-user-profile-list")
},[])

const color = localStorage.getItem("color")
  return (
  <div className='header' >
   
    <div className="logo" onClick={()=>navigate("/")}><img className='img front' src={require ("../Images/logo.png")} alt=""/>
   
    </div>
    <div className='navy' >
      <i className="fa-solid fa-user" id="user-profile" onClick={isAuth? shwoUserProHandler:hideUserProHandler}>
        <ul id="user-profile-list" className={showUserPro?"user-pro-ul":"hide-userPro-ul"}>
          
          <li >My class</li>
          <li>Learning desk</li>
          <li onClick={()=>navigate("/userprofile")}>My profile</li> 
        </ul>
      </i> 
      <NavLink className="nav-link" to="/">

    <div className="navy-home" >Home</div>
      </NavLink>
      <NavLink className="nav-link" to="/courselist">

    <div className="navy-courses">Online courses</div>
      </NavLink>
      <NavLink className="nav-link" to={isAuth?"/":"login"}>

    <div className="navy-login" onClick={logout }>{isAuth? "Logoout":"Login"}</div>
      </NavLink>

      <NavLink className="nav-link" to="login">

<div className="navy-login">About us</div>
  </NavLink>

    </div>
     <div id="alarm" >
        
     Please login first to see your profile options
        
        
     </div>
  </div>
   
  )
}

export default Header