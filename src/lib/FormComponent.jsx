import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, IconButton } from "@mui/material";

import { generateValidationSchema } from "./utils/validation";
import {
   isFieldVisible,
   renderFieldArray,
   renderInput,
   renderSection,
} from "./utils/renderer";

const FormComponent = ({
   schema,
   onSubmit,
   initialValues,
   methods,
   watchFields,
   handleSubmit,
   control,
   errors,
   formName,
   hideSubmit,
}) => {
   return (
      <FormProvider {...methods}>
         <form
            onSubmit={handleSubmit && onSubmit ? handleSubmit(onSubmit) : null}
            id={formName}
         >
            {schema.fields && schema.fields.length > 0 && (
               <Grid container spacing={2}>
                  {schema.fields.map((field, index) => {
                     if (field.type === "fieldArray") {
                        return (
                           <Grid item xs={12} key={index}>
                              {renderFieldArray(
                                 field,
                                 control,
                                 errors,
                                 initialValues,
                                 watchFields,
                              )}
                           </Grid>
                        );
                     }
                     if (!isFieldVisible(field, watchFields)) return null;
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
                                 renderInput(
                                    field,
                                    onChange,
                                    value,
                                    undefined,
                                    undefined,
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
            )}

            {schema?.sections &&
               schema?.sections.map((section) => renderSection(section))}

            {!hideSubmit && (
               <Grid item xs={12} className="mt-4 float-right">
                  <Button type="submit" variant="contained" color="primary">
                     Submit
                  </Button>
               </Grid>
            )}
         </form>
      </FormProvider>
   );
};

export default FormComponent;
