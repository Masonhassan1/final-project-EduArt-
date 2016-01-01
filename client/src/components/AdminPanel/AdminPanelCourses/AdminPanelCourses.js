import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TranslateIcon from "@mui/icons-material/Translate";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import EuroIcon from "@mui/icons-material/Euro";

import axiosConfig from "../../../util/axiosConfig";
import baseURL from "../../../util/constants";

import "./AdminPanelCourses.css";

export default function AdminPanelCourses() {
  const [courses, setCourses] = useState([]);

  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCourses = async (url) => {
    try {
      setLoading(true);
      const apiData = await axiosConfig.get(url);
      console.log("courses", apiData.data);
      setCourses([...apiData.data]);
      //   setModulesName(apiData.data.map((mod) => mod.name));
      //   setModulesSearchResult([...apiData.data]);

      setLoading(false);
      setHasError(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    getCourses(`/courses`);
  }, []);

  return (
    <div>
      <h3 className="modulesPageTitle">Courses</h3>
      <div className="adminPanelModulesWrapper">
        <Box className="moduleWrapper newModuleWrapper" sx={{ p: "1rem" }}>
          {/* <div>
        <Box sx={{ m: "1rem" }}>
          <TextField
            id="standard-basic"
            label="Name"
            required
            variant="standard"
            value={moduleName}
            onChange={(event) => setModuleName(event.target.value)}
            sx={{ width: "95%", mx: "auto" }}
          />
        </Box>
        <Box sx={{ m: "1rem" }}>
          <TextField
            required
            id="standard-basic"
            type="number"
            label="Duration, days"
            variant="standard"
            sx={{ width: "95%" }}
            value={moduleDuration}
            onChange={(event) => setModuleDuration(event.target.value)}
          />
        </Box>

        <Box sx={{ m: "1rem" }}>
          <TextField
            id="standard-basic"
            label="Zoom link"
            variant="standard"
            sx={{ width: "95%" }}
            value={moduleZoomLink}
            onChange={(event) => setModuleZoomLink(event.target.value)}
          />
        </Box>
      </div>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Teachers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ m: "1rem" }}>
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Teachers
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Teachers" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {teachersArr.map((teacher) => (
                    <MenuItem
                      key={teacher._id}
                      value={`${teacher.firstName} ${teacher.lastName}`}
                    >
                      <Checkbox
                        checked={
                          personName.indexOf(
                            `${teacher.firstName} ${teacher.lastName}`
                          ) > -1
                        }
                      />
                      <ListItemText
                        primary={`${teacher.firstName} ${teacher.lastName}`}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Box>
        </AccordionDetails>
      </Accordion>
      <ModulesTasks
        moduleTasks={moduleTasks}
        setModuleTasks={setModuleTasks}
      />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Extra materials</Typography>
        </AccordionSummary>
        <ExtraMat
          moduleExtraMat={moduleExtraMat}
          setModuleExtraMat={setModuleExtraMat}
        />
      </Accordion>
      {updateModuleMode ? (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="contained"
            onClick={updateModuleRequest}
            sx={{ display: "block", my: "1rem" }}
          >
            Update module
          </Button>
          <Button
            variant="outlined"
            onClick={cancelUpdateModuleRequest}
            sx={{ display: "block", my: "1rem" }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          variant="contained"
          onClick={createNewModule}
          sx={{ display: "block", mx: "auto", my: "1rem" }}
        >
          Create new module
        </Button>
      )} */}
        </Box>
        <section className="adminModulesSearchSection">
          {/* <AdminModulesSearch
        modulesName={modulesName}
        getModulesSearchResult={getModulesSearchResult}
      /> */}

          <div className="modulesWrapper">
            {courses.map((course) => {
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
                      <p className="cardCourseName" style={{ color: "white" }}>
                        {course.courseName}
                      </p>
                      <p className="cardCourseType" style={{ color: "white" }}>
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
                          .reduce((acc, cur) => acc + cur, 0)}
                        {" lectures"}
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
                    Modules:
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
            })}
          </div>
        </section>
      </div>
      {/* <Snackbar
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
  </Snackbar> */}
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
