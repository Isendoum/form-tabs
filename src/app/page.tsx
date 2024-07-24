"use client";

import TableMaterial from "@/lib/TableMaterial";
import FormComponent from "@/lib/FormComponent";
import { generateValidationSchema } from "@/lib/utils/validation";
import { smileSchema } from "@/schemas/smileSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getMaterial } from "./api/material/route";
import { Button, Grid } from "@mui/material";
import TableTransaction from "@/lib/TableTransaction";
import { schemaTable } from "@/schemas/transactionTableSchema";
// const fetcher = (url) => fetch(url).then((res) => res.json());

const formName = 'basicForm';

const Home = () => {
   const [initialValues, setInitialValues] = useState({});
   const validationSchema = generateValidationSchema(smileSchema);
   const [materialData, setMaterialData] = useState([]);
   const [selectedMaterial, setSelectedMaterial] = useState([]);
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
   const watchEntityId = watch("entityId");
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

   const handleSelectedRow = (row) => setSelectedMaterial(prev => [...prev, row]);
   const handleDeleteRow = (index) => {
      const newSelectedMaterial = [...selectedMaterial];
      newSelectedMaterial.splice(index, 1);

      setSelectedMaterial(newSelectedMaterial);
   }

   useEffect(() => {
      (async () => {
         if (watchEntityId && watchActivity) {
            try {
               const params = { entity_id: watchEntityId.value, activity_id: watchActivity.value };

               const res = await getMaterial(params);
               setMaterialData(res);
            } catch (e) { }
         }
      })();
   }, [watchEntityId, watchActivity]);

   return (
      <div className="container mx-auto p-4">
         <div className="flex gap-2">
            <div className="flex-1 p-4 border">
               <FormComponent
                  methods={methods}
                  onSubmit={handleFormSubmit}
                  handleSubmit={handleSubmit}
                  schema={smileSchema}
                  watchFields={watchFields}
                  initialValues={initialValues}
                  control={control}
                  errors={errors}
                  hideSubmit
                  formName={formName}
               />
            </div>
            <div className="flex-1 p-4 border">
               <h6>Material</h6>
               {materialData.length === 0 ? <p>Please choose entity and transaction type first</p> : <p>Click on the table column to select the material</p>}
               {materialData.length > 0 && watchEntityId && watchActivity && <TableMaterial data={materialData.filter(x => !selectedMaterial.some(y => y.id === x.id))} handleSelectedRow={handleSelectedRow} />}
            </div>
         </div>
         <div className="flex flex-col border mt-2 p-4">
            <h6>Table Transaction</h6>
            <TableTransaction
               data={selectedMaterial}
               handleDeleteRow={handleDeleteRow}
               schema={schemaTable}
            />
         </div>
         <div className="flex justify-end mt-2 p-4">
            <Button form={formName} type="submit" variant="contained" color="primary">
               Submit
            </Button>
         </div>
      </div>
   );
};

export default Home;
