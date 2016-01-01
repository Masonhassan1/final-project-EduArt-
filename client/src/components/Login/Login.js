import React,{useState,useRef} from 'react'
import {Link} from "react-router-dom";
import "./Login.css"

function Login() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false)

  const formEl = useRef(null)
 
  const emailEl = useRef(null)
  const passwordEl = useRef(null)

  return (
    <div className='login'>

   <form className='log-form' ref={formEl} action="">
    <div>Login</div>
    <p>Don´t have an account? <Link className='link' to= "/register">register</Link> </p>
    <p>or sign in via email</p>
    
    
    <input className='login-input' ref={emailEl} type="email" required placeholder='Email'/>
    <input className='login-input' ref={passwordEl} type="password" required placeholder='Password'/>
    <button className='login-btn'>Login</button>
   </form>
    </div>
  )
}

export default Login