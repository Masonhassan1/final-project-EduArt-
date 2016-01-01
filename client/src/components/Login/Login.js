import React,{useState,useRef} from 'react'
import {Link} from "react-router-dom";
import axios from "axios"
import "./Login.css"

function Login({handleSuccessfullLogin}) {
  const [showPassword,setShowPassword] = useState(false)
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  const formEl = useRef(null)
  const emailEl = useRef(null)
  const passwordEl = useRef(null)

  const submitHandler = async (e) => {

    e.preventDefault();
    
    const data = {
      eMail: emailEl.current.value,
      password: passwordEl.current.value
    }
    console.log(data)
    try {
      setIsLoading(true);
      const axiosResp = await axios.post("http://localhost:4000/login", data);
      console.log("axiosResp.data:", axiosResp.data);
      setIsLoading(false);

      if(axiosResp.data.error) {
        setError(axiosResp.data.error);
        console.log("error",error)
        return;
      }
      
      setError("");
      handleSuccessfullLogin(axiosResp.data);
    } catch (error) {
      console.error("Error while sending with axios", error);
      setError(error);
      return;
    }
    
    formEl.current.reset(); 
  }

  function passwordHandler (){
    setShowPassword(!showPassword)
  }
  return (
    <div className='login'>

   <form className='log-form' ref={formEl}   method="post"
        action='/login'  onSubmit={submitHandler}>
    <div>Login</div>
    <p>Don´t have an account? <Link className='link' to= "/register">register</Link> </p>
    <p>or sign in via email</p>
    
    
    <input className='login-input' ref={emailEl} type="email" required placeholder='Email'/>
    <input className='login-input' ref={passwordEl} type={showPassword? "text":"password"}  required placeholder='Password'/>
    <div className='login-show-password' onClick={passwordHandler}>{showPassword? <span><i class="fa-solid fa-eye-slash"></i></span>:<span><i class="fa-solid fa-eye"></i></span>}</div>
    <button className='login-btn' type='submit'>Login</button>
   </form>
    </div>
  )
}

export default Login