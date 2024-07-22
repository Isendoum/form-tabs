"use client";

import FormComponent from "@/lib/FormComponent";
import { generateValidationSchema } from "@/lib/utils/validation";
import { smileSchema } from "@/schemas/smileSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
   const [initialValues, setInitialValues] = useState({});
   const validationSchema = generateValidationSchema(smileSchema);
   const [materialData, setMaterialData] = useState([]);
   const methods = useForm({
      defaultValues: initialValues,
      resolver: yupResolver(validationSchema),
   });
   const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
      setValue,
   } = methods;

   const watchFields = watch();
   const watchEntityName = watch("entityName");
   const watchActivity = watch("activity");
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

   useEffect(() => {
      (async () => {
         if (watchEntityName && watchActivity) {
            try {
               const res = await fetch("/api/material");
               const data = await res.json();
               setMaterialData(data.data);
            } catch (e) {}
         }
      })();

      console.log(watchEntityName, watchActivity);
   }, [watchEntityName, watchActivity]);

   return (
      <div className="container mx-auto p-4">
         <div className="flex flex-col">
            <div>
               <FormComponent
                  methods={methods}
                  onSubmit={handleFormSubmit}
                  handleSubmit={handleSubmit}
                  schema={smileSchema}
                  watchFields={watchFields}
                  initialValues={initialValues}
                  control={control}
                  errors={errors}
               />
            </div>
            <div>
               List
               {materialData.map((obj) => (
                  <div>{obj.materialName}</div>
               ))}
            </div>
         </div>
         <div>table</div>
      </div>
   );
};

export default Home;
