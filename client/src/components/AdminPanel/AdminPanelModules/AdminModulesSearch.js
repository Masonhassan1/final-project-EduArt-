import React from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const filter = createFilterOptions();

export default function AdminModulesSearch({
  modulesName,
  getModulesSearchResult,
}) {
  const [value, setValue] = React.useState(null);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log("submit form");
      }}
    >
      <Autocomplete
        sx={{
          width: "600px",
          mb: "1rem",
        }}
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setValue(newValue);
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue(newValue.inputValue);
          } else {
            setValue(newValue);
          }
          console.log("tratata form", newValue);
          if (newValue) {
            getModulesSearchResult(`/modules?name=${newValue}`);
          } else {
            getModulesSearchResult(`/modules`);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option);
          // if (inputValue !== "" && !isExisting) {
          //   filtered.push({
          //     inputValue,
          //     title: `Add "${inputValue}"`,
          //   });
          // }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={modulesName}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option;
        }}
        renderOption={(props, option) => <li {...props}>{option}</li>}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Modules ..." />}
      />
    </form>
  );
}
