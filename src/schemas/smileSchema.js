import { getActivity } from "@/services/activitiesService";
import { getCustomer } from "@/services/customerService";
import { getEntities } from "@/services/entitiesService";
import { getTransactionType } from "@/services/transactionService";
import * as Yup from "yup";

// Define a schema with both sections and simple fields
// Updated configuration with validation schemas
export const smileSchema = {
   fields: [
      {
         name: "entityId",
         label: "Enity name",
         type: "server-autocomplete",
         optionValue: "id",
         optionLabel: "name",
         required: true,
         validation: Yup.string().required("Entity name is required"),
         fetchOptions: () => [{ id: 1, name: "test 1" }],
      },

      {
         name: "transactionType",
         label: "Transaction Type",
         type: "select-fetch",
         optionValue: "id",
         optionLabel: "title",
         required: true,
         validation: Yup.string().required("Transaction type is required"),
         fetchOptions: () => [{ id: 1, title: "test 1" }],
      },
      {
         name: "customer",
         label: "Customer",
         type: "select-fetch",
         optionValue: "id",
         optionLabel: "name",
         required: true,
         visibilityDependencies: [{ field: "transactionType", value: 2 }],
         validation: Yup.string().required("Customer is required"),
         fetchOptions: getCustomer,
         fetchDepedency: "entityId",
      },
      {
         name: "customer",
         label: "Customer",
         type: "select-fetch",
         optionValue: "id",
         optionLabel: "name",
         required: true,
         visibilityDependencies: [{ field: "transactionType", value: 5 }],
         validation: Yup.string().required("Customer is required"),
         fetchOptions: getCustomer,
         fetchDepedency: "entityId",
      },
      {
         name: "activity",
         label: "Activity",
         type: "server-autocomplete",
         optionValue: "id",
         optionLabel: "name",
         required: true,
         validation: Yup.string().required("Activity is required"),
         fetchOptions: () => [{ id: 1, name: "test 1" }],
      },
      {
         name: "spendingDate",
         label: "Spending Date",
         type: "date",
         required: true,
         visibilityDependencies: [{ field: "transactionType", value: 2 }],
         validation: Yup.string().required("Spending Date is required"),
      },
      {
         name: "returnDate",
         label: "Return Date",
         type: "date",
         required: true,
         visibilityDependencies: [{ field: "transactionType", value: 5 }],
         validation: Yup.string().required("Return Date is required"),
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
