// renderers/AutocompleteRenderer.js
import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { withJsonFormsControlProps } from "@jsonforms/react";

const AutocompleteRenderer = (props) => {
   const { data, handleChange, path, options, schema } = props;

   const handleAutocompleteChange = (event, value) => {
      handleChange(path, value);
   };

   return (
      <Autocomplete
         value={data || ""}
         onChange={handleAutocompleteChange}
         options={options.enum}
         renderInput={(params) => (
            <TextField {...params} label={schema.title} />
         )}
      />
   );
};

export default withJsonFormsControlProps(AutocompleteRenderer);
