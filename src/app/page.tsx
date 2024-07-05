"use client";
import Tabs from "@/components/tab";
import JsonSchemaForm from "@/components/forms/JsonSchemaForm";
import UniformsForm from "@/components/forms/UniformsForm";
import JsonFormsComponent from "@/components/forms/JsonForm";
import useSWR from "swr";
import {
   jsonSchemaFormSchema,
   jsonSchemaFormUiSchema,
} from "@/schemas/jsonSchemaFormSchema";
import { jsonSchema, uiSchema } from "@/schemas/jsonformSchema";
import { useEffect, useState } from "react";
const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
   const [jsonSchemaFormschema, setJsonSchemaFormSchema] = useState({});
   const [jsonFormsSchema, setJsonFormsSchema] = useState({});
   const [formData, setFormData] = useState({});
   const { data, error, isLoading } = useSWR(
      "http://localhost:3000/api/countries",
      fetcher,
      {
         revalidateOnFocus: false, // Disable revalidation on window focus
         shouldRetryOnError: false, // Disable retrying on error
      },
   );
   const handleSubmitJsonSchemaForm = ({ formData }) => {
      alert(JSON.stringify(formData, null, 2));
   };

   const handleSubmitJsonFormsComponent = (e: any) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
   };

   useEffect(() => {
      if (data) {
         setJsonSchemaFormSchema(jsonSchemaFormSchema(data.countries));
         setJsonFormsSchema(jsonSchema(data.countries));
      }
   }, [data]);

   const tabContent = [
      {
         label: "JSONSchema Form",
         content: (
            <JsonSchemaForm
               onSubmit={handleSubmitJsonSchemaForm}
               schema={jsonSchemaFormschema}
               schemaUi={jsonSchemaFormUiSchema}
            />
         ),
      },
      {
         label: "Uniforms Form",
         content: <UniformsForm />,
      },
      {
         label: "JSONForms",
         content: (
            <JsonFormsComponent
               schema={jsonFormsSchema}
               uiSchema={uiSchema}
               setData={setFormData}
               data={formData}
               handleSubmit={handleSubmitJsonFormsComponent}
            />
         ),
      },
   ];

   return (
      <div className="container mx-auto p-4">
         {!isLoading && <Tabs tabContent={tabContent} />}
      </div>
   );
};

export default Home;
