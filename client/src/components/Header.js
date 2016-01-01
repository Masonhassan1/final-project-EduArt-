import React,{ useEffect }  from 'react'
import "./Header.css"



function Header() {
  
  
    
  return (
  <div className='header'>
   
    <div className="logo"><img className='img front' src={require ("../logo.png")} alt="" />
   
    </div>
    <div className='navy'>
    <div className="navy-home">Home</div>
    <div className="navy-courses">Online courses</div>
    <div className="navy-login">Login</div>

    </div>
  </div>
   
  )
}

export default Header