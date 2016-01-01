import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";

import axiosConfig from "../../../util/axiosConfig";
import "./AdminPanelModules.css";
import ExtraMat from "./ExtraMaterials/ExtraMat";
import AdminModulesSearch from "./AdminModulesSearch/AdminModulesSearch";
import ModulesTasks from "./ModulesTasks/ModulesTasks";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

export default function AdminPanelModules() {
  const [modules, setModules] = useState([]);
  const [modulesSearchResult, setModulesSearchResult] = useState([]);
  const [updateModuleMode, setUpdateModuleMode] = useState(false);
  const [moduleId, setModuleId] = useState("");
  const [modulesName, setModulesName] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [moduleDuration, setModuleDuration] = useState("");
  const [moduleZoomLink, setModuleZoomLink] = useState("");
  const [moduleTeachers, setModuleTeachers] = useState("");
  const [moduleTasks, setModuleTasks] = useState([]);
  const [moduleExtraMat, setModuleExtraMat] = useState("");

  const [showCreateMessage, setShowCreateMessage] = useState(false);
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);

  const [teachersArr, setTeachersArr] = useState([]);

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    const idTeachers = value.map((item) => {
      const temp = teachersArr.find(
        (teacher) => `${teacher.firstName} ${teacher.lastName}` === item
      );
      return temp._id;
    });
    setModuleTeachers(idTeachers);
  };

  const getModulesSearchResult = async (url) => {
    try {
      setLoading(true);
      const apiData = await axiosConfig.get(url);
      console.log("new search results", apiData);
      setModulesSearchResult([...apiData.data]);
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
      setModulesName(apiData.data.map((mod) => mod.name));
      setModulesSearchResult([...apiData.data]);

      setLoading(false);
      setHasError(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };
  const getTeachers = async () => {
    try {
      setLoading(true);
      const apiData = await axiosConfig.get(`/user`);
      if (apiData.data) {
        setTeachersArr(
          apiData.data.filter((teacher) => teacher.accessRights.includes(3))
        );
      }

      setLoading(false);
      setHasError(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };

  const resetCreateModuleForm = () => {
    setModuleName("");
    setModuleDuration("");
    setModuleZoomLink("");
    setModuleTeachers("");
    setModuleTasks([]);
    setModuleExtraMat("");
  };

  useEffect(() => {
    getModules(`/modules`);
    getTeachers();
  }, []);

  const createNewModule = async () => {
    try {
      setLoading(true);
      const jwt = localStorage.getItem("jwt");
      const response = await axiosConfig.post(
        `/modules`,
        {
          name: moduleName,
          noOfDays: moduleDuration,
          type: "online",
          teacher: moduleTeachers,
          zoomLink: moduleZoomLink,
          tasks: moduleTasks,
          extraMaterial: moduleExtraMat,
        },
        {
          headers: {
            authorization: `Bearer ${jwt}`,
          },
        }
      );

      resetCreateModuleForm();
      setShowCreateMessage(true);
      getModules(`/modules`);

      setLoading(false);
      setHasError(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };

  const updateModuleRequest = async () => {
    try {
      setLoading(true);
      const jwt = localStorage.getItem("jwt");
      const response = await axiosConfig.patch(
        `/modules/${moduleId}`,
        {
          name: moduleName,
          noOfDays: moduleDuration,
          type: "online",
          teacher: moduleTeachers,
          zoomLink: moduleZoomLink,
          tasks: moduleTasks,
          extraMaterial: moduleExtraMat,
        },
        {
          headers: {
            authorization: `Bearer ${jwt}`,
          },
        }
      );

      setShowUpdateMessage(true);
      resetCreateModuleForm();
      getModules(`/modules`);
      setUpdateModuleMode(false);

      setLoading(false);
      setHasError(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };

  const updateModule = (mod) => {
    console.log("update module", mod);
    setModuleId(mod.id);
    setModuleName(mod.name);
    setModuleDuration(mod.noOfDays);
    setModuleZoomLink(mod.zoomLink);
    setModuleTeachers(mod.teacher);
    setModuleTasks(mod.tasks);
    setModuleExtraMat(mod.extraMaterial);
    setUpdateModuleMode(true);
  };

  return (
    <div>
      <h3 className="modulesPageTitle">Modules</h3>
      <div className="adminPanelModulesWrapper">
        <Box className="moduleWrapper newModuleWrapper" sx={{ p: "1rem" }}>
          <div>
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
            <Button
              variant="contained"
              onClick={updateModuleRequest}
              sx={{ display: "block", mx: "auto", my: "1rem" }}
            >
              Update module
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={createNewModule}
              sx={{ display: "block", mx: "auto", my: "1rem" }}
            >
              Create new module
            </Button>
          )}
        </Box>
        <section className="adminModulesSearchSection">
          <AdminModulesSearch
            modulesName={modulesName}
            getModulesSearchResult={getModulesSearchResult}
          />

          <div className="modulesWrapper">
            {modulesSearchResult.map((mod) => {
              return (
                <Box className="moduleWrapper" key={mod._id}>
                  <Button
                    onClick={() => updateModule(mod)}
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "-4px",
                      width: "1rem",
                      height: "1rem",
                      zIndex: "10",
                    }}
                  >
                    <EditIcon />
                  </Button>
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
                              <p
                                key={id}
                              >{`${person.firstName} ${person.lastName}`}</p>
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
            })}
          </div>
        </section>
      </div>
      <Snackbar
        open={showCreateMessage}
        autoHideDuration={5000}
        onClose={() => setShowCreateMessage(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        key={"bottomright"}
      >
        <Alert
          onClose={() => setShowCreateMessage(false)}
          severity="success"
          sx={{ width: "100%", fontSize: "1rem" }}
        >
          Module has been created successfully.
        </Alert>
      </Snackbar>
      <Snackbar
        open={showUpdateMessage}
        autoHideDuration={5000}
        onClose={() => setShowUpdateMessage(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        key={"bottomright1"}
      >
        <Alert
          onClose={() => setShowUpdateMessage(false)}
          severity="success"
          sx={{ width: "100%", fontSize: "1rem" }}
        >
          Module has been updated successfully.
        </Alert>
      </Snackbar>
    </div>
  );
}
