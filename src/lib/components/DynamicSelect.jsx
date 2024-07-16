import React, { useEffect, useState, useCallback } from "react";
import {
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   FormHelperText,
   CircularProgress,
   debounce,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const DynamicSelect = ({
   name,
   label,
   dependency,
   url,
   validation,
   initialValue,
}) => {
   const {
      control,
      watch,
      setValue,
      formState: { errors },
   } = useFormContext();
   const [options, setOptions] = useState([]);
   const [loading, setLoading] = useState(false);
   const dependencyValue = dependency ? watch(dependency) : null;

   const fetchOptions = useCallback(
      debounce(async (value) => {
         setLoading(true);
         try {
            const response = await fetch(
               value ? url.replace(":value", value) : url,
            );
            const data = await response.json();
            setOptions(data.options);
         } catch (error) {
            console.error("Failed to fetch options:", error);
         }
         setLoading(false);
      }, 1),
      [url],
   );

   useEffect(() => {
      if (dependency) {
         if (dependencyValue) {
            fetchOptions(dependencyValue);
            setValue(name, ""); // Clear the dependent field
         } else {
            setOptions([]);
         }
      } else {
         fetchOptions();
      }
   }, [dependencyValue, fetchOptions, dependency, setValue, name]);

   useEffect(() => {
      if (options.length > 0 && initialValue) {
         setValue(name, initialValue);
      }
   }, [options, initialValue, setValue, name]);

   return (
      <Controller
         name={name}
         control={control}
         defaultValue=""
         rules={{ validate: validation }}
         render={({ field: { onChange, value } }) => (
            <FormControl variant="outlined" fullWidth error={!!errors[name]}>
               <InputLabel>{label}</InputLabel>
               <Select
                  value={value}
                  onChange={onChange}
                  label={label}
                  disabled={loading || (dependency && !dependencyValue)}
               >
                  {loading ? (
                     <MenuItem disabled>
                        <CircularProgress size={24} />
                     </MenuItem>
                  ) : (
                     options?.map((option, index) => (
                        <MenuItem key={index} value={option.id}>
                           {option.name}
                        </MenuItem>
                     ))
                  )}
               </Select>
               <FormHelperText>{errors[name]?.message}</FormHelperText>
            </FormControl>
         )}
      />
   );
};

export default DynamicSelect;
