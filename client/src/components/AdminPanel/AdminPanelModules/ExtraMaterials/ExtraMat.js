import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AccordionDetails from "@mui/material/AccordionDetails";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

export default function ExtraMat({ moduleExtraMat, setModuleExtraMat }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const addNewExtraMat = handleSubmit((data) => {
    console.log("add new extra mat", data);
    setModuleExtraMat([...moduleExtraMat, { ...data, editMode: false }]);
    reset();
  });

  const deleteExtraMat = (id) => {
    setModuleExtraMat(moduleExtraMat.filter((mat, index) => index !== id));
  };

  const changeExtraMatEditMode = (id) => {
    setModuleExtraMat(
      moduleExtraMat.map((mat, index) => {
        if (index === id) {
          mat.mode = !mat.mode;
        }
        return mat;
      })
    );
  };

  const changeExtraMatLink = (newLink, id) => {
    setModuleExtraMat(
      moduleExtraMat.map((mat, index) => {
        if (index === id) {
          mat.link = newLink;
        }
        return mat;
      })
    );
  };

  const changeExtraMatDesc = (newDesc, id) => {
    setModuleExtraMat(
      moduleExtraMat.map((mat, index) => {
        if (index === id) {
          mat.description = newDesc;
        }
        return mat;
      })
    );
  };

  return (
    <AccordionDetails>
      <Box sx={{ m: "1rem", display: "flex", alignItems: "flex-end" }}>
        <form onSubmit={addNewExtraMat}>
          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            sx={{ width: "40%" }}
            {...register("description", {
              required: "This field is required.",
            })}
            helperText={errors.description && errors.description.message}
            error={errors.description ? true : false}
            // value={moduleTaskName}
            // onChange={(event) => setModuleTaskName(event.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Link"
            variant="standard"
            sx={{ width: "40%", ml: "1rem" }}
            {...register("link", {
              required: "This field is required.",
            })}
            helperText={errors.link && errors.link.message}
            error={errors.link ? true : false}
            // value={moduleTaskLink}
            // onChange={(event) => setModuleTaskLink(event.target.value)}
          />
          <Button type="submit" sx={{ ml: "1rem" }} variant="outlined">
            Add
          </Button>
        </form>
      </Box>
      <Box sx={{ maxWidth: "100%" }}>
        {moduleExtraMat.length > 0 &&
          moduleExtraMat.map((mat, id) => {
            return (
              <div key={id}>
                <TextField
                  disabled={!mat.mode}
                  id="standard-basic"
                  label="Description"
                  variant="standard"
                  sx={{ width: "35%", ml: "1rem" }}
                  value={mat.description}
                  // value={moduleTaskLink}
                  onChange={(event) =>
                    changeExtraMatDesc(event.target.value, id)
                  }
                />
                <TextField
                  disabled={!mat.mode}
                  id="standard-basic"
                  label="Link"
                  variant="standard"
                  sx={{ width: "35%", ml: "1rem" }}
                  value={mat.link}
                  onChange={(event) =>
                    changeExtraMatLink(event.target.value, id)
                  }
                />
                <Button onClick={() => changeExtraMatEditMode(id)}>
                  <EditIcon />
                </Button>

                <Button onClick={() => deleteExtraMat(id)}>
                  <DeleteForeverIcon />
                </Button>
              </div>
            );
          })}
      </Box>
    </AccordionDetails>
  );
}
