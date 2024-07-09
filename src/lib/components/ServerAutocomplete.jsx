import React, { useState, useEffect, useCallback } from "react";
import {
   TextField,
   CircularProgress,
   Autocomplete,
   debounce,
} from "@mui/material";

const ServerAutocomplete = ({ label, value, onChange, fetchOptions }) => {
   const [inputValue, setInputValue] = useState("");
   const [options, setOptions] = useState([]);
   const [loading, setLoading] = useState(false);

   const debouncedFetchOptions = useCallback(
      debounce(async (input) => {
         setLoading(true);
         const response = await fetchOptions(input);
         setOptions(response);
         setLoading(false);
      }, 300),
      [fetchOptions],
   );

   useEffect(() => {
      if (inputValue.length < 3) {
         setOptions([]);
         return;
      }

      debouncedFetchOptions(inputValue);
   }, [inputValue, debouncedFetchOptions]);

   return (
      <Autocomplete
         value={value || null}
         onChange={(event, newValue) => {
            onChange(newValue);
         }}
         inputValue={inputValue}
         onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
         }}
         options={options}
         getOptionLabel={(option) => option.label || ""}
         loading={loading}
         renderInput={(params) => (
            <TextField
               {...params}
               label={label}
               variant="outlined"
               InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                     <>
                        {loading ? (
                           <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                     </>
                  ),
               }}
            />
         )}
      />
   );
};

export default ServerAutocomplete;
