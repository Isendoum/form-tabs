export const jsonSchema = (countries) => {
   const countriesEnum = countries
      ? countries.map((country) => country.name)
      : [];
   return {
      type: "object",
      properties: {
         personalInfo: {
            type: "object",
            required: ["firstName", "lastName"],
            properties: {
               firstName: { type: "string", title: "First Name" },
               lastName: { type: "string", title: "Last Name" },
               dateOfBirth: {
                  type: "string",
                  format: "date",
                  title: "Date of Birth",
               },
            },
         },
         contactInfo: {
            type: "object",
            required: ["email", "phone"],
            properties: {
               email: { type: "string", format: "email", title: "Email" },
               phone: { type: "string", title: "Phone" },
               address: { type: "string", title: "Address" },
            },
         },
         location: {
            type: "object",
            properties: {
               country: {
                  type: "string",
                  enum: countriesEnum,
               },
               state: {
                  type: "string",
                  format: "autocomplete",
                  enum: ["Option 1", "Option 2", "Option 3"],
                  title: "State",
               },
            },
         },
      },
   };
};

export const uiSchema = {
   type: "VerticalLayout",
   elements: [
      {
         type: "Group",
         label: "Personal Information",
         elements: [
            {
               type: "Control",
               scope: "#/properties/personalInfo/properties/firstName",
            },
            {
               type: "Control",
               scope: "#/properties/personalInfo/properties/lastName",
            },
            {
               type: "Control",
               scope: "#/properties/personalInfo/properties/dateOfBirth",
            },
         ],
      },
      {
         type: "Group",
         label: "Contact Information",
         elements: [
            {
               type: "Control",
               scope: "#/properties/contactInfo/properties/email",
            },
            {
               type: "Control",
               scope: "#/properties/contactInfo/properties/phone",
            },
            {
               type: "Control",
               scope: "#/properties/contactInfo/properties/address",
            },
         ],
      },
      {
         type: "Group",
         label: "Location",
         elements: [
            {
               type: "Control",
               scope: "#/properties/location/properties/country",
            },
            {
               type: "Control",
               scope: "#/properties/location/properties/state",
               rule: {
                  effect: "SHOW",
                  condition: {
                     scope: "#/properties/location/properties/country",
                     schema: {
                        enum: ["USA"],
                     },
                  },
               },
            },
         ],
      },
   ],
};
