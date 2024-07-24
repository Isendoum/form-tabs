"use client";

import List from "@/components/lists/List";
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
               const res = await fetch(
                  `/api/material?entity_id=${watchEntityName?.value}&activity_id=${watchActivity?.value}`,
               );
               const data = await res.json();
               setMaterialData(data.data);
            } catch (e) {}
         }
      })();

      console.log(watchEntityName, watchActivity);
   }, [watchEntityName, watchActivity]);

   return (
      <div className="container mx-auto p-4">
         <div className="flex flex-row gap-2">
            <div className="w-[50%]">
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
            <div className="w-[50%] border border-gray-300">
               <List data={materialData} />
            </div>
         </div>
         <div>table</div>
      </div>
   );
};

export default Home;
