import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import axiosConfig from "../../../util/axiosConfig";
import "./AdminPanelModules.css";
import ExtraMat from "./ExtraMat";
import AdminModulesSearch from "./AdminModulesSearch";

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
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [modules, setModules] = useState([]);
  const [modulesSearchResult, setModulesSearchResult] = useState([]);
  const [modulesName, setModulesName] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [moduleDuration, setModuleDuration] = useState("");
  const [moduleZoomLink, setModuleZoomLink] = useState("");
  const [moduleTeachers, setModuleTeachers] = useState("");
  const [moduleTasks, setModuleTasks] = useState([]);
  const [moduleExtraMat, setModuleExtraMat] = useState("");

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

  const addNewTask = handleSubmit((data) => {
    setModuleTasks([...moduleTasks, { ...data, editMode: false }]);
    reset();
  });

  const deleteTask = (id) => {
    setModuleTasks(moduleTasks.filter((task, index) => index !== id));
  };

  const changeEditMode = (id) => {
    setModuleTasks(
      moduleTasks.map((task, index) => {
        if (index === id) {
          task.mode = !task.mode;
        }
        return task;
      })
    );
  };

  const changeTaskLink = (newTaskLink, id) => {
    setModuleTasks(
      moduleTasks.map((task, index) => {
        if (index === id) {
          task.taskLink = newTaskLink;
        }
        return task;
      })
    );
  };

  const changeTaskName = (newTaskName, id) => {
    setModuleTasks(
      moduleTasks.map((task, index) => {
        if (index === id) {
          task.taskName = newTaskName;
        }
        return task;
      })
    );
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

      setLoading(false);
      setHasError(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
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
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Tasks</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ m: "1rem", display: "flex", alignItems: "flex-end" }}>
                <form onSubmit={addNewTask}>
                  <TextField
                    id="standard-basic"
                    label="Task name"
                    variant="standard"
                    sx={{ width: "40%" }}
                    {...register("taskName", {
                      required: "This field is required.",
                      minLength: {
                        value: 5,
                        message: "This field should be more than 5 symbols",
                      },
                    })}
                    helperText={errors.taskName && errors.taskName.message}
                    error={errors.taskName ? true : false}
                  />
                  <TextField
                    id="standard-basic"
                    label="Task link"
                    variant="standard"
                    sx={{ width: "40%", ml: "1rem" }}
                    {...register("taskLink", {
                      required: "This field is required.",
                      minLength: {
                        value: 5,
                        message: "This field should be more than 5 symbols",
                      },
                    })}
                    helperText={errors.taskLink && errors.taskLink.message}
                    error={errors.taskLink ? true : false}
                  />
                  <Button type="submit" sx={{ ml: "1rem" }} variant="outlined">
                    Add
                  </Button>
                </form>
              </Box>
              <Box sx={{ maxWidth: "100%" }}>
                {moduleTasks.length > 0 &&
                  moduleTasks.map((task, id) => {
                    return (
                      <div key={id}>
                        <TextField
                          disabled={!task.mode}
                          id="standard-basic"
                          label="Task name"
                          variant="standard"
                          sx={{ width: "35%", ml: "1rem" }}
                          value={task.taskName}
                          onChange={(event) =>
                            changeTaskName(event.target.value, id)
                          }
                        />
                        <TextField
                          disabled={!task.mode}
                          id="standard-basic"
                          label="Task link"
                          variant="standard"
                          sx={{ width: "35%", ml: "1rem" }}
                          value={task.taskLink}
                          onChange={(event) =>
                            changeTaskLink(event.target.value, id)
                          }
                        />
                        <Button onClick={() => changeEditMode(id)}>
                          <EditIcon />
                        </Button>

                        <Button onClick={() => deleteTask(id)}>
                          <DeleteForeverIcon />
                        </Button>
                      </div>
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
            <ExtraMat
              moduleExtraMat={moduleExtraMat}
              setModuleExtraMat={setModuleExtraMat}
            />
          </Accordion>
          <Button
            variant="contained"
            onClick={createNewModule}
            sx={{ display: "block", mx: "auto", my: "1rem" }}
          >
            Create new module
          </Button>
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
    </div>
  );
}
