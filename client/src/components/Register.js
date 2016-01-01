import React from 'react'
import "./Register.css"

function Register() {
  return (
    <div className='register'>

    <form action="">
     <div>Register</div>
     <input type="text" required placeholder='User name'/>
     <input type="email" required placeholder='Email'/>
     <input type="password" required placeholder='Password'/>
     <button className='register-btn'>Login</button>
    </form>
     </div>
  )
}

export default Register