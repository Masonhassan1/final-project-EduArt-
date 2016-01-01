import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";
import { useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import CourseList from "./components/CourseList/CourseList";
import CoursePage from "./components/CoursePage/CoursePage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserProfile from "./components/UserProfile/UserProfile";
import axios from "axios";

export const MyContext = React.createContext(null);

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [userProfileData,setUserProfileData] = useState({})
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(false); 
  const [gender,setGender]= useState("")
  const [userDateOfBirth,setUserDateOfBirth] = useState("")
     

  const handelSuccessfullLogin = (logData) => {
    const decodedToken = decodeToken(logData.jwt);

    setIsAuth(true);
    localStorage.setItem("jwt", logData.jwt);
    localStorage.setItem("userId", decodedToken.userId);
  };

  const  hasClientValidToken  =  ( )  =>  {
    const jwt = localStorage.getItem("jwt");
    const isJwtExpired = isExpired(jwt);

    return jwt && !isJwtExpired ? true : false;
  };

  const logout = () => {
    localStorage.clear();
    setIsAuth ( false ) ;
   
    
  };

 

    async function getUserDetalis(){
            try{
                setError(false)
                setIsLoading(true)
              const userDetails = await axios.get(`http://localhost:4000/user/${localStorage.getItem("userId")}`)
              setUserProfileData(userDetails.data)
              setIsLoading(false)
                localStorage.setItem("color",userDetails.data.profileColour)
                setUserDateOfBirth((userDetails.data.dateOfBirth).slice(0,10))
                setGender(userDetails.data.gender)
            }catch (error) {
              setIsLoading(false); 
              setError( true);
              return 
            }
    }
  useEffect(()=>{
    if(isAuth){
      getUserDetalis()
    }
  },[isAuth])

  console.log(userProfileData)
  

  useEffect(() => {
    if (hasClientValidToken()) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <MyContext.Provider value={{ selectedCourse, setSelectedCourse }}>
      <Router>
        <Header
          isAuth={isAuth}
          logout={logout} 
   
        />

        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route
            path={"/login"}
            element={
              <Login
                handelSuccessfullLogin={handelSuccessfullLogin}
                isAuth={isAuth}
                courseId={selectedCourse}
              />
            }
          />

          <Route path="/courselist" element={<CourseList />}></Route>
          <Route
            path="/courselist/:courseid"
            element={<CoursePage isAuth={isAuth} />}
          />

         <Route path={"/register"} element={<Register />} />
          <Route path={"/userprofile"} element={<UserProfile userProfileData={userProfileData} isAuth={isAuth} isLoading={isLoading} error={error} setError={setError} userDateOfBirth={userDateOfBirth} gender={gender}/>} />
        </Routes>
      </Router>
    </MyContext.Provider>
  );
}

export default App;