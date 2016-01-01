import React,{useState,useRef} from 'react'
import axios from "axios"
import {Spinner} from "react-bootstrap"
import "./Register.css"

function Register() {
  const [isLoading,setIsLoading] = useState(false)

  const formEl = useRef(null);
  const firstNameEl = useRef(null); 
  const lastNameEl = useRef(null); 
  const userNameEl = useRef(null); 
  const birthdayEl = useRef(null)
  const emailEl = useRef(null); 
  const passwordEl = useRef(null); 
  async function submitHandler(e){
  
    const userData ={
      firstName: firstNameEl.current.value,
      lastName:lastNameEl.current.value,
      userName: userNameEl.current.value,
      dateOfBirth:birthdayEl.current.value,
      eMail: emailEl.current.value,
      password: passwordEl.current.value
    }
    console.log(userData)
    try {
      setIsLoading(true);
      const axiosResp = await axios.post("http://localhost:4000/user", userData);
      setIsLoading(false);
      if(axiosResp.data.error) {
       console.log(axiosResp.data.error)
        return;
      }

      console.log("axiosResp.data", axiosResp.data)
     
  }catch (error){
    console.log("error")
  }

  }
  return (
  
   
    <div className='register'>
     
    <div className="reg-form-container">

    <form ref={formEl} className='reg-form' action="">
     <div>Register</div>
     <br />
     <input ref={firstNameEl} type="text"  placeholder='First name'/>
     <input ref={lastNameEl} type="text"  placeholder='Last name'/>
     <input ref={userNameEl} type="text"  placeholder='User name'/>
     <input ref={birthdayEl} type="text" placeholder='Birthday dd.mm.yy'/>
     <input ref={emailEl} type="email"  placeholder='Email'/>
     <input ref={passwordEl} type="password"  placeholder='Password'/>
     <button className='register-btn' onClick={submitHandler}>Register</button>
    </form>
     
    </div>
      </div>

 
     
    
   
  )
}

export default Register