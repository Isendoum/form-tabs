import React, { useState, useEffect, useCallback } from "react";
import {
   TextField,
   CircularProgress,
   Autocomplete,
   debounce,
} from "@mui/material";

const ServerAutocomplete = ({
   label,
   value,
   onChange,
   fetchOptions,
   url,
   optionValue,
   optionLabel,
}) => {
   const [inputValue, setInputValue] = useState("");
   const [options, setOptions] = useState([]);
   const [loading, setLoading] = useState(false);

   const debouncedFetchOptions = useCallback(
      debounce(async (input) => {
         setLoading(true);
         const res = await fetch(`${url}${input}`);
         const data = await res.json();
         const mappedData = data.data.map((obj) => ({
            name: obj?.[optionLabel],
            value: obj?.[optionValue],
         }));
         setOptions(mappedData);
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
         getOptionLabel={(option) => option.name || ""}
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
