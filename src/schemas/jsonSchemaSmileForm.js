import MuiGridLayoutTemplate from "@/components/widgets/MuiGridLayoutTemplate";

export const smileFormSchema = {
   title: "Smile form prototype",
   type: "object",
   properties: {
      entityName: {
         type: "string",
         title: "Entity Name",
      },
      transactionType: {
         type: "string",
         title: "Transaction Type",
      },
      activity: {
         type: "string",
         title: "Activity",
      },
   },
   dependencies: {
      transactionType: {
         oneOf: [
            {
               properties: {
                  transactionType: { enum: ["USA"] },
                  customerEntity: { type: "string", title: "Customer Entity" },
               },
               required: ["customerEntity"],
            },
            {
               properties: {
                  transactionType: {
                     enum: ["Other"],
                  },
               },
            },
         ],
      },
   },
   required: [
      "entityName",
      "transactionType",
      "activity",
      "lastName",
      "birthDate",
   ],
};

export const smileFormUiSchema = {
   "ui:ObjectFieldTemplate": MuiGridLayoutTemplate,
   "ui:grid": [
      { entityName: 12 }, // here we setup the sizes for each row
      { transactionType: 12 },
      { customerEntity: 12 },
      { activity: 12 },
   ],
   entityName: {
      "ui:widget": "DynamicSelectWidget", // declare custom widget
      "ui:options": { fetchUrl: "/api/countries", showErrors: true }, // add url to fetch data
   },
   transactionType: {
      "ui:widget": "DynamicSelectWidget", // declare custom widget
      "ui:options": { fetchUrl: "/api/countries", showErrors: true }, // add url to fetch data
   },
   activity: {
      "ui:widget": "DynamicSelectWidget", // declare custom widget
      "ui:options": { fetchUrl: "/api/countries", showErrors: true }, // add url to fetch data
   },
   arrayOfConditionals: {
      items: {
         customerEntity: {
            "ui:widget": "DynamicSelectWidget", // declare custom widget
            "ui:options": { fetchUrl: "/api/countries", showErrors: true },
         },
      },
   },
   customerEntity: {
      "ui:widget": "DynamicSelectWidget", // declare custom widget
      "ui:options": { fetchUrl: "/api/countries", showErrors: true },
   },
};
