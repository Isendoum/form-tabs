import React, { useState, useEffect } from "react";
import {
   TextField,
   MenuItem,
   FormControl,
   FormHelperText,
} from "@mui/material";

const DynamicSelectWidget = ({
   schema,
   options,
   value,
   required,
   onChange,
   uiSchema,
   rawErrors = [],
}) => {
   const [items, setItems] = useState([]);
   const fetchUrl = uiSchema["ui:options"]?.fetchUrl;

   useEffect(() => {
      const fetchOptions = async () => {
         try {
            const response = await fetch(fetchUrl);
            const data = await response.json();
            setItems(
               data.map((item) => ({ label: item.name, value: item.name })),
            );
         } catch (error) {
            console.error("Error fetching options:", error);
         }
      };

      if (fetchUrl) {
         fetchOptions();
      }
   }, [fetchUrl]);

   const handleChange = (event) => {
      onChange(event.target.value);
   };

   return (
      <FormControl fullWidth error={!!rawErrors.length} required={required}>
         <TextField
            select
            label={schema.title}
            value={value || ""}
            onChange={handleChange}
            variant="outlined"
            fullWidth
         >
            {items.map((option) => (
               <MenuItem key={option.value} value={option.value}>
                  {option.label}
               </MenuItem>
            ))}
         </TextField>
      </FormControl>
   );
};

export default DynamicSelectWidget;
