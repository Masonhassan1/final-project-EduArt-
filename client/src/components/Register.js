import React,{useState,useRef} from 'react'
import axios from "axios"
import "./Register.css"

function Register() {
  const [isLoading,setIsLoading] = useState(false)

  const formEl = useRef(null);
  const nameEl = useRef(null); 
  const emailEl = useRef(null); 
  const passwordEl = useRef(null); 
  async function submitHandler(e){
  
    const userData ={
      name: nameEl.current.value,
      email: emailEl.current.value,
      password: passwordEl.current.value
    }
    try {
      setIsLoading(true);
      const axiosResp = await axios.post("http://localhost:3000/", userData);
      setIsLoading(false);
     
  }catch (error){
    console.log("error")
  }

  }
  return (
    <div className='register'>

    <form ref={formEl} className='reg-form' action="">
     <div>Register</div>
     <input ref={nameEl} type="text" required placeholder='User name'/>
     <input ref={emailEl} type="email" required placeholder='Email'/>
     <input ref={passwordEl} type="password" required placeholder='Password'/>
     <button className='register-btn' onClick={submitHandler}>Register</button>
    </form>
     </div>
  )
}

export default Register