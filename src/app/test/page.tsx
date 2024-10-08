"use client";
// import Tabs from "@/components/tab";
import JsonSchemaForm from "@/components/forms/JsonSchemaForm";
import useSWR from "swr";
import {
   jsonSchemaFormSchema,
   jsonSchemaFormUiSchema,
   transformErrors,
} from "@/schemas/jsonSchemaFormSchema";
import {
   smileFormSchema,
   smileFormUiSchema,
} from "@/schemas/jsonSchemaSmileForm";
// import { useEffect, useState } from "react";
// import FormComponent from "@/lib/FormComponent";
// import { formSchema, validationSchema } from "@/schemas/reactHookSchema";
// const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
   // const [jsonSchemaFormschema, setJsonSchemaFormSchema] = useState({});
   // const {
   //    data: serverData,
   //    error,
   //    isLoading,
   // } = useSWR("http://localhost:3000/api/options", fetcher, {
   //    revalidateOnFocus: false, // Disable revalidation on window focus
   //    shouldRetryOnError: false, // Disable retrying on error
   // });

   // submit for JsonSchemaForm
   const handleSubmitJsonSchemaForm = (props) => {
      alert(JSON.stringify(props.formData, null, 2));
   };

   //submit for react hook forms
   // const handleFormSubmit = (data) => {
   //    const formData = new FormData();
   //    formData.append("Picture", data.profilePicture);
   //    formData.append("Rest", JSON.stringify(data, null, 2));

   //    // Construct a string representation of formData
   //    const formDataEntries = [];
   //    formData.forEach((value, key) => {
   //       formDataEntries.push(`${key}: ${value}`);
   //    });
   //    const formDataString = formDataEntries.join("\n");

   //    console.log(formData);
   //    alert(formDataString);
   // };

   return (
      <div className="container mx-auto p-4">
         <JsonSchemaForm
            transformErrors={transformErrors}
            onSubmit={handleSubmitJsonSchemaForm}
            schema={jsonSchemaFormSchema}
            schemaUi={jsonSchemaFormUiSchema}
         />
      </div>
   );
};

export default Home;
