import * as Yup from "yup";

export const generateValidationSchema = (config) => {
   const schemaFields = {};

   const addFieldsToSchema = (fields) => {
      fields.forEach((field) => {
         if (field.validation) {
            schemaFields[field.name] = field.validation;
         }
      });
   };

   // Add standalone fields to schema
   addFieldsToSchema(config.fields);

   if (config?.sections) {
      config?.sections.forEach((section) => {
         section.rows.forEach((row) => {
            addFieldsToSchema(row.fields);
         });
      });
   }
   // Add fields from sections to schema

   return Yup.object().shape(schemaFields);
};
