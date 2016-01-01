import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {Image} from "cloudinary-react"
import axios from "axios";
import Purchases from "./Purchases";
import "./UserProfile.css";


function UserProfile({
  userProfileData,
  isLoading,
  setError,
  error,
  userDateOfBirth,
  setUserDateOfBirth,
  setUserName,
  gender,
  setGender
}) {
  const [userPurchases,setUserPurchases]=useState([])
  const [myProfile,setMyProfile]=useState(true)
  const [purchase,setPurchase]=useState(false)
  const [edit, setEdit] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [newUpdatedData,setNewUpdatedData] = useState({})
  const [isError, setIsError] = useState(false);
  const [proColor, setProColor] = useState("");
  const [image,setImage]=useState(null)
  const [imageData,setImageData]=useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [shakeBtn,setShakeBtn] = useState(false)
  const navigate = useNavigate()


  useEffect(()=>{

    setUserPurchases(userProfileData.myPurchases)  
  },[userProfileData])


// Profile section functions

  function myProfileHandler (){
    setMyProfile(true)
    setPurchase(false)
    
    
  }
  
function purchaseHandler(){
  setMyProfile(false)
  setPurchase(true)
  
}


//Image functions 

function setImageHandler(e){
  e.preventDefault()
  setImage(e.target.files[0] || null)
 setShakeBtn(true)
 
}

 async function uploadImage (){
 
    
    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset","eduart")
   
    try{

   const res = await axios.post("https://api.cloudinary.com/v1_1/dqukw0qgs/upload",formData)
   const data = await res.data.public_id 
      

   setImageData( data )
        
     
    }catch(error){
      console.log("error",error)
    }
  }
  console.log("imageData",imageData)
  
  useEffect(()=>{
    if(image !== null){
      uploadImage()
    }
  },[image])

     async function uploadUserImage (){
           
       localStorage.setItem("imgId",imageData || userProfileData.userImage)
       setShakeBtn(false)
          
      const userUploadImage = {
        userImage:imageData
      }
     
      try{
       const sendNewImage =   await axios.patch(
          `http://localhost:4000/user/updateimage/${localStorage.getItem("userId")}`,
          userUploadImage
        );
        console.log("sendNewImage",sendNewImage)
      
        setImageData("")
        
      }catch(error){
        console.log("error",error)
      }
    
  
  }
  console.log("isError",isError)
  
 
    
    //Edit function

  function editHandler() {
    document
      .querySelector(".user-edit-btn")
      .removeAttribute("id", "edit-btn-id");
    setEdit(!edit);
  }

  
  useEffect(() => {
    if(edit) document.querySelector("#user").focus();
   
  });

  // set user color functions

  const userProfileColor = localStorage.getItem("color");
  useEffect(() => {
    document.querySelector(".gender-icon ").style.color = userProfileColor;
    const navEl =  document.querySelectorAll(".user-pro-color")
    navEl.forEach(el=> {
    
    el.addEventListener("mouseenter",()=>{el.style.color=userProfileColor})
    el.addEventListener("mouseleave",()=>{el.style.color="#8b8b8b"})
  
  })
  }, [userProfileColor]);

  useEffect(() => {
    setProColor(localStorage.getItem("color"));
  }, []);

  function proStyleHandler(e) {
    if (edit && localStorage.getItem("color")) {
      localStorage.setItem("color", e.target.id);
      setProColor(localStorage.getItem("color"));
    } else {
      document
        .querySelector(".user-edit-btn")
        .setAttribute("id", "edit-btn-id");
    }
  }

  // show password function
  function passwordHandler() {
    if (passwordEl.current.value) setShowPassword(!showPassword);
  }

  // button notice  function 
  function noticeHandler() {
    if (!edit) {
      document
        .querySelector(".user-edit-btn")
        .setAttribute("id", "edit-btn-id");
    }
  }

  // color user inputs variables

  const proStyle = { color: proColor };
  const proBStyle = { backgroundColor: proColor };
  const userNameEl= useRef(null)
  const genderEl = useRef(null);
  const dateOfBirthEl = useRef(null);
  const originEl = useRef(null);
  const telEl = useRef(null);
  const passwordEl = useRef(null)

  
  // user data update function

  async function userDataUpdateHandler(e) {
    if (edit) {
      e.preventDefault();
      setError(false);
      setIsError(false);

      const updatedUserData = {
        userName:userNameEl.current.value || userProfileData.userName,
        gender: genderEl.current.value || userProfileData.gender,
        dateOfBirth: dateOfBirthEl.current.value || userProfileData.dateOfBirth,
        origin: originEl.current.value || userProfileData.origin,
        telephoneLandLine:
          telEl.current.value || userProfileData.telephoneLandLine,
        profileColour:
          localStorage.getItem("color") || userProfileData.profileColour,
              password:passwordEl.current.value  || userProfileData.password
                
      };

      try {
        setProfileLoading(true);
      const newUserData =  await axios.patch(
          `http://localhost:4000/user/${localStorage.getItem("userId")}`,
          updatedUserData
        );
        setNewUpdatedData(newUserData.data)
        if(newUserData.data.dateOfBirth){
          setUserDateOfBirth((newUserData.data.dateOfBirth).slice(0,10))
        }
        if(newUserData.data.userName){
          setUserName(newUserData.data.userName)
        }
        if(newUserData.data.gender){
          setGender(newUserData.data.gender)
        }
        setProfileLoading(false);
          setEdit(false)
      } catch (error) {
        console.log("Error",error)
        setProfileLoading(false);
        setIsError(true);
      }
    }
  }
console.log("newUpdatedData",newUpdatedData)
  console.log(error)
console.log("gender",gender)
  return (
    <div
      className={
        isLoading || profileLoading ? "user-profile-opacity" : "user-profile"
      }
    >
      <section className="options-list">
        <div className="user-my-profile user-pro-color" onClick={myProfileHandler}>
          <i className="fa-solid fa-user" style={proStyle}></i>
          <div>My profile</div>
        </div>
        <div className="user-purchase user-pro-color" onClick={purchaseHandler}>
          <i
            className="fa-solid fa-bag-shopping"
            style={{ color: "coral" }}
          ></i>
          <div>Purchases</div>
        </div>
        <div className="user-certificate user-pro-color" onClick={()=>navigate("/certificates")} >
          <i
            className="fa-solid fa-graduation-cap"
            style={{ color: "black" }}
          ></i>
          <div>Certificate</div>
        </div>
      </section>

      {myProfile?
      <section className="personal-data">
        <div id="user-bc" style={proBStyle}></div>
       
        <div className="user-photo">{image !== null?  <img className="user-upload-image" src={URL.createObjectURL(image)} alt="" /> : localStorage.getItem("imgId") ?
        <Image className="user-upload-image"
        cloudName= "dqukw0qgs"
        publicId = { localStorage.getItem("imgId") 
      }
      />
        :<i className="fa-solid fa-user" style={proStyle}></i>
      }
        </div>
        <div className="user-photo-edit-btn" >
        <i className="fa-solid fa-pen-to-square" style={proStyle}></i>
          <input className="user-photo-edit-input" type="file" onChange={setImageHandler}/>
        </div>
        <div className="user-edit-btn" onClick={editHandler}>
          <i className="fa-solid fa-pen-to-square" style={proStyle}></i>
        </div>
      
        <div className="user-gender-icon font">
          {gender === "male" ? 
            <i className="fa-solid fa-mars gender-icon" style={proStyle}></i>
             : 
              <i className="fa-solid fa-venus gender-icon" style={proStyle}></i>
              }
        </div>
        <div className="user-birthday-icon font">
          <i
            className="fa-solid fa-calendar-days"
            style={{ color: "darkblue" }}
            ></i>
        </div>
        <div className="user-location-icon">
          {" "}
          <i
            className="fa-solid fa-globe"
            style={{ color: "lightseagreen" }}
            ></i>
        </div>
        <div className="user-tel-icon">
          <i
            className="fa-solid fa-phone"
            style={{ color: "lightslategray" }}
            ></i>
        </div>
        <div className="user-password-icon">
        <i className="fa-solid fa-key" style={{ color: "royalblue" }}></i>

        </div>
        <div className="user-profile-color-icon font">
          <i
            className="fa-solid fa-palette"
            style={{ color: "darkorange" }}
            ></i>
        </div>
        <div className="user-profile-color font">User profile color</div>
        <div
          id="#f684b7"
          className="colors cherry"
          onClick={proStyleHandler}
          ></div>
        <div
          id="#66baf1"
          className="colors lightblue"
          onClick={proStyleHandler}
          ></div>
        <div
          id="#a1b6d3"
          className="colors light-steel-blue"
          onClick={proStyleHandler}
          ></div>
        <div
          id="#67c2d9"
          className="colors sea"
          onClick={proStyleHandler}
          ></div>
        <button
          className="user-profile-save-btn" id={shakeBtn? "shake-save-btn":""}
          style={proStyle}
          onClick={edit?userDataUpdateHandler : uploadUserImage}
          >
          Save
        </button>
        

        {edit ? (
          <>
           <input id="user" className="user-name font user-profile-input" ref={userNameEl} type="text" placeholder={userProfileData.userName || "User name"}/>
            <input
              className="user-gender font user-profile-input"
              ref={genderEl}
              type="text"
              placeholder={userProfileData.gender || "Male / Female"}
            />
            <input
              className="user-birthday font user-profile-input"
              ref={dateOfBirthEl}
              type="text"
              placeholder={userDateOfBirth || "yyyy-mm-dd"}
            />
            <input
              className="user-location font user-profile-input"
              ref={originEl}
              type="text"
              placeholder={userProfileData.origin || "Origin"}
            />
            <input
              className="user-tel font user-profile-input"
              ref={telEl}
              type="text"
              placeholder={userProfileData.telephoneLandLine || "Tel"}
            />
            <div className="password-container">

            <input  className="user-password-input font user-profile-input" type={showPassword ? "text" : "password"} ref={passwordEl}/>
            <div className="user-profile-show-password" onClick={passwordHandler}>
            {showPassword ? (
              <span>
                <i className="fa-solid fa-eye-slash"></i>
              </span>
            ) : (
              <span>
                <i className="fa-solid fa-eye"></i>
              </span>
            )}
          </div>
            </div>
          </>
        ) : (
          <>
          <div className="user-name font" onClick={noticeHandler}> {newUpdatedData.userName ||  userProfileData.userName}</div>
            <div className="user-gender font" onClick={noticeHandler}>
              { newUpdatedData.gender || userProfileData.gender || (
                <p className="not-entered">not entered</p>
              )}
            </div>
            <div className="user-birthday font" onClick={noticeHandler}>
              { userDateOfBirth || <p className="not-entered">not entered</p>}
            </div>
            <div className="user-location font" onClick={noticeHandler}>
              {  newUpdatedData.origin ||  userProfileData.origin || (
                <p className="not-entered">not entered</p>
              )}{" "}
            </div>
            <div className="user-tel font" onClick={noticeHandler}>
              { newUpdatedData.telephoneLandLine ||  userProfileData.telephoneLandLine || (
                <p className="not-entered">not entered</p>
              )}
            </div>{" "}
            <div className="user-password font"><p>#####</p></div>
          </>
        )}
      </section>:""}

      {purchase? <Purchases  imageData={imageData} userPurchases={userPurchases}/>:""}
      {isLoading || profileLoading ? (
        <div className="profile-loading">loading...</div>
      ) : (
        ""
      )}
   
      {error || isError ? (
        <div className="profile-error">
          Sorry.. something went wrong,please try again
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserProfile;