import React,{ useEffect }  from 'react'
import "./Header.css"



function Header() {
  
  useEffect(()=>{
    document.querySelector(".logo").textContent=" EduArt "
    },[])
    
  return (
  <div className='header'>
   
    <div className="logo"></div>
    <div className='navy'>
    <div className="navy-home">Home</div>
    <div className="navy-courses">Online courses</div>
    <div className="navy-login">Login</div>

    </div>
  </div>
   
  )
}

export default Header