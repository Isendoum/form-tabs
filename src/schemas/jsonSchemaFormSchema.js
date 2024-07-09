import MuiGridLayoutTemplate from "@/components/widgets/MuiGridLayoutTemplate";

export const jsonSchemaFormSchema = {
   title: "JSONSchema Form",
   type: "object",
   properties: {
      firstName: {
         type: "string",
         title: "First Name",
         minLength: 3,
         maxLength: 20,
      },
      lastName: {
         type: "string",
         title: "Last Name",
         minLength: 3,
         maxLength: 20,
      },
      age: { type: "number", title: "Age", minimum: 18, maximum: 115 },
      birthDate: {
         title: "Birth Date",
         type: "string",
         format: "date",
      },

      email: { type: "string", title: "Email" },
      phone: { type: "string", title: "Phone" },

      country: {
         type: "string",
         title: "Country",
      },
   },
   dependencies: {
      country: {
         oneOf: [
            {
               properties: {
                  country: { enum: ["USA"] },
                  state: { type: "string", title: "State" },
               },
               required: ["state"],
            },
            {
               properties: {
                  country: {
                     enum: ["Other"],
                  },
               },
            },
         ],
      },
   },
   required: ["email", "country", "firstName", "lastName", "birthDate"],
};

export const jsonSchemaFormUiSchema = {
   "ui:ObjectFieldTemplate": MuiGridLayoutTemplate, // this custom component is used as a template to be able to render inline fields
   "ui:grid": [
      { firstName: 6, lastName: 6 }, // here we setup the sizes for each row
      { age: 4, birthDate: 4, email: 4 },
      { phone: 4, country: 4, state: 4 },
   ],
   firstName: {
      "ui:widget": "text",
      "ui:options": { inputType: "text", showErrors: true },
   },
   lastName: {
      "ui:widget": "text",
      "ui:options": { inputType: "text", showErrors: true },
   },
   age: {
      "ui:widget": "updown",
      "ui:options": { inputType: "number", showErrors: true },
   },
   birthDate: {
      "ui:widget": "date",
      "ui:options": { inputType: "date", showErrors: true },
   },
   email: {
      "ui:widget": "email",
      "ui:options": { inputType: "email", showErrors: true },
   },
   phone: { "ui:options": { inputType: "tel", showErrors: true } },
   country: {
      "ui:widget": "DynamicSelectWidget", // declare custom widget
      "ui:options": { fetchUrl: "/api/countries", showErrors: true }, // add url to fetch data
   },
   arrayOfConditionals: {
      items: {
         state: {
            "ui:widget": "text",
         },
      },
   },
   state: { "ui:widget": "text", "ui:options": { showErrors: true } },
};

export const transformErrors = (errors) => {
   return errors.map((error) => {
      if (error.name === "maxLength") {
         error.message =
            "Must be less than " + error?.params.limit + " characters";
      }
      if (error.name === "minLength") {
         error.message =
            "Must be more than " + error?.params.limit + " characters";
      }
      if (error.name === "required") {
         error.message = "Field is required*";
      }
      return error;
   });
};
