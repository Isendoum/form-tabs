import Ajv from "ajv";
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";

// Create the Ajv instance
const ajv = new Ajv({
   allErrors: true,
   useDefaults: true,
});
ajv.addKeyword("uniforms");

function createValidator(schema) {
   const validator = ajv.compile(schema);

   return (model) => {
      validator(model);
      return validator.errors?.length ? { details: validator.errors } : null;
   };
}
// Define the schema
const schema = {
   title: "Uniforms Form",
   type: "object",
   properties: {
      personalInfo: {
         type: "object",
         title: "Personal Info",
         properties: {
            firstName: { type: "string", title: "First Name" },
            lastName: { type: "string", title: "Last Name" },
            age: {
               type: "number",
               title: "Age",
               type: "integer",
               minimum: 18,
               maximum: 100,
            },
         },
      },
      contactInfo: {
         type: "object",
         title: "Contact Info",
         properties: {
            email: { type: "string", title: "Email" },
            phone: { type: "string", title: "Phone" },
         },
      },
   },
   required: ["firstName", "lastName", "email"],
};

const validator = createValidator(schema);

// Create the JSONSchemaBridge instance correctly
export const bridge = new JSONSchemaBridge({ schema, validator });
