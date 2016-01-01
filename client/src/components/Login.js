import React,{useRef} from 'react'
import {Link} from "react-router-dom";
import "./Login.css"

function Login() {


  return (
    <div className='login'>

   <form action="">
    <div>Login</div>
    <p>Don´t have an account? <Link className='link' to= "/register">register</Link> </p>
    <p>or sign in via email</p>
    
    <input type="text" required placeholder='User name'/>
    <input type="email" required placeholder='Email'/>
    <input type="password" required placeholder='Password'/>
    <button className='login-btn'>Login</button>
   </form>
    </div>
  )
}

export default Login