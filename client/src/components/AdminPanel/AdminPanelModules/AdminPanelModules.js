import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import axiosConfig from "../../../util/axiosConfig";
import "./AdminPanelModules.css";

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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function AdminPanelModules() {
  const [modules, setModules] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [moduleDuration, setModuleDuration] = useState("");
  const [moduleZoomLink, setModuleZoomLink] = useState("");
  const [moduleTeacher, setModuleTeacher] = useState("");
  const [moduleTaskName, setModuleTaskName] = useState("");
  const [moduleTaskLink, setModuleTaskLink] = useState("");
  const [moduleExtraDesc, setModuleExtraDesc] = useState("");
  const [moduleExtraLink, setModuleExtraLink] = useState("");

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
  };
  // const [newModule, setNewModule] = useState({
  //   name: "",
  //   noOfDays: 0,
  //   type: "online",
  //   teacher: "635d562f281700f22e761dca",
  //   zoomLink: "https://us02web.zoom.us/",
  //   tasks: [
  //     {
  //       taskName: "v-if, v-else and v-else-if",
  //       taskLink: "https://github.com/",
  //     },
  //   ],
  //   extraMaterial: [
  //     {
  //       description: "",
  //       link: "",
  //     },
  //   ],
  // });

  const getModules = async () => {
    try {
      setLoading(true);
      const apiData = await axiosConfig.get(`/modules`);
      console.log("modules", apiData.data);
      setModules(apiData.data);

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
      console.log("userList", apiData.data);
      if (apiData.data) {
        setTeachersArr(
          apiData.data.filter((teacher) => teacher.accessRights.includes(3))
        );
      }

      console.log("teachers ARR", teachersArr);
      // setModules(apiData.data);

      setLoading(false);
      setHasError(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    getModules();
    getTeachers();
  }, []);

  const createNewModule = () => {
    console.log("module name", moduleName);
    console.log("module duration", moduleDuration);
    console.log("module zoom link", moduleZoomLink);
    console.log("module teacher", moduleTeacher);
    console.log("module task name", moduleTaskName);
    console.log("module task link", moduleTaskLink);
    console.log("module extra desc", moduleExtraDesc);
    console.log("module extra link", moduleExtraLink);
  };

  return (
    <div>
      <h3>Modules</h3>
      <div className="adminPanelModulesWrapper">
        <Box className="moduleWrapper newModuleWrapper" sx={{ p: "1rem" }}>
          {/* <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            > */}
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
          {/* </AccordionSummary> */}

          {/* <AccordionDetails> */}
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
                {/* <TextField
                  id="standard-basic"
                  label="Teacher"
                  variant="standard"
                  sx={{ width: "90%" }}
                  value={moduleTeacher}
                  onChange={(event) => setModuleTeacher(event.target.value)}
                /> */}
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
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Tasks</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ m: "1rem" }}>
                <TextField
                  id="standard-basic"
                  label="Task name"
                  variant="standard"
                  sx={{ width: "90%" }}
                  value={moduleTaskName}
                  onChange={(event) => setModuleTaskName(event.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Task link"
                  variant="standard"
                  sx={{ width: "90%" }}
                  value={moduleTaskLink}
                  onChange={(event) => setModuleTaskLink(event.target.value)}
                />
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
                <TextField
                  id="standard-basic"
                  label="Description"
                  variant="standard"
                  sx={{ width: "90%" }}
                  value={moduleExtraDesc}
                  onChange={(event) => setModuleExtraDesc(event.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Link"
                  variant="standard"
                  sx={{ width: "90%" }}
                  value={moduleExtraLink}
                  onChange={(event) => setModuleExtraLink(event.target.value)}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* </AccordionDetails> */}
          {/* </Accordion> */}
          <Button
            variant="contained"
            onClick={createNewModule}
            sx={{ display: "block", mx: "auto", my: "1rem" }}
          >
            Create new module
          </Button>
        </Box>
        <div className="modulesWrapper">
          {modules.map((mod) => {
            return (
              <Box className="moduleWrapper" key={mod._id}>
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
                        <a href={mod.zoomLink} target="_blank" rel="noreferrer">
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
      </div>
    </div>
  );
}
