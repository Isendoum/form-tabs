import React, { useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
} from "@mui/material";
import ServerAutocomplete from "./components/ServerAutocomplete";
import { generateValidationSchema } from "./utils/validation";
import DynamicSelect from "./components/DynamicSelect";

const FormComponent = ({ schema, onSubmit, initialValues }) => {
   const validationSchema = generateValidationSchema(schema);
   const methods = useForm({
      defaultValues: initialValues,
      resolver: yupResolver(validationSchema),
   });
   const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
   } = methods;
   useEffect(() => {
      console.log("FormComponent rendered");
   }, []);

   const watchFields = watch();

   const isFieldVisible = (field) => {
      if (!field.visibilityDependencies) return true;
      return field.visibilityDependencies.some(
         (dep) => watchFields[dep.field] === dep.value,
      );
   };

   const renderInput = (field, onChange, value) => {
      if (!isFieldVisible(field)) return null;

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
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
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
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
               />
            );
         case "select":
            if (field.dynamicOptions) {
               return (
                  <DynamicSelect
                     name={field.name}
                     label={field.label}
                     dependency={field.dynamicOptions.dependency}
                     url={field.dynamicOptions.url}
                     validation={field.validation}
                     initialValue={initialValues[field.name]}
                     optionValue={field.optionValue}
                     optionLabel={field.optionLabel}
                  />
               );
            } else {
               return (
                  <FormControl
                     variant="outlined"
                     fullWidth
                     error={!!errors[field.name]}
                  >
                     <InputLabel>{field.label}</InputLabel>
                     <Select
                        value={value}
                        onChange={onChange}
                        label={field.label}
                     >
                        {field.options.map((option, index) => (
                           <MenuItem key={index} value={option.value}>
                              {option.label}
                           </MenuItem>
                        ))}
                     </Select>
                     <FormHelperText>
                        {errors[field.name]?.message}
                     </FormHelperText>
                  </FormControl>
               );
            }
         case "checkbox":
            return (
               <div>
                  <FormControlLabel
                     control={<Checkbox checked={value} onChange={onChange} />}
                     label={field.label}
                  />
                  <FormHelperText className="text-red-500">
                     {errors[field.name]?.message}
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
                     {errors[field.name]?.message}
                  </FormHelperText>
               </div>
            );
         case "slider":
            return (
               <FormControl fullWidth>
                  <Typography gutterBottom>{field.label}</Typography>
                  <Slider
                     value={
                        typeof value === "number" ? value : field.defaultValue
                     }
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
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
               />
            );
         case "radio":
            return (
               <FormControl component="fieldset" error={!!errors[field.name]}>
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
                  <FormHelperText>{errors[field.name]?.message}</FormHelperText>
               </FormControl>
            );
         case "autocomplete":
            return (
               <Autocomplete
                  options={field.options}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, newValue) => {
                     onChange(newValue ? newValue.value : "");
                  }}
                  renderInput={(params) => (
                     <TextField
                        {...params}
                        label={field.label}
                        variant="outlined"
                        error={!!errors[field.name]}
                        helperText={errors[field.name]?.message}
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
                     onChange={(e) => {
                        onChange(e.target.files[0]);
                     }}
                  />
               </Button>
            );
         default:
            return null;
      }
   };

   const renderRow = (row, orientation, columns) => {
      const columnWidth = Math.floor(12 / columns);

      return (
         <Grid
            container
            spacing={2}
            direction={orientation === "horizontal" ? "row" : "column"}
         >
            {row.fields.map((field, index) => {
               if (!isFieldVisible(field)) return null; // Conditionally render the entire Grid item
               return (
                  <Grid
                     item
                     xs={12}
                     sm={orientation === "horizontal" ? columnWidth : 12}
                     key={index}
                  >
                     <Controller
                        name={field.name}
                        control={control}
                        defaultValue={
                           field.type === "checkbox" || field.type === "switch"
                              ? false
                              : ""
                        }
                        render={({ field: { onChange, value } }) =>
                           renderInput(field, onChange, value)
                        }
                     />
                  </Grid>
               );
            })}
         </Grid>
      );
   };

   const renderSection = (section) => (
      <Box key={section.title} mb={4}>
         <Typography variant="h6" gutterBottom>
            {section.title}
         </Typography>
         {section.rows.map((row, index) => (
            <Box mb={2} key={index}>
               {renderRow(row, section.orientation, section.columns)}
            </Box>
         ))}
      </Box>
   );

   return (
      <FormProvider {...methods}>
         <form onSubmit={handleSubmit(onSubmit)}>
            {schema.fields && schema.fields.length > 0 && (
               <Grid container spacing={2}>
                  {schema.fields.map((field, index) => {
                     if (!isFieldVisible(field)) return null; // Conditionally render the entire Grid item
                     return (
                        <Grid item xs={12} key={index}>
                           <Controller
                              name={field.name}
                              control={control}
                              defaultValue={
                                 field.type === "checkbox" ||
                                 field.type === "switch"
                                    ? false
                                    : ""
                              }
                              render={({ field: { onChange, value } }) =>
                                 renderInput(field, onChange, value)
                              }
                           />
                        </Grid>
                     );
                  })}
               </Grid>
            )}

            {schema?.sections &&
               schema?.sections.map((section) => renderSection(section))}

            <Grid item xs={12} className="mt-4 float-right">
               <Button type="submit" variant="contained" color="primary">
                  Submit
               </Button>
            </Grid>
         </form>
      </FormProvider>
   );
};

export default FormComponent;
