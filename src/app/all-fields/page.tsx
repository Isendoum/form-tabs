"use client";

import FormComponent from "@/lib/FormComponent";
import { formSchema } from "@/schemas/reactHookSchema";

import { useState } from "react";
// const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
   const [initialValues, setInitialValues] = useState({});
   // submit for react hook forms
   const handleFormSubmit = (data) => {
      const formData = new FormData();
      formData.append("Picture", data.profilePicture);
      formData.append("Rest", JSON.stringify(data, null, 2));

      // Construct a string representation of formData
      const formDataEntries = [];
      formData.forEach((value, key) => {
         formDataEntries.push(`${key}: ${value}`);
      });
      const formDataString = formDataEntries.join("\n");

      console.log(formData);
      alert(formDataString);
   };

   return (
      <div className="container mx-auto p-4">
         {/* <FormComponent
            onSubmit={handleFormSubmit}
            schema={formSchema}
            initialValues={initialValues}
         /> */}
      </div>
   );
};

export default Home;
