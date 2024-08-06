import React from "react";
import { Controller, useFieldArray } from "react-hook-form";

import {
   TextField,
   Button,
   Grid,
   Select,
   MenuItem,
   Checkbox,
   FormControlLabel,
   FormControl,
   InputLabel,
   FormHelperText,
   RadioGroup,
   FormLabel,
   Radio,
   Autocomplete,
   Typography,
   Box,
   Switch,
   Slider,
   IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import ServerAutocomplete from "../components/ServerAutocomplete";
import DynamicSelect from "../components/DynamicSelect";
import SelectFetch from "../components/SelectFetch";

export const isFieldVisible = (field, watchFields, index) => {
   if (!field.visibilityDependencies) return true;
   return field.visibilityDependencies.some((dep) => {
      if (dep.field.includes(".") > 0) {
         const prop1 = dep.field.split(".")[0];
         const prop2 = dep.field.split(".")[1];
         return watchFields[prop1][index][prop2] === dep.value;
      } else {
         return watchFields[dep.field] === dep.value;
      }
   });
};

export const renderInput = (
   field,
   onChange,
   value,
   fieldArrayName,
   index,
   errors,
   initialValues,
   watchFields,
) => {
   if (!isFieldVisible(field, watchFields, index)) return null;

   const fieldName = fieldArrayName
      ? `${fieldArrayName}.${index}.${field.name}`
      : field.name;

   switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "password":
         return (
            <TextField
               label={field.label}
               type={field.type}
               variant="outlined"
               fullWidth
               value={value}
               onChange={onChange}
               error={!!errors[fieldName]}
               helperText={errors[fieldName]?.message}
            />
         );
      case "textarea":
         return (
            <TextField
               label={field.label}
               variant="outlined"
               fullWidth
               multiline
               rows={4}
               value={value}
               onChange={onChange}
               error={!!errors[fieldName]}
               helperText={errors[fieldName]?.message}
            />
         );
      case "select":
         return field.dynamicOptions ? (
            <DynamicSelect
               name={fieldName}
               index={index}
               label={field.label}
               dependency={field.dynamicOptions.dependency}
               url={field.dynamicOptions.url}
               validation={field.validation}
               initialValue={initialValues[fieldName]}
               optionValue={field.optionValue}
               optionLabel={field.optionLabel}
            />
         ) : (
            <FormControl
               variant="outlined"
               fullWidth
               error={!!errors[fieldName]}
            >
               <InputLabel>{field.label}</InputLabel>
               <Select value={value} onChange={onChange} label={field.label}>
                  {field.options.map((option, index) => (
                     <MenuItem key={index} value={option[field.optionValue]}>
                        {option[field.optionLabel]}
                     </MenuItem>
                  ))}
               </Select>
               <FormHelperText>{errors[fieldName]?.message}</FormHelperText>
            </FormControl>
         );
      case "checkbox":
         return (
            <div>
               <FormControlLabel
                  control={<Checkbox checked={value} onChange={onChange} />}
                  label={field.label}
               />
               <FormHelperText className="text-red-500">
                  {errors[fieldName]?.message}
               </FormHelperText>
            </div>
         );
      case "switch":
         return (
            <div>
               <FormControlLabel
                  control={<Switch checked={value} onChange={onChange} />}
                  label={field.label}
               />
               <FormHelperText className="text-red-500">
                  {errors[fieldName]?.message}
               </FormHelperText>
            </div>
         );
      case "slider":
         return (
            <FormControl fullWidth>
               <Typography gutterBottom>{field.label}</Typography>
               <Slider
                  value={typeof value === "number" ? value : field.defaultValue}
                  onChange={onChange}
                  aria-labelledby="input-slider"
                  step={field.step}
                  min={field.min}
                  max={field.max}
               />
            </FormControl>
         );
      case "date":
         return (
            <TextField
               label={field.label}
               type="date"
               InputLabelProps={{ shrink: true }}
               fullWidth
               value={value}
               onChange={onChange}
               error={!!errors[fieldName]}
               helperText={errors[fieldName]?.message}
            />
         );
      case "radio":
         return (
            <FormControl component="fieldset" error={!!errors[fieldName]}>
               <FormLabel component="legend">{field.label}</FormLabel>
               <RadioGroup value={value} onChange={onChange}>
                  {field.options.map((option, index) => (
                     <FormControlLabel
                        key={index}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                     />
                  ))}
               </RadioGroup>
               <FormHelperText>{errors[fieldName]?.message}</FormHelperText>
            </FormControl>
         );
      case "autocomplete":
         return (
            <Autocomplete
               options={field.options}
               getOptionLabel={(option) => option.label}
               onChange={(e, newValue) =>
                  onChange(newValue ? newValue.value : "")
               }
               renderInput={(params) => (
                  <TextField
                     {...params}
                     label={field.label}
                     variant="outlined"
                     error={!!errors[fieldName]}
                     helperText={errors[fieldName]?.message}
                  />
               )}
            />
         );
      case "server-autocomplete":
         return (
            <ServerAutocomplete
               optionValue={field.optionValue}
               optionLabel={field.optionLabel}
               label={field.label}
               value={value}
               url={field.url}
               onChange={onChange}
               fetchOptions={field.fetchOptions}
            />
         );
      case "file":
         return (
            <Button variant="contained" component="label" fullWidth>
               {field.label}
               <input
                  type="file"
                  hidden
                  onChange={(e) => onChange(e.target.files[0])}
               />
            </Button>
         );
      case "select-fetch":
         return (
            <SelectFetch
               name={fieldName}
               label={field.label}
               optionValue={field.optionValue}
               optionLabel={field.optionLabel}
               fetchOptions={field.fetchOptions}
               value={value}
               onChange={onChange}
               fetchDepedency={field.fetchDepedency}
            />
         );
      default:
         return null;
   }
};

