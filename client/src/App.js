import { BrowserRouter as Router, Routes, Route , useNavigate} from "react-router-dom";
import { useEffect, useState  } from 'react';
import { isExpired, decodeToken } from "react-jwt";
import axios from "axios"
import "./App.css"
import Header from './components/Header';
import Home from "./components/Home";
import CourseList from "./components/CourseList/CourseList";
import CoursePage from "./components/CoursePage/CoursePage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
 
  const [isAuth, setIsAuth] = useState(false);
  /* const [isLoading, setIsLoading] = useState(false); */
  /* const [error, setError] = useState(""); */
  /* const [userDetails, setUserDetails] = useState(null); */


  

  const handelSuccessfullLogin = (logData)=> {

    const decodedToken = decodeToken(logData.jwt);
   
    setIsAuth(true);
    localStorage.setItem("jwt", logData.jwt);
    localStorage.setItem("userId", decodedToken.userId);
    
    
  }

   const hasClientValidToken = () => {
    const jwt = localStorage.getItem("jwt");
    const isJwtExpired = isExpired(jwt);

    return jwt && !isJwtExpired ? true : false; 
  } 
  
  const logout = () => {
    localStorage.clear();
    setIsAuth(false);
   
  } 
 
   useEffect(() => {
    if( hasClientValidToken() ) {
      setIsAuth(true);
     
    }

  }, [isAuth]); 


  return (
     <Router>
  
      <Header isAuth={isAuth} logout={logout}/>

      <Routes>
      <Route path={"/"} element={<Home/>} />
      <Route path={"/login"}  element={<Login handelSuccessfullLogin={handelSuccessfullLogin}/>}  />

      <Route path="/courselist" element={<CourseList />}></Route>
          <Route path="/courselist/:courseid" element={<CoursePage isAuth={isAuth}/>} />

      <Route path={"/register"} element={<Register/>} />

      </Routes>
   
     </Router>

  );
}

export default App;
