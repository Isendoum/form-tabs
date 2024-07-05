"use client";
import { AutoForm } from "uniforms-mui";
import { bridge as schema } from "@/schemas/uniformSchema";

const UniformsForm = () => {
   const onSubmit = (data) =>
      console.log("Data submitted: ", JSON.stringify(data, null, 2));

   return (
      <div className="p-4">
         <AutoForm schema={schema} onChange={() => null} onSubmit={onSubmit} />
      </div>
   );
};

export default UniformsForm;
