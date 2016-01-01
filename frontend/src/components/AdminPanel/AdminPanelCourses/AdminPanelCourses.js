import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TranslateIcon from "@mui/icons-material/Translate";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import EuroIcon from "@mui/icons-material/Euro";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import AdminCoursesSearch from "./AdminCoursesSearch/AdminCoursesSearch";
import axiosConfig from "../../../util/axiosConfig";
import baseURL from "../../../util/constants";

import "./AdminPanelCourses.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AdminPanelCourses() {
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([
    /*   { _id: "1232", name: "erwer" },
    { _id: "45654", name: "dkflsdöfksödf" }, */
  ]);
  const languages = ["English", "German"];
  const types = ["fulltime", "parttime"];

  const [courseName, setCourseName] = useState("");
  const [courseType, setCourseType] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseStartDate, setCourseStartDate] = useState("");
  const [courseLanguage, setCourseLanguage] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [courseIcon, setCourseIcon] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [courseModules, setCourseModules] = useState([]);

  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateCourseMode, setUpdateCourseMode] = useState(false);
  const [selectedModules, setSelectedModules] = React.useState([]);
  const [coursesSearchResult, setCoursesSearchResult] = useState([]);
  const [coursesName, setCoursesName] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedModules(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    const idModules = value.map((item) => {
      const temp = modules.find((mod) => mod.name === item);
      return temp._id;
    });
    setCourseModules(idModules);
  };

  const getCoursesSearchResult = async (url) => {
    try {
      setLoading(true);
      const apiData = await axiosConfig.get(url);
      setCoursesSearchResult([...apiData.data]);
      setLoading(false);
      setHasError(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };

  const resetCreateCourseForm = () => {
    setCourseName("");
    setCourseStartDate("");
    setCourseType("");
    setCourseDescription("");
    setCourseLanguage("");
    setCoursePrice(0);
    setCourseIcon("");
    setCourseImage("");
    setCourseModules([]);
    setSelectedModules([]);
  };

  const getCourses = async (url) => {
    try {
      setLoading(true);
      const apiData = await axiosConfig.get(url);
      setCourses([...apiData.data]);
      setCoursesName(apiData.data.map((course) => course.courseName));
      setCoursesSearchResult([...apiData.data]);

      setLoading(false);
      setHasError(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };

  const getModules = async (url) => {
    try {
      setLoading(true);
      const apiData = await axiosConfig.get(url);
      setModules([...apiData.data]);
      setLoading(false);
      setHasError(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };

  async function uploadImage(image) {
    const jwt = localStorage.getItem("jwt");
    const formData = new FormData();
    formData.append("image", image);
    // formData.append("title", "photo title");
    try {
      await axiosConfig.post("/images", formData, {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const createCourse = async (event) => {
    event.preventDefault();
    const jwt = localStorage.getItem("jwt");
    const newCourseImage = event.target.elements.courseImage.files[0];
    await uploadImage(newCourseImage);
    const newCourseIcon = event.target.elements.courseIcon.files[0];
    await uploadImage(newCourseIcon);

    setCourseImage(`/images/${newCourseImage.name}`);
    setCourseIcon(`/images/${newCourseIcon.name}`);

    try {
      setLoading(true);
      const tempArr = courseModules.map((modId) => {
        return modules.find((mod) => mod._id === modId);
      });
      const duration = tempArr
        .map((mod) => mod.noOfDays)
        .reduce((acc, cur) => acc + cur, 0);

      const response = await axiosConfig.post(
        `/courses`,
        {
          courseName: courseName,
          courseDuration: duration,
          dateOfStart: courseStartDate,
          courseInShort: courseName
            .substring(0, 10)
            .split(" ")
            .join("")
            .concat("-", courseStartDate),
          courseImage: `/images/${newCourseImage.name}`,
          courseDescription: courseDescription,
          courseActive: true,
          courseIcon: `/images/${newCourseIcon.name}`,
          courseType: courseType,
          coursePrice: coursePrice,
          language: courseLanguage,
          modulesIncluded: courseModules,
        },
        {
          headers: {
            authorization: `Bearer ${jwt}`,
          },
        }
      );

      resetCreateCourseForm();
      event.target.reset();
      setShowMessage(true);
      setMessageText(
        <FormattedMessage
          id="the_course_was_successfully_created"
          defaultMessage="The course was successfully created."
        />
      );
      getCourses(`/courses`);

      setLoading(false);
      setHasError(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    getCourses(`/courses`);
    getModules("/modules");
  }, []);

  return (
    <div>
      <h3 className="modulesPageTitle">
        <FormattedMessage id="courses" defaultMessage="Courses" />
      </h3>
      <div className="adminPanelModulesWrapper">
        <Box className="moduleWrapper newModuleWrapper" sx={{ p: "1rem" }}>
          <form onSubmit={createCourse}>
            <div>
              <Box sx={{ m: "1rem" }}>
                <TextField
                  id="standard-basic"
                  label={
                    <FormattedMessage
                      id="admin_course_name"
                      defaultMessage="Course name"
                    />
                  }
                  fullWidth
                  required
                  variant="standard"
                  value={courseName}
                  onChange={(event) => setCourseName(event.target.value)}
                  sx={{ /* width: "95%", */ mx: "auto" }}
                />
              </Box>
              <Box sx={{ m: "1rem" }}>
                <TextField
                  id="standard-select-currency"
                  select
                  label={<FormattedMessage id="type" defaultMessage="Type" />}
                  sx={{ width: "45%" }}
                  value={courseType}
                  onChange={(event) => setCourseType(event.target.value)}
                  helperText={
                    <FormattedMessage
                      id="please_select_the_course_type"
                      defaultMessage="Please select the course type"
                    />
                  }
                  variant="standard"
                >
                  {types.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box sx={{ m: "1rem" }}>
                <TextField
                  id="outlined-multiline-static"
                  label={
                    <FormattedMessage
                      id="description"
                      defaultMessage="Description"
                    />
                  }
                  fullWidth
                  multiline
                  rows={4}
                  value={courseDescription}
                  onChange={(event) => setCourseDescription(event.target.value)}
                />
              </Box>
              <Box
                sx={{
                  m: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TextField
                  required
                  id="standard-basic"
                  type="date"
                  // label="Start date"
                  variant="standard"
                  sx={{ width: "45%" }}
                  helperText={
                    <FormattedMessage
                      id="please_select_the_start_date"
                      defaultMessage="Please select the start date of the course"
                    />
                  }
                  value={courseStartDate}
                  onChange={(event) => setCourseStartDate(event.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label={
                    <FormattedMessage
                      id="course_duration"
                      defaultMessage="Duration"
                    />
                  }
                  type="number"
                  variant="standard"
                  value={0}
                  disabled
                  // onChange={(event) => setCourseName(event.target.value)}
                  helperText={
                    <FormattedMessage
                      id="this_value_is_calculated"
                      defaultMessage="This value is calculated based on the modules data."
                    />
                  }
                  sx={{ width: "45%" }}
                />
              </Box>

              <Box
                sx={{
                  m: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TextField
                  id="standard-select-currency"
                  select
                  label={
                    <FormattedMessage
                      id="course_language"
                      defaultMessage="Language"
                    />
                  }
                  sx={{ width: "45%" }}
                  value={courseLanguage}
                  onChange={(event) => setCourseLanguage(event.target.value)}
                  helperText={
                    <FormattedMessage
                      id="please_select_the_course_language"
                      defaultMessage="Please select the course language"
                    />
                  }
                  variant="standard"
                >
                  {languages.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="standard-basic"
                  label={
                    <FormattedMessage id="price" defaultMessage="Price, EUR" />
                  }
                  type="number"
                  variant="standard"
                  value={coursePrice}
                  onChange={(event) => setCoursePrice(event.target.value)}
                  helperText={
                    <FormattedMessage
                      id="please_type_the_price_for_the_course"
                      defaultMessage="Please type the price for the course"
                    />
                  }
                  sx={{ width: "45%" }}
                />
              </Box>
              <Box
                sx={{
                  m: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TextField
                  id="standard-basic"
                  type="file"
                  label={
                    <FormattedMessage
                      id="course_icon"
                      defaultMessage="Course icon"
                    />
                  }
                  sx={{ width: "45%" }}
                  name="courseIcon"
                  //value={courseIcon}
                  //onChange={(event) => setCourseIcon(event.target.value)}
                  helperText={
                    <FormattedMessage
                      id="please_select_the_course_icon"
                      defaultMessage="Please select the course icon"
                    />
                  }
                  variant="standard"
                ></TextField>
                <TextField
                  id="standard-basic"
                  type="file"
                  variant="standard"
                  name="courseImage"
                  //value={courseImage}
                  //onChange={(event) => handleCourseImage(event.target.value)}
                  helperText={
                    <FormattedMessage
                      id="please_select_the_course_image"
                      defaultMessage="Please select the course image"
                    />
                  }
                  sx={{ width: "45%" }}
                />
              </Box>
              <Box sx={{ m: "1rem" }}>
                <div>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">
                      <FormattedMessage id="modules" defaultMessage="Modules" />
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={selectedModules}
                      onChange={handleChange}
                      input={
                        <OutlinedInput
                          label={
                            <FormattedMessage
                              id="modules"
                              defaultMessage="Modules"
                            />
                          }
                        />
                      }
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {modules.map((mod) => (
                        <MenuItem key={mod._id} value={mod.name}>
                          <Checkbox
                            checked={selectedModules.indexOf(mod.name) > -1}
                          />
                          <ListItemText primary={mod.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </Box>
            </div>
            {updateCourseMode ? (
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  variant="contained"
                  // onClick={updateModuleRequest}
                  sx={{ display: "block", my: "1rem" }}
                >
                  <FormattedMessage
                    id="update_course"
                    defaultMessage="Update course"
                  />
                </Button>
                <Button
                  variant="outlined"
                  // onClick={cancelUpdateModuleRequest}
                  sx={{ display: "block", my: "1rem" }}
                >
                  <FormattedMessage id="cancel" defaultMessage="Cancel" />
                </Button>
              </div>
            ) : (
              <Button
                variant="contained"
                type="submit"
                // onClick={createCourse}
                sx={{ display: "block", mx: "auto", my: "1rem" }}
              >
                <FormattedMessage
                  id="create_new_course"
                  defaultMessage="Create new course"
                />
              </Button>
            )}
          </form>
        </Box>
        <section className="adminModulesSearchSection">
          <AdminCoursesSearch
            coursesName={coursesName}
            getCoursesSearchResult={getCoursesSearchResult}
          />

          <div className="modulesWrapper">
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
            ) : !coursesSearchResult.length ? (
              <div className="no-results">
                <p>
                  <FormattedMessage
                    id="no_results_found"
                    defaultMessage="No results found"
                  />
                </p>
              </div>
            ) : (
              coursesSearchResult.map((course) => {
                return (
                  <Box
                    className="moduleWrapper adminCardWrapper"
                    key={course._id}
                    sx={{
                      backgroundImage: `linear-gradient(to bottom, rgb(0 0 0 / 81%), rgb(0 25 116 / 76%)),url(${baseURL}/${course.courseImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <Button
                      // onClick={() => updateModule(mod)}
                      sx={{
                        position: "absolute",
                        top: "14px",
                        right: "25px",
                        width: "1rem",
                        height: "1rem",
                        zIndex: "10",
                      }}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      // onClick={() => {
                      //   setShowDeleteModal(true);
                      //   setCurrentDelModule(mod);
                      // }}
                      sx={{
                        position: "absolute",
                        top: "14px",
                        right: "-4px",
                        width: "1rem",
                        height: "1rem",
                        zIndex: "10",
                      }}
                    >
                      <DeleteForeverIcon />
                    </Button>
                    <div className="cardHeader">
                      <img
                        className="cardCoursePicture"
                        src={`${baseURL}/${course.courseIcon}`}
                        alt={course.courseName}
                      />
                      <div>
                        <p
                          className="cardCourseName"
                          style={{ color: "white" }}
                        >
                          {course.courseName}
                        </p>
                        <p
                          className="cardCourseType"
                          style={{ color: "white" }}
                        >
                          {course.courseType}
                        </p>
                      </div>
                    </div>
                    <p style={{ color: "white", textAlign: "justify" }}>
                      {course.courseDescription}
                    </p>
                    <div className="cardCourseDetails">
                      <div
                        style={{
                          display: "flex",
                          height: "2.5rem",
                          color: "white",
                          alignItems: "center",
                        }}
                      >
                        <RocketLaunchIcon />
                        <p style={{ color: "white", marginLeft: "1rem" }}>
                          {course.dateOfStart.substring(0, 10)}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          height: "2.5rem",
                          color: "white",
                          alignItems: "center",
                        }}
                      >
                        <AccessAlarmIcon />
                        <p style={{ color: "white", marginLeft: "1rem" }}>
                          {course.modulesIncluded
                            .map((mod) => mod.noOfDays)
                            .reduce((acc, cur) => acc + cur, 0)}{" "}
                          {<FormattedMessage id="days" defaultMessage="days" />}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          height: "2.5rem",
                          color: "white",
                          alignItems: "center",
                        }}
                      >
                        <TranslateIcon />
                        <p style={{ color: "white", marginLeft: "1rem" }}>
                          {course.language}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          height: "2.5rem",
                          color: "white",
                          alignItems: "center",
                        }}
                      >
                        <EuroIcon />
                        <p style={{ color: "white", marginLeft: "1rem" }}>
                          {course.coursePrice}
                        </p>
                      </div>
                    </div>
                    <p
                      style={{
                        color: "white",
                        width: "max-content",
                        fontWeight: 900,
                        fontSize: "1.2rem",
                        borderBottom: "1px solid white",
                      }}
                    >
                      <FormattedMessage
                        id="mod_on_card"
                        defaultMessage="Modules:"
                      />
                    </p>
                    <div className="adminCardModulesSection">
                      {course.modulesIncluded.map((mod, id) => {
                        return (
                          <p key={id} style={{ color: "white" }}>
                            {mod.name}
                          </p>
                        );
                      })}
                    </div>
                  </Box>
                );
              })
            )}
          </div>
        </section>
      </div>
      <Snackbar
        open={showMessage}
        autoHideDuration={5000}
        onClose={() => setShowMessage(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        key={"bottomright"}
      >
        <Alert
          onClose={() => setShowMessage(false)}
          severity="success"
          sx={{ width: "100%", fontSize: "1rem" }}
        >
          {messageText}
        </Alert>
      </Snackbar>
      {/* <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
    <DialogTitle sx={{ color: "red" }}>
      Do you really want to delete the module?
    </DialogTitle>
    <DialogContent>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      ></Box>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={(event) => {
          deleteModuleRequest(event);
          setShowDeleteModal(false);
        }}
      >
        Submit
      </Button>
      <Button variant="contained" onClick={() => setShowDeleteModal(false)}>
        Cancel
      </Button>
    </DialogActions>
  </Dialog> */}
    </div>
  );
}
