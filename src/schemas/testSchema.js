import * as Yup from "yup";

// Define a schema with both sections and simple fields
// Updated configuration with validation schemas
export const testFormSchema = {
   fields: [
      {
         name: "firstName",
         label: "First Name",
         type: "text",
         required: true,
         validation: Yup.string().required("First Name is required"),
      },
      {
         name: "lastName",
         label: "Last Name",
         type: "text",
         required: true,
         validation: Yup.string().required("Last Name is required"),
      },
      {
         name: "secret",
         label: "Secret",
         type: "text",
         visibilityDependencies: [{ field: "lastName", value: "bond" }],
         required: true,
         validation: Yup.string().when("lastName", {
            is: (value) => value === "bond",
            then: (schema) => schema.required("Test is required"),
            otherwise: (schema) => schema.optional(),
         }),
      },
      {
         name: "country",
         label: "Country",
         optionValue: "id",
         optionLabel: "name",
         type: "select",
         dynamicOptions: {
            url: "/api/countries",
         },
         required: true,
         validation: Yup.string().required("Country is required"),
      },
      {
         name: "addresses",
         label: "Addresses",
         type: "fieldArray",
         fields: [
            {
               name: "street",
               label: "Street",
               type: "text",
               validation: Yup.string().required("Street is required"),
            },
            {
               name: "state",
               label: "State",
               type: "select",
               optionValue: "id",
               optionLabel: "name",
               dynamicOptions: {
                  dependency: "country",
                  url: "/api/states?country=:value",
               },
               required: true,
               visibilityDependencies: [
                  { field: "country", value: 1 },
                  { field: "country", value: 2 },
               ],
               validation: Yup.string().when("country", {
                  is: (value) => value === "1" || value === "2",
                  then: (schema) => schema.required("State is required"),
                  otherwise: (schema) => schema.optional(),
               }),
            },

            {
               name: "city",
               label: "City",
               type: "text",
               validation: Yup.string().required("City is required"),
            },
            {
               name: "zip",
               label: "Zip Code",
               type: "text",
               validation: Yup.string().required("Zip Code is required"),
            },
         ],
         validation: Yup.array().of(
            Yup.object().shape({
               street: Yup.string().required("Street is required"),
               city: Yup.string().required("City is required"),
               zip: Yup.string().required("Zip Code is required"),
            }),
         ),
      },
      // {
      //    name: "state",
      //    label: "State",
      //    type: "select",
      //    optionValue: "id",
      //    optionLabel: "name",
      //    dynamicOptions: {
      //       dependency: "country",
      //       url: "/api/states?country=:value",
      //    },
      //    required: true,
      //    visibilityDependencies: [
      //       { field: "country", value: 1 },
      //       { field: "country", value: 2 },
      //    ],
      //    validation: Yup.string().when("country", {
      //       is: (value) => value === "1" || value === "2",
      //       then: (schema) => schema.required("State is required"),
      //       otherwise: (schema) => schema.optional(),
      //    }),
      // },
      {
         name: "city",
         label: "City",
         type: "server-autocomplete",
         url: "/api/cities?query=",
         optionValue: "id",
         optionLabel: "name",
         // validation: Yup.string().required("City is required"),
      },
      {
         name: "bio",
         label: "Bio",
         type: "textarea",
         validation: Yup.string(),
      },
      {
         name: "dob",
         label: "Date of Birth",
         type: "date",
         validation: Yup.date()
            .typeError("Invalid date")
            .nullable()
            .required("Date of Birth is required"),
      },
      {
         name: "subscribe",
         label: "Subscribe to newsletter",
         type: "checkbox",
         validation: Yup.boolean(),
      },
      {
         name: "terms",
         label: "Accept Terms",
         type: "switch",
         required: true,
         validation: Yup.boolean()
            .oneOf([true], "You must accept the terms")
            .required("Terms are required"),
      },
   ],
};
