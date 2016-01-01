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

import axiosConfig from "../../../util/axiosConfig";
import "./AdminPanelModules.css";

export default function AdminPanelModules() {
  const [modules, setModules] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [moduleDuration, setModuleDuration] = useState("");
  const [newModule, setNewModule] = useState({
    name: "",
    noOfDays: 0,
    type: "online",
    teacher: "635d562f281700f22e761dca",
    zoomLink: "https://us02web.zoom.us/",
    tasks: [
      {
        taskName: "v-if, v-else and v-else-if",
        taskLink: "https://github.com/",
      },
    ],
    extraMaterial: [
      {
        description: "",
        link: "",
      },
    ],
  });

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

  useEffect(() => {
    getModules();
  }, []);

  const createNewModule = () => {
    console.log("module name", moduleName);
    console.log("module duration", moduleDuration);
  };

  return (
    <div>
      <h3>Modules</h3>
      <div className="adminPanelModulesWrapper">
        <Box className="moduleWrapper">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div>
                <Box sx={{ m: "1rem", width: "500px" }}>
                  <TextField
                    id="standard-basic"
                    label="Name"
                    required
                    variant="standard"
                    value={moduleName}
                    onChange={(event) => setModuleName(event.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box sx={{ m: "1rem" }}>
                  <TextField
                    required
                    id="standard-basic"
                    type="number"
                    label="Duration, days"
                    variant="standard"
                    sx={{ width: "100%" }}
                    value={moduleDuration}
                    onChange={(event) => setModuleDuration(event.target.value)}
                  />
                </Box>

                <Box sx={{ m: "1rem" }}>
                  <TextField
                    id="standard-basic"
                    label="Zoom link"
                    variant="standard"
                    sx={{ width: "100%" }}
                  />
                </Box>
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
                  <Box sx={{ m: "1rem" }}>
                    <TextField
                      id="standard-basic"
                      label="Teacher"
                      variant="standard"
                      sx={{ width: "90%" }}
                    />
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
                    />
                    <TextField
                      id="standard-basic"
                      label="Task link"
                      variant="standard"
                      sx={{ width: "90%" }}
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
                    />
                    <TextField
                      id="standard-basic"
                      label="Link"
                      variant="standard"
                      sx={{ width: "90%" }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
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
