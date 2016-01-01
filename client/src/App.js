import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import axios from "axios";
import { IntlProvider } from "react-intl";
import { LOCALES } from "./util/lang/locales";

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
import Certificates from "./components/UserProfile/Certificates";
import LearningDesk from "./components/LearningDesk/LearningDesk";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import { messages } from "./util/lang/messages";

import Jura from "./Fonts/Jura-Medium.ttf";
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [learningDeskId, setLearningDeskId] = useState(null);
  const [userProfileData, setUserProfileData] = useState({});
  const [userPurchases, setUserPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [headerAlarm, setHeaderAlarm] = useState(false);
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [userDateOfBirth, setUserDateOfBirth] = useState("");
  const [lang, setLang] = useState(LOCALES.ENGLISH);

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
    setIsAdmin(false);
    setUserName("");
    setLang(LOCALES.ENGLISH);
  };

  useEffect(() => {
    if (localStorage.getItem("lang")) {
      setLang(localStorage.getItem("lang"));
    } else {
      setLang(LOCALES.ENGLISH);
    }
  }, []);
  useEffect(() => {
    if (isAuth) {
      async function getUserDetalis() {
        try {
          setError(false);
          setIsLoading(true);
          const userDetails = await axios.get(
            `http://localhost:4000/user/${localStorage.getItem("userId")}`
          );
          setUserProfileData(userDetails.data);
          setUserPurchases(userDetails.data.myPurchases);
          console.log("user data", userDetails.data);
          if (userDetails.data && userDetails.data.accessRights.includes(5)) {
            setIsAdmin(true);
          }
          setLearningDeskId(userDetails.data.myLearningDesk._id);
          setIsLoading(false);
          localStorage.setItem("color", userDetails.data.profileColour);
          localStorage.setItem("imgId", userDetails.data.userImage || "");
          if (userDetails.data.userName) {
            setUserName(userDetails.data.userName);
          }
          if (userDetails.data.dateOfBirth) {
            setUserDateOfBirth(userDetails.data.dateOfBirth.slice(0, 10));
          } else {
            return;
          }
          if (userDetails.data.gender) {
            setGender(userDetails.data.gender);
          } else {
            return;
          }
        } catch (error) {
          setIsLoading(false);
          setError(true);
          return;
        }
      }
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
    <IntlProvider messages={messages[lang]} locale={lang}>
      <ThemeProvider theme={theme}>
        <MyContext.Provider
          value={{
            selectedCourse,
            setSelectedCourse,
            learningDeskId,
            setLearningDeskId,
            userProfileData,
            lang,
            setLang,
          }}
        >
          <CssBaseline />
          <Router>
            <Header
              isAuth={isAuth}
              logout={logout}
              userName={userName}
              setUserName={setUserName}
              isAdmin={isAdmin}
              setHeaderAlarm={setHeaderAlarm}
            />

            <Routes>
              <Route path={"/"} element={<Home headerAlarm={headerAlarm} />} />
              <Route
                path={"/login"}
                element={
                  <Login
                    handelSuccessfullLogin={handelSuccessfullLogin}
                    isAuth={isAuth}
                    isAdmin={isAdmin}
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
              <Route path={"/adminpanel"} element={<AdminPanel />} />
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
                    setUserDateOfBirth={setUserDateOfBirth}
                    gender={gender}
                    setGender={setGender}
                    setUserName={setUserName}
                  />
                }
              />
              <Route
                path={"/certificates"}
                element={
                  <Certificates
                    userProfileData={userProfileData}
                    userPurchases={userPurchases}
                  />
                }
              />
            </Routes>
          </Router>
        </MyContext.Provider>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
