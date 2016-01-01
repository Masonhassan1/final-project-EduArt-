import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import axios from "axios";
import Jura from "./Fonts/Jura-Medium.ttf";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Header from "./components/Header";
import Home from "./components/Home";
import CourseList from "./components/CourseList/CourseList";
import CoursePage from "./components/CoursePage/CoursePage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AboutUs from "./components/AboutUs/AboutUs";
import UserProfile from "./components/UserProfile/UserProfile";

import LearningDesk from "./components/LearningDesk/LearningDesk";

import "./App.css";

const theme = createTheme({
  typography: {
    fontFamily: "Jura",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Jura';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: local('Jura'), local('Jura-Medium'), url(${Jura}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

export const MyContext = React.createContext(null);

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [learningDeskId, setLearningDeskId] = useState(null);
  const [userProfileData, setUserProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [gender, setGender] = useState("");
  const [userDateOfBirth, setUserDateOfBirth] = useState("");

  const handelSuccessfullLogin = (logData) => {
    const decodedToken = decodeToken(logData.jwt);
    const myLearningDeskId = decodedToken.learningDesk;
    if (myLearningDeskId) {
      setLearningDeskId(myLearningDeskId);
    }

    setIsAuth(true);
    localStorage.setItem("jwt", logData.jwt);
    localStorage.setItem("userId", decodedToken.userId);
  };

  const hasClientValidToken = () => {
    const jwt = localStorage.getItem("jwt");
    const isJwtExpired = isExpired(jwt);

    return jwt && !isJwtExpired ? true : false;
  };

  const logout = () => {
    localStorage.clear();
    setIsAuth(false);
  };

  async function getUserDetalis() {
    try {
      setError(false);
      setIsLoading(true);
      const userDetails = await axios.get(
        `http://localhost:4000/user/${localStorage.getItem("userId")}`
      );
      setUserProfileData(userDetails.data);
      setLearningDeskId(userDetails.data.myLearningDesk._id);
      setIsLoading(false);
      localStorage.setItem("color", userDetails.data.profileColour);
      setUserDateOfBirth(userDetails.data.dateOfBirth.slice(0, 10));
      setGender(userDetails.data.gender);
    } catch (error) {
      setIsLoading(false);
      setError(true);
      return;
    }
  }
  useEffect(() => {
    if (isAuth) {
      getUserDetalis();
    }
  }, [isAuth]);

  console.log(userProfileData);

  useEffect(() => {
    if (hasClientValidToken()) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <ThemeProvider theme={theme}>
      <MyContext.Provider
        value={{
          selectedCourse,
          setSelectedCourse,
          learningDeskId,
          setLearningDeskId,
          userProfileData,
        }}
      >
        <CssBaseline />
        <Router>
          <Header isAuth={isAuth} logout={logout} />

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
            <Route
              path="/mylearningdesk"
              element={<LearningDesk learningDeskId={learningDeskId} />}
            />

            <Route path={"/about"} element={<AboutUs />} />

            <Route path={"/register"} element={<Register />} />
            <Route
              path={"/userprofile"}
              element={
                <UserProfile
                  userProfileData={userProfileData}
                  isAuth={isAuth}
                  isLoading={isLoading}
                  error={error}
                  setError={setError}
                  userDateOfBirth={userDateOfBirth}
                  gender={gender}
                />
              }
            />
          </Routes>
        </Router>
      </MyContext.Provider>
    </ThemeProvider>
  );
}

export default App;
