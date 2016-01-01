import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import business from "moment-business";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactSpeedometer from "react-d3-speedometer";

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

export default function LearningDeskPage() {
  const contextContent = useContext(MyContext);

  const { userProfileData } = contextContent;

  const [courseArrInfo, setCourseArrInfo] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentModulesDate, setCurrentModulesDate] = useState([]);
  const [currentModuleName, setCurrentModuleName] = useState(null);
  const [currentLernDay, setCurrentLernDay] = useState(0);

  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      }

      setLoading(false);
      setHasError(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    if (currentCourse && currentCourse.courseId.modulesIncluded.length > 0) {
      let startDate;
      let modEndDate;
      startDate = moment(currentCourse.courseId.dateOfStart);
      currentCourse.courseId.modulesIncluded.map((mod) => {
        startDate = modEndDate ? moment(modEndDate) : startDate;
        const endDate = business.addWeekDays(startDate, mod.noOfDays - 1);
        const modStartDate = modEndDate
          ? business.addWeekDays(moment(modEndDate), 1)._d
          : startDate._i;
        modEndDate = endDate._d;
        currentModulesDate.push({
          name: mod.name,
          start: modStartDate,
          end: modEndDate,
          duration: mod.noOfDays,
        });
        setCurrentModulesDate(currentModulesDate);

        startDate = business.addWeekDays(endDate, 1);
      });
    }
  }, [currentCourse]);

  const defineCurrentLernDay = () => {
    if (currentCourse) {
      const startDate = moment(currentCourse.courseId.dateOfStart);

      const courseDuration = currentCourse.courseId.modulesIncluded
        .map((val) => val.noOfDays)
        .reduce((acc, cur) => acc + cur, 0);

      for (let i = 0; i < courseDuration; i++) {
        const temp = business.addWeekDays(moment(startDate), i)._d;
        if (new Date().toDateString() === new Date(temp).toDateString()) {
          setCurrentLernDay(i);
          break;
        }
      }
    }
  };

  useEffect(() => {
    setCurrentModuleName(null);
    setCurrentLernDay(0);
    if (currentCourse) {
      const today = new Date();
      if (today < new Date(currentModulesDate[0].start)) {
        setCurrentModuleName("your course hasn't started yet");
      } else if (
        today > new Date(currentModulesDate[currentModulesDate.length - 1].end)
      ) {
        setCurrentModuleName("your course has already finished");
      } else {
        const modName = currentModulesDate.find(
          (mod) => today >= new Date(mod.start) && today <= new Date(mod.end)
        );

        if (modName) {
          setCurrentModuleName(modName.name);
        }
      }
      defineCurrentLernDay();
    }
  }, [currentCourse]);

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
          <h3 className="learning-desk-main__title">My courses</h3>

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
                          setCurrentModulesDate([]);
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
                    <section className="modulesWrapper">
                      <div className="modulesHeader">
                        <p className="modulesHeaderTitle">Course modules</p>
                        <p className="modulesChapters">
                          {course.courseId.modulesIncluded.length} Chapter
                          {course.courseId.modulesIncluded.length > 1
                            ? "s"
                            : ""}
                        </p>
                      </div>
                      {course.courseId.modulesIncluded.length > 0
                        ? course.courseId.modulesIncluded.map((mod, index) => {
                            return (
                              <Box key={index} className="moduleWrapper">
                                <Accordion>
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                  >
                                    <div>
                                      {" "}
                                      <p>Name: {mod.name}</p>
                                      <p>Duration: {mod.noOfDays} days</p>
                                      <p>
                                        <a
                                          href={mod.zoomLink}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          Zoom Link
                                        </a>
                                      </p>
                                    </div>
                                  </AccordionSummary>

                                  <AccordionDetails>
                                    <Accordion>
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                      >
                                        <Typography>Teachers</Typography>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <Box>
                                          {mod.teacher.map((person, id) => (
                                            <p key={id}>
                                              {`${person.firstName} ${person.lastName}`}
                                            </p>
                                          ))}
                                        </Box>
                                      </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                      >
                                        <Typography>Tasks</Typography>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <Box>
                                          {mod.tasks.map((task, id) => {
                                            return (
                                              <p key={id}>
                                                <a
                                                  href={task.taskLink}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                >
                                                  {task.taskName}
                                                </a>
                                              </p>
                                            );
                                          })}
                                        </Box>
                                      </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3a-content"
                                        id="panel3a-header"
                                      >
                                        <Typography>Extra materials</Typography>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <Box>
                                          {mod.extraMaterial.map(
                                            (topic, id) => {
                                              return (
                                                <p key={id}>
                                                  <a
                                                    href={topic.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                  >
                                                    {topic.description}
                                                  </a>
                                                </p>
                                              );
                                            }
                                          )}
                                        </Box>
                                      </AccordionDetails>
                                    </Accordion>
                                  </AccordionDetails>
                                </Accordion>
                              </Box>
                            );
                          })
                        : ""}
                    </section>
                    <section className="courseDetails">
                      <div>
                        <p>
                          Course Start Date:{" "}
                          {course.courseId.dateOfStart
                            .substring(0, 10)
                            .split("-")
                            .reverse()
                            .join(".")}
                        </p>
                        <p>
                          Today is{" "}
                          {new Date()
                            .toJSON()
                            .substring(0, 10)
                            .split("-")
                            .reverse()
                            .join(".")}
                        </p>
                        <p>Current module: {currentModuleName}</p>
                      </div>
                      {course.courseId.modulesIncluded.length > 0 ? (
                        <ReactSpeedometer
                          width={400}
                          ringWith={40}
                          paddingHorizontal={17}
                          paddingVertical={17}
                          needleTransitionDuration={3333}
                          needleTransition="easeElastic"
                          maxValue={course.courseId.modulesIncluded
                            .map((val) => val.noOfDays)
                            .reduce((acc, cur) => acc + cur, 0)}
                          value={currentLernDay}
                          needleColor="red"
                          startColor="#9399ff"
                          endColor="#00bbf0"
                          // segments={course.courseId.modulesIncluded.length}
                          currentValueText={`${currentLernDay} day${
                            currentLernDay > 1 ? "s" : ""
                          } of ${course.courseId.modulesIncluded
                            .map((val) => val.noOfDays)
                            .reduce((acc, cur) => acc + cur, 0)}`}
                          customSegmentStops={course.courseId.modulesIncluded
                            .map((mod, id) => {
                              const newArr =
                                course.courseId.modulesIncluded.slice(
                                  0,
                                  id + 1
                                );
                              const newVal = newArr
                                .map((val) => val.noOfDays)
                                .reduce((acc, cur) => acc + cur, 0);

                              return id === 0 ? [0, newVal] : newVal;
                            })
                            .flat(1)}
                          customSegmentLabels={course.courseId.modulesIncluded.map(
                            (mod) => {
                              return {
                                text: `${mod.name}`,
                                position: "OUTSIDE",
                                // color: "#5382a1",
                                fontSize: "14px",
                              };
                            }
                          )}
                        />
                      ) : (
                        ""
                      )}
                    </section>
                  </TabPanel>
                );
              })}
            </Box>
          ) : (
            <p className="noBookedCourses">You don't have any courses yet</p>
          )}
        </div>
      )}
    </section>
  );
}