export const renderRow = (row, orientation, columns, fieldArrayName, index) => {
   const columnWidth = Math.floor(12 / columns);

   return (
      <Grid
         container
         spacing={2}
         direction={orientation === "horizontal" ? "row" : "column"}
      >
         {row.fields.map((field, fieldIndex) => {
            if (!isFieldVisible(field, watchFields)) return null;
            return (
               <Grid
                  item
                  xs={12}
                  sm={orientation === "horizontal" ? columnWidth : 12}
                  key={fieldIndex}
               >
                  <Controller
                     name={
                        fieldArrayName
                           ? `${fieldArrayName}[${index}].${field.name}`
                           : field.name
                     }
                     control={control}
                     defaultValue={
                        field.type === "checkbox" || field.type === "switch"
                           ? false
                           : ""
                     }
                     render={({ field: { onChange, value } }) =>
                        renderInput(
                           field,
                           onChange,
                           value,
                           fieldArrayName,
                           index,
                           errors,
                           initialValues,
                           watchFields,
                        )
                     }
                  />
               </Grid>
            );
         })}
      </Grid>
   );
};

export const renderSection = (section) => (
   <Box key={section.title} mb={4}>
      <Typography variant="h6" gutterBottom>
         {section.title}
      </Typography>
      {section.rows.map((row, rowIndex) => (
         <Box mb={2} key={rowIndex}>
            {renderRow(row, section.orientation, section.columns)}
         </Box>
      ))}
   </Box>
);

export const renderFieldArray = (
   field,
   control,
   errors,
   initialValues,
   watchFields,
) => {
   const { fields, append, remove } = useFieldArray({
      control,
      name: field.name,
   });

   return (
      <Box key={field.name} mb={4}>
         <Typography variant="h6" gutterBottom>
            {field.label}
         </Typography>
         {fields.map((item, index) => (
            <Box key={index} mb={2} border={1} borderRadius={8} p={2}>
               <Grid container spacing={2}>
                  {field.fields.map((subField, subFieldIndex) => (
                     <Grid item xs={12} sm={6} key={subFieldIndex}>
                        <Controller
                           name={`${field.name}[${index}].${subField.name}`}
                           control={control}
                           defaultValue={item[subField.name] || ""}
                           render={({ field: { onChange, value } }) =>
                              renderInput(
                                 subField,
                                 onChange,
                                 value,
                                 field.name,
                                 index,
                                 errors,
                                 initialValues,
                                 watchFields,
                              )
                           }
                        />
                        {errors[field.name]?.[index]?.[subField.name] && (
                           <FormHelperText error>
                              {errors[field.name][index][subField.name].message}
                           </FormHelperText>
                        )}
                     </Grid>
                  ))}
                  <Grid item xs={12} sm={6}>
                     <IconButton
                        onClick={() => remove(index)}
                        color="secondary"
                     >
                        <RemoveIcon />
                     </IconButton>
                  </Grid>
               </Grid>
            </Box>
         ))}
         <Button variant="outlined" onClick={() => append({})}>
            <AddIcon /> Add {field.label}
         </Button>
      </Box>
   );
};
