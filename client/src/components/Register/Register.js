import React,{useEffect,useState,useRef} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios"
import "./Register.css"

function Register() {
  const navigate = useNavigate()
  const [showPassword,setShowPassword] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [user,setUser]= useState("")
 
  useEffect(()=>{
    document.querySelector(".f-name-input").focus()
  })
  const formEl = useRef(null);
  const firstNameEl = useRef(null); 
  const lastNameEl = useRef(null); 
  const userNameEl = useRef(null); 
  const emailEl = useRef(null); 
  const passwordEl = useRef(null); 
  async function submitHandler(e){
    e.preventDefault();
    const userData ={
      firstName: firstNameEl.current.value,
      lastName:lastNameEl.current.value,
      userName: userNameEl.current.value,
      eMail: emailEl.current.value,
      password: passwordEl.current.value
    }
    console.log(userData)
    try {
      setIsLoading(true);
      const axiosResp = await axios.post("http://localhost:4000/register", userData);
      setIsLoading(false);
     
      
      if(axiosResp.data.error) {
       console.log(axiosResp.data.error)
       setIsError(true)
       setIsLoading(false)
        return;
      }

      console.log("axiosResp.data", axiosResp.data)
     
  }catch (error){
    setIsError(true)
    setIsLoading(false)
  
    return;
  }
  setUser(userData.firstName)
  setIsRegistered(true);
  formEl.current.reset();
  }

  if(isRegistered){setTimeout(()=> navigate("/login"),3500)}

  function passwordHandler (){
     if(passwordEl.current.value) setShowPassword(!showPassword)
  }
 
  return (
  
   
    <div className='register'>
     
    <div className="reg-form-container">

    <form ref={formEl} className={isLoading? "reg-form reg-form-opacity":"reg-form"} action="">
     <div>Register</div>
     <br />
     <input className='reg-input f-name-input' ref={firstNameEl} type="text"  placeholder='First name'/>
     <input  className='reg-input' ref={lastNameEl} type="text"  placeholder='Last name'/>
     <input  className='reg-input' ref={userNameEl} type="text"  placeholder='User name'/>
     <input  className='reg-input' ref={emailEl} type="email"  placeholder='Email'/>
     <input  className='reg-input' ref={passwordEl} type={showPassword? "text":"password"}  placeholder='Password'/>
     <div className='reg-show-password' onClick={passwordHandler}>{showPassword? <span><i class="fa-solid fa-eye-slash"></i></span>:<span><i class="fa-solid fa-eye"></i></span>}</div>
     <button className='register-btn' onClick={submitHandler}>Register</button>
     {isRegistered? <> <div > Hello <span style={{color:"darkorange",fontStyle:"italic"}}>{user}</span> you were successfully registered</div> <div>Your will be automatically directed to <span style={{color:"darkorange",fontStyle:"italic"}}>login</span> page</div></>:""}
     {isError? <div style={{color:"red"}}>Sorry.. something went wrong. please try again</div>:""}
    </form>
       {isLoading? <div className='reg-loading'>loading...</div>:""}  
     
    </div>
      </div>

 
     
    
   
  )
}

export default Register