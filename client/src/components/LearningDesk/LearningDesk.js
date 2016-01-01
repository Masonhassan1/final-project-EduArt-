import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import TaskIcon from "@mui/icons-material/Task";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./LearningDesk.css";
import axiosConfig from "../../util/axiosConfig";
import ReactSpeedometer from "react-d3-speedometer";

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

export default function LearningDesk() {
  const contextContent = useContext(MyContext);
  const { userProfileData } = contextContent;
  const [courseArrInfo, setCourseArrInfo] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getBookedCourses = async () => {
    try {
      setLoading(true);
      const apiData = await axiosConfig.get(
        `/mylearningdesk/${userProfileData.myLearningDesk._id}`
      );
      console.log("apiData", apiData.data.coursesBooked);
      setCourseArrInfo(apiData.data.coursesBooked);

      setLoading(false);
      setHasError(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    if (userProfileData.myLearningDesk) {
      console.log("userProfile", userProfileData.myLearningDesk);
      getBookedCourses();
    }
  }, [userProfileData.myLearningDesk]);

  return (
    <section className="learning-desk-page">
      <aside className="learning-desk-aside">
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          aria-label="contacts"
        >
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="Learningdesk" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Participants" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <MailOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItemIcon>
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Timetable" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <ListItemIcon>
                <TaskIcon />
              </ListItemIcon>
              <ListItemText primary="Homework" />
            </ListItemButton>
          </ListItem>
        </List>
      </aside>
      <section className="learning-desk-main">
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
                        {course.courseId.modulesIncluded.length > 1 ? "s" : ""}
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

                                {/* <Box>
                                      <p>Teacher 1</p>
                                      <p>Teacher 2</p>
                                    </Box> */}

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
                                        <p>Teacher 1</p>
                                        <p>Teacher 2</p>
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
                                        {mod.extraMaterial.map((topic, id) => {
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
                                        })}
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
                  <div>
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
                      <p>Current module: Module 1</p>
                    </div>
                    <ReactSpeedometer
                      maxValue={40}
                      value={5}
                      needleColor="red"
                      startColor="green"
                      segments={course.courseId.modulesIncluded.length}
                      endColor="blue"
                      customSegmentLabels={course.courseId.modulesIncluded.map(
                        (mod) => {
                          return {
                            text: `${mod.name}`,
                            position: "INSIDE",
                            color: "#555",
                            fontSize: "19px",
                          };
                        }
                      )}
                      // [{
                      //   text: "module 1",
                      //   position: "INSIDE",
                      //   color: "#555",
                      //   fontSize: "19px",
                      // },
                      // {
                      //   text: "module 2",
                      //   position: "INSIDE",
                      //   color: "#555",
                      // },
                      // {
                      //   text: "module 3",
                      //   position: "INSIDE",
                      //   color: "#555",
                      // },
                    />
                  </div>
                </TabPanel>
              );
            })}
          </Box>
        ) : (
          <p className="noBookedCourses">You don't have any courses yet</p>
        )}
      </section>
    </section>
  );
}
