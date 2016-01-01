import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
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
    /* setUserDetails(null); */
  } 
 /*  const loadAndFetchUserDetails = async () => {

   
    const errorMsgEl = <p>Something went wrong</p>;
    try {
      setIsLoading(true);
      const axiosResp = await axios.post("http://localhost:4000/myAccount", {}, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem("jwt")}`
          }
        });

      setUserDetails(axiosResp.data);
      console.log("axiosResp.data:", axiosResp.data);
      setIsLoading(false);

      if(axiosResp.data.error) {
        setError( axiosResp.data.error.message );
        console.error(axiosResp.data.error)
        return errorMsgEl;
      }
      
      setError(""); 
    } catch (error) {
      setIsLoading(false);
      console.error("Error while sending with axios", error);
      setError( error.message );
      return errorMsgEl;
    }

    return 
  } 
 */
   useEffect(() => {
    if( hasClientValidToken() ) {
      setIsAuth(true);
     
    }

  }, [isAuth]); 


  return (
     <Router>
  
      <Header/>

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
