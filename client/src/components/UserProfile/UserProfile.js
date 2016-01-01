import React,{useState,useEffect,useRef} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./UserProfile.css"

function UserProfile({userProfileData,isLoading,setError,error}) {
  const [edit,setEdit]=useState(false)
  const [profileLoading,setProfileLoading] = useState(false)
  const [isError,setIsError]=useState(false)

  useEffect(()=>{
    document.querySelector(".user-gender").focus()
  })
  function editHandler (){
    setEdit(!edit)
  }
  const genderEl = useRef(null)
  const birthdayEl = useRef(null)
  const originEl = useRef(null)
  const telEl = useRef(null)
  
  async function userDataUpdateHandler (e){
    if(edit){

    
    e.preventDefault()
    setError(false)
    setIsError(false)

    const updatedUserData ={
      /* gender: genderEl.current.value,
      dateOfBirth:birthdayEl.current.value,
      origin:originEl.current.value, */
      telephoneLandLine:telEl.current.value

    }
    try {
      setProfileLoading(true)
       await axios.patch(`http://localhost:4000/user/${localStorage.getItem("userId")}`,updatedUserData)
      setProfileLoading(false)
      window.location.reload()
      
    } catch (error) {
      setProfileLoading(false)
      setIsError(true)
    } 
  }
  }
        

  return (

    <div className={isLoading || profileLoading ?  "user-profile-opacity" : "user-profile"}>
        <section className='options-list'>
            <div className="user-my-profile">
            <i className="fa-solid fa-user" style={{color:"dodgerblue"}}></i>
            <div>My profile</div>
            </div>
            <div className="user-purchase">
            <i className="fa-solid fa-bag-shopping" style={{color:"coral"}}></i>
            <div>Purchase</div>
            </div>
            <div className="user-certificate">
            <i className="fa-solid fa-graduation-cap" style={{color:"black"}}></i>
            <div>Certificate</div>
            </div>
            <div className="user-setting">
            <i className="fa-solid fa-gear" ></i>
            <div>setting</div>
            </div>

        </section>  
        <section className='personal-data'>
         
            <div id="user-bc" style={{backgroundColor:"dodgerblue"}}></div>
            <div className="user-photo"><i className="fa-solid fa-user" style={{color:"dodgerblue"}}></i></div>
            <div className="user-edit-btn" onClick={editHandler}><i className="fa-solid fa-pen-to-square"  style={{color:"steelblue"}}></i></div>
            <div className="user-name font">{userProfileData.firstName} {userProfileData.lastName}</div>
            <div className="user-gender-icon font"><i className="fa-solid fa-venus-mars"
            style={{color:"royalblue"}}></i></div>
            <div className="user-birthday-icon font"><i className="fa-solid fa-calendar-days"
            style={{color:"darkblue"}}></i></div>
            <div className="user-location-icon"> <i className="fa-solid fa-globe" style={{color:"lightseagreen"}}></i></div>
            <div className="user-tel-icon"><i className="fa-solid fa-phone"style={{color:"lightslategray"}}></i></div>
            <div className="user-profile-color-icon font"><i className="fa-solid fa-palette" style={{color:"darkorange"}}></i></div>
            <div className="user-profile-color font">User profile color</div>
            <div className="dodgerblue"></div>
            <div className="lightpink"></div>
            <div className="lightsteelblue"></div>
            <div className="violet"></div>
            <button className='user-profile-save-btn'style={{color:"steelblue"}}
            onClick={userDataUpdateHandler}>Save</button>

            {edit? <>
              <input className='user-gender font user-profile-input' ref={genderEl} type="text"  placeholder={userProfileData.gender || "Male / Female"}/>
              <input className="user-birthday font user-profile-input" ref={birthdayEl} type="text" placeholder={userProfileData.dateOfBirth || "Date of birth"}/>
              <input className="user-location font user-profile-input" ref={originEl} type="text" placeholder={userProfileData.origin || "Origin"}/>
              <input className="user-tel font user-profile-input" ref={telEl} type="text" placeholder={userProfileData.telephoneLandLine || "Tel"}/>
            
            </> :<>
           
            <div className="user-gender font">{userProfileData.dateOfBirth || <p className='not-entered'>not entered</p>}</div>
            <div className="user-birthday font">{userProfileData.dateOfBirth || <p className='not-entered'>not entered</p>}</div>
            <div className="user-location font">{userProfileData.countryCode  || <p className='not-entered'>not entered</p>} </div>
            <div className="user-tel font">{userProfileData.telephoneLandLine || <p className='not-entered'>not entered</p>}</div> </>}
          
        </section>
        {isLoading || profileLoading ? <div className='profile-loading'>loading...</div>:""}
        {error || isError? <div className='profile-error'>Sorry.. something went wrong,please try again</div>:""}
    </div>
  )
}

export default UserProfile