"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const AutocompleteWidget = ({
   id,
   value,
   required,
   label,
   schema,
   onChange,
   options,
}) => {
   const handleChange = (event, newValue) => {
      onChange(newValue);
   };

   return (
      <Autocomplete
         id={id}
         options={schema.enum || []}
         value={value || ""}
         onChange={handleChange}
         renderInput={(params) => (
            <TextField
               {...params}
               label={label || schema.title}
               required={required}
               variant="outlined"
            />
         )}
      />
   );
};

export default AutocompleteWidget;
