import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./LearningDesk.css";
import axiosConfig from "../../util/axiosConfig";

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

/* TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}; */

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function LearningDesk(/* { learningDeskId } */) {
  const contextContent = useContext(MyContext);
  const { userProfileData } = contextContent;
  const [courseArrInfo, setCourseArrInfo] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getInfo = async (/* url, courseid */) => {
    try {
      setLoading(true);
      const apiData = await axiosConfig.get(
        /* `${url}/${courseid}` */ `/mylearningdesk/${userProfileData.myLearningDesk._id}`
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
      getInfo();
      /*  "/courses",
        userProfileData.myLearningDesk.coursesBooked[0].courseId */
    }
  }, [userProfileData.myLearningDesk]);

  return (
    <section className="myCourses">
      <h3>My courses</h3>

      {courseArrInfo.length && (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
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
              {/*    <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} /> */}
            </Tabs>
          </Box>
          {courseArrInfo.map((course, id) => {
            return (
              <TabPanel value={value} index={id} key={id}>
                {course.courseId.courseName}
              </TabPanel>
            );
          })}

          {/* <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel> */}
        </Box>
      )}
    </section>
  );
}
