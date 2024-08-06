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
import { effect, signal, useSignalEffect } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

const formContextSignal = signal(() => useFormContext());
const optionsSignal = signal([]);
const dependencySignal = signal(null);
const loadingSignal = signal(false);
const fetchOptionsSignal = signal(null);
const optionLabelSignal = signal("");
const optionValueSignal = signal("");

effect(async () => {
   loadingSignal.value = true;
   try {
      let data = [];

      if (dependencySignal.value) {
         const fieldfetchDepedency = formContextSignal
            .value()
            .watch(dependencySignal.value);
         data = await fetchOptionsSignal.value(fieldfetchDepedency.value);
      } else {
         data = await fetchOptionsSignal.value();
      }
      const mappedData = data.map((obj) => ({
         name: obj?.[optionLabelSignal],
         value: obj?.[optionValueSignal],
      }));
      optionsSignal.value = mappedData;
      // setOptions(mappedData);
   } catch (error) {
      console.error("Failed to fetch options:", error);
   }
   loadingSignal.value = false;
});

const SelectFetch = ({
   name,
   label,
   optionValue,
   optionLabel,
   fetchOptions,
   value,
   onChange,
   fetchDepedency,
}) => {
   useSignals();
   optionValueSignal.value = optionValue;
   optionLabelSignal.value = optionLabel;
   dependencySignal.value = fetchDepedency;
   fetchOptionsSignal.value = fetchOptions;

   return (
      <FormControl
         variant="outlined"
         fullWidth
         error={!!formContextSignal.value().formState.errors[name]}
      >
         <InputLabel>{label}</InputLabel>
         <Select value={value} onChange={onChange} label={label}>
            {loadingSignal.value ? (
               <MenuItem disabled>
                  <CircularProgress size={24} />
               </MenuItem>
            ) : (
               optionsSignal.value.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                     {option.name}
                  </MenuItem>
               ))
            )}
         </Select>
         <FormHelperText>
            {formContextSignal.value().formState.errors[name]?.message}
         </FormHelperText>
      </FormControl>
   );
};

export default SelectFetch;
