export const jsonSchemaFormSchema = (countries) => {
   const countriesArray = countries
      ? countries.map((country) => country.name)
      : [];
   return {
      title: "JSONSchema Form",
      type: "object",
      properties: {
         personalInfo: {
            type: "object",
            title: "Personal Info",
            properties: {
               firstName: {
                  type: "string",
                  title: "First Name",
                  maxLength: 10,
               },
               lastName: { type: "string", title: "Last Name" },
               age: { type: "number", title: "Age", minimum: 18 },
            },
            required: ["firstName", "lastName"],
         },
         contactInfo: {
            type: "object",
            title: "Contact Info",
            properties: {
               email: { type: "string", title: "Email" },
               phone: { type: "string", title: "Phone" },
            },
            required: ["email"],
         },
         locationInfo: {
            type: "object",
            title: "Location Info",
            properties: {
               country: {
                  type: "string",
                  title: "Country",
                  enum: countriesArray,
               },
            },
            required: ["country"],
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
                              enum: countriesArray.filter((c) => c !== "USA"),
                           },
                        },
                     },
                  ],
               },
            },
         },
      },
   };
};

export const jsonSchemaFormUiSchema = {
   personalInfo: {
      firstName: {
         "ui:widget": "text",
         "ui:options": {
            inputType: "text",
            showErrors: true,
         },
      },
      lastName: {
         "ui:widget": "text",
         "ui:options": {
            inputType: "text",
            showErrors: true,
         },
      },
      age: {
         "ui:widget": "updown",
         "ui:options": {
            inputType: "number",
            showErrors: true,
         },
      },
   },
   contactInfo: {
      email: {
         "ui:widget": "email",
         "ui:options": {
            inputType: "email",
            showErrors: true,
         },
      },
      phone: {
         "ui:options": {
            inputType: "tel",
            showErrors: true,
         },
      },
   },
   locationInfo: {
      country: {
         "ui:widget": "AutocompleteWidget",
         "ui:options": {
            showErrors: true,
         },
      },
      state: {
         "ui:widget": "text",
         "ui:options": {
            showErrors: true,
         },
      },
   },
};
