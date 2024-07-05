import { FormControl, FormHelperText } from "@mui/material";

const CustomFieldTemplate = (props) => {
   console.log(props.errors);
   const { id, label, help, required, description, errors, children } = props;
   return (
      <FormControl
         fullWidth
         error={errors && errors.length > 0}
         style={{ marginBottom: "1rem" }}
      >
         <label htmlFor={id}>
            {label}
            {required ? "*" : null}
         </label>
         {description}
         {children}
         {errors && errors.length > 0 && (
            <FormHelperText>{errors.join(", ")}</FormHelperText>
         )}
         {help && <FormHelperText>{help}</FormHelperText>}
      </FormControl>
   );
};
export default CustomFieldTemplate;
