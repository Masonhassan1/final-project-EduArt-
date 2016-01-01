import React, { useContext, useEffect, useState } from "react";

import { FormattedMessage, useIntl } from "react-intl";
import { Image } from "cloudinary-react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { MyContext } from "../../../App";
import axiosConfig from "../../../util/axiosConfig";

import "../LearningDesk.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MyClassPage() {
  const contextContent = useContext(MyContext);

  const { userProfileData } = contextContent;

  const [courseArrInfo, setCourseArrInfo] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [myClassmates, setMyClassmates] = useState([]);

  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = React.useState(0);

  const intl = useIntl();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getMyClass = async (currentCourse) => {
    try {
      setLoading(true);
      const apiData = await axiosConfig.get(`/user`);
      const users = apiData.data;
      console.log("users", users);
      console.log("currentCourse", currentCourse.courseId._id);
      if (users.length > 0) {
        const myClassmates = users.filter((user) =>
          user.myLearningDesk.coursesBooked
            .map((course) => course.courseId)
            .includes(currentCourse.courseId._id)
        );
        console.log("myClassmates", myClassmates);
        setMyClassmates(myClassmates);
      }

      setLoading(false);
      setHasError(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };

  const getBookedCourses = async () => {
    try {
      setLoading(true);
      const apiData = await axiosConfig.get(
        `/mylearningdesk/${userProfileData.myLearningDesk._id}`
      );
      const courseArr = apiData.data.coursesBooked;

      setCourseArrInfo(courseArr);
      if (courseArr.length > 0) {
        setCurrentCourse(courseArr[0]);
        await getMyClass(courseArr[0]);
      }

      setLoading(false);
      setHasError(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    if (userProfileData.myLearningDesk) {
      getBookedCourses();
    }
  }, [userProfileData.myLearningDesk]);

  return (
    <section className="learning-desk-main">
      {loading ? (
        <div id="load" data-testid="loading">
          <div>G</div>
          <div>N</div>
          <div>I</div>
          <div>D</div>
          <div>A</div>
          <div>O</div>
          <div>L</div>
        </div>
      ) : hasError ? (
        <div className="error-message"></div>
      ) : (
        <div>
          <h3 className="learning-desk-main__title">
            <FormattedMessage id="my_courses" defaultMessage="My courses" />
          </h3>

          {courseArrInfo.length > 0 ? (
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  {courseArrInfo.map((course, id) => {
                    return (
                      <Tab
                        onClick={() => {
                          setCurrentCourse(course);
                          getMyClass(course);
                        }}
                        label={course.courseId.courseName}
                        {...a11yProps(id)}
                        key={id}
                      />
                    );
                  })}
                </Tabs>
              </Box>
              {courseArrInfo.map((course, id) => {
                return (
                  <TabPanel
                    className="courseTab"
                    value={value}
                    index={id}
                    key={id}
                  >
                    <section
                      /*  className="modulesWrapper" */
                      style={{ padding: "1rem", alignItems: "flex-start" }}
                    >
                      {myClassmates.map((person, index) => {
                        return (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              width: "300px",
                              border: "1px solid #DEEFF4",
                              justifyContent: "space-around",
                              padding: "1rem",
                              borderRadius: "10px",
                              marginBottom: "1rem",
                              backgroundColor: "#ffffff",
                              color: "#3e80c1",
                            }}
                          >
                            {" "}
                            {person.userImage ? (
                              <Image
                                className="classmate-avatar"
                                cloudName="dqukw0qgs"
                                publicId={person.userImage}
                              />
                            ) : (
                              <i
                                className="fa-solid fa-user classmate-avatar"
                                style={{
                                  fontSize: "46px",
                                  textAlign: "center",
                                  color: "#3e9db9",
                                }}
                              ></i>
                            )}
                            <p>{person.firstName}</p>
                            <p>{person.lastName}</p>
                          </div>
                        );
                      })}
                    </section>
                  </TabPanel>
                );
              })}
            </Box>
          ) : (
            <p className="noBookedCourses">
              <FormattedMessage
                id="you_dont_have_any_courses_yet"
                defaultMessage="You don't have any courses yet."
              />
            </p>
          )}
        </div>
      )}
    </section>
  );
}
