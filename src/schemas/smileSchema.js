import * as Yup from "yup";

// Define a schema with both sections and simple fields
// Updated configuration with validation schemas
export const smileSchema = {
   fields: [
      {
         name: "entityName",
         label: "Enity name",
         type: "server-autocomplete",
         url: "/api/entities?keyword=",
         optionValue: "id",
         optionLabel: "name",
         required: true,
         validation: Yup.string().required("First Name is required"),
      },

      {
         name: "transactionType",
         label: "Transaction Type",
         type: "select",
         optionValue: "id",
         optionLabel: "name",
         required: true,
         options: [{ id: 1, name: "Add Stock" }],
         validation: Yup.string().required("Last Name is required"),
      },
      {
         name: "activity",
         label: "Activity",
         type: "text",
         type: "server-autocomplete",
         url: "/api/activities?keyword=",
         optionValue: "id",
         optionLabel: "name",
         required: true,
         validation: Yup.string().required("First Name is required"),
      },
      // {
      //    name: "country",
      //    label: "Country",
      //    optionValue: "id",
      //    optionLabel: "name",
      //    type: "select",
      //    dynamicOptions: {
      //       url: "/api/countries",
      //    },
      //    required: true,
      //    validation: Yup.string().required("Country is required"),
      // },
      //   {
      //      name: "addresses",
      //      label: "Addresses",
      //      type: "fieldArray",
      //      fields: [
      //         {
      //            name: "street",
      //            label: "Street",
      //            type: "text",
      //            validation: Yup.string().required("Street is required"),
      //         },
      //         {
      //            name: "country",
      //            label: "Country",
      //            optionValue: "id",
      //            optionLabel: "name",
      //            type: "select",
      //            dynamicOptions: {
      //               url: "/api/countries",
      //            },
      //            required: true,
      //            validation: Yup.string().required("Country is required"),
      //         },
      //         // {
      //         //    name: "state",
      //         //    label: "State",
      //         //    type: "select",
      //         //    optionValue: "id",
      //         //    optionLabel: "name",
      //         //    dynamicOptions: {
      //         //       dependency: "country",
      //         //       url: "/api/states?country=:value",
      //         //    },
      //         //    required: true,
      //         //    visibilityDependencies: [
      //         //       { field: "country", value: 1 },
      //         //       { field: "country", value: 2 },
      //         //    ],
      //         //    validation: Yup.string().when("country", {
      //         //       is: (value) => value === "1" || value === "2",
      //         //       then: (schema) => schema.required("State is required"),
      //         //       otherwise: (schema) => schema.optional(),
      //         //    }),
      //         // },

      //         {
      //            name: "state",
      //            label: "State",
      //            type: "select",
      //            optionValue: "id",
      //            optionLabel: "name",
      //            dynamicOptions: {
      //               dependency: "addresses.country",
      //               url: "/api/states?country=:value",
      //            },
      //            required: true,
      //            visibilityDependencies: [
      //               { field: "addresses.country", value: 1 },
      //               { field: "addresses.country", value: 2 },
      //            ],
      //            validation: Yup.string().when("country", {
      //               is: (value) => value === "1" || value === "2",
      //               then: (schema) => schema.required("State is required"),
      //               otherwise: (schema) => schema.optional(),
      //            }),
      //         },

      //         {
      //            name: "city",
      //            label: "City",
      //            type: "text",
      //            validation: Yup.string().required("City is required"),
      //         },
      //         {
      //            name: "zip",
      //            label: "Zip Code",
      //            type: "text",
      //            validation: Yup.string().required("Zip Code is required"),
      //         },
      //      ],
      //      validation: Yup.array().of(
      //         Yup.object().shape({
      //            state: Yup.string().required("State is required"),
      //            street: Yup.string().required("Street is required"),
      //            city: Yup.string().required("City is required"),
      //            zip: Yup.string().required("Zip Code is required"),
      //         }),
      //      ),
      //   },
   ],
};
