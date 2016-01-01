import React,{useState,useRef} from 'react'
import axios from "axios"
import {Spinner} from "react-bootstrap"
import "./Register.css"

function Register() {
  const [isLoading,setIsLoading] = useState(false)

  const formEl = useRef(null);
  const birthdayEl = useRef(null)
  const nameEl = useRef(null); 
  const emailEl = useRef(null); 
  const passwordEl = useRef(null); 
  async function submitHandler(e){
  
    const userData ={
      name: nameEl.current.value,
      birthday:birthdayEl.current.value,
      email: emailEl.current.value,
      password: passwordEl.current.value
    }
    try {
      setIsLoading(true);
      const axiosResp = await axios.post("http://localhost:3000/user", userData);
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
      <div >

    <form ref={formEl} className='reg-form' action="">
     <div>Register</div>
     <input ref={nameEl} type="text"  placeholder='User name'/>
     <input ref={birthdayEl} type="text" placeholder='Birthday'/>
     <input ref={emailEl} type="email"  placeholder='Email'/>
     <input ref={passwordEl} type="password"  placeholder='Password'/>
     <button className='register-btn' onClick={submitHandler}>Register</button>
     {isLoading?  <div >
          <Spinner className="spinner" animation="border" variant="info"/>
        </div>:""}
    </form>
      </div>

 
     </div>
    
   
  )
}

export default Register