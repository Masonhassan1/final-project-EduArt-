import React from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

export default function ModulesTasks({ moduleTasks, setModuleTasks }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const intl = useIntl();

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
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography>
          <FormattedMessage id="tasks" defaultMessage="Tasks" />
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ m: "1rem", display: "flex", alignItems: "flex-end" }}>
          <form onSubmit={addNewTask}>
            <TextField
              id="standard-basic"
              label={
                <FormattedMessage id="task_name" defaultMessage="Task name" />
              }
              variant="standard"
              sx={{ width: "40%" }}
              {...register("taskName", {
                required: intl.formatMessage({
                  defaultMessage: "This field is required.",
                  id: "this_field_is_required",
                }),
                minLength: {
                  value: 5,
                  message: intl.formatMessage({
                    defaultMessage: "This field should be more than 5 symbols.",
                    id: "this_field_should_be_more",
                  }),
                },
              })}
              helperText={errors.taskName && errors.taskName.message}
              error={errors.taskName ? true : false}
            />
            <TextField
              id="standard-basic"
              label={
                <FormattedMessage id="task_link" defaultMessage="Task link" />
              }
              variant="standard"
              sx={{ width: "40%", ml: "1rem" }}
              {...register("taskLink", {
                required: intl.formatMessage({
                  defaultMessage: "This field is required.",
                  id: "this_field_is_required",
                }),
                minLength: {
                  value: 5,
                  message: intl.formatMessage({
                    defaultMessage: "This field should be more than 5 symbols.",
                    id: "this_field_should_be_more",
                  }),
                },
              })}
              helperText={errors.taskLink && errors.taskLink.message}
              error={errors.taskLink ? true : false}
            />
            <Button type="submit" sx={{ ml: "1rem" }} variant="outlined">
              <AddIcon />
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
                    label={
                      <FormattedMessage
                        id="task_name"
                        defaultMessage="Task name"
                      />
                    }
                    variant="standard"
                    sx={{ width: "35%", ml: "1rem" }}
                    value={task.taskName}
                    onChange={(event) => changeTaskName(event.target.value, id)}
                  />
                  <TextField
                    disabled={!task.mode}
                    id="standard-basic"
                    label={
                      <FormattedMessage
                        id="task_link"
                        defaultMessage="Task link"
                      />
                    }
                    variant="standard"
                    sx={{ width: "35%", ml: "1rem" }}
                    value={task.taskLink}
                    onChange={(event) => changeTaskLink(event.target.value, id)}
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
  );
}
