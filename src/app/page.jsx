"use client";

import List from "@/components/lists/List";
import FormComponent from "@/lib/FormComponent";
import { generateValidationSchema } from "@/lib/utils/validation";
import { smileSchema } from "@/schemas/smileSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import TableTransaction from "@/lib/TableTransaction";
import { schemaTable } from "@/schemas/transactionTableSchema";
import { effect, signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

const formName = "basicForm";

const initialValuesSignal = signal({});
const materialDataSignal = signal([]);
const selectedMaterialSignal = signal([]);
const watchFieldsIdSignal = signal(null);
const watchEntityIdSignal = signal(null);
const watchActivitySignal = signal(null);

effect(() => {
   (async () => {
      if (watchEntityIdSignal.value && watchActivitySignal.value) {
         try {
            materialDataSignal.value = [
               { id: 1, materialName: "Test 1", availableStock: 200 },
               { id: 2, materialName: "Test 2", availableStock: 300 },
            ];
         } catch (e) {}
      } else {
         materialDataSignal.value = [];
         selectedMaterialSignal.value = [];
      }
   })();
});

const Home = () => {
   useSignals();
   const validationSchema = generateValidationSchema(smileSchema);

   const methods = useForm({
      defaultValues: initialValuesSignal.value,
      resolver: yupResolver(validationSchema),
   });
   const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
      setValue,
   } = methods;

   watchFieldsIdSignal.value = watch();
   watchEntityIdSignal.value = watch("entityId");
   watchActivitySignal.value = watch("activity");

   const handleFormSubmit = (data) => {
      const formData = new FormData();
      formData.append("Picture", data.profilePicture);
      formData.append("Rest", JSON.stringify(data, null, 2));

      const formDataEntries = [];
      formData.forEach((value, key) => {
         formDataEntries.push(`${key}: ${value}`);
      });
      const formDataString = formDataEntries.join("\n");
      alert(formDataString);
   };

   const handleSelectedRow = (row) => {
      selectedMaterialSignal.value = [
         { id: 1, material: { name: "Test 1", code: 1 } },
         { id: 2, material: { name: "Test 2", code: 2 } },
      ].filter((obj) => row.materialName === obj.material.name);
   };

   const handleDeleteRow = (index) => {
      const newSelectedMaterial = [...selectedMaterialSignal.value];
      newSelectedMaterial.splice(index, 1);
      selectedMaterialSignal.value = newSelectedMaterial;
   };

   return (
      <div className="container mx-auto p-4">
         <div className="flex flex-row gap-2">
            <div className="w-[50%]">
               <FormComponent
                  methods={methods}
                  onSubmit={handleFormSubmit}
                  handleSubmit={handleSubmit}
                  schema={smileSchema}
                  watchFields={watchFieldsIdSignal.value}
                  initialValues={initialValuesSignal.value}
                  control={control}
                  errors={errors}
                  hideSubmit
                  formName={formName}
               />
            </div>
            <div className="w-[50%] border border-gray-300">
               <List
                  data={materialDataSignal.value}
                  handleSelectedRow={handleSelectedRow}
               />
            </div>
         </div>
         {selectedMaterialSignal.value.length > 0 && (
            <div className="flex flex-col border mt-2 p-4">
               <h6>Table Transaction</h6>
               <TableTransaction
                  data={selectedMaterialSignal.value}
                  handleDeleteRow={handleDeleteRow}
                  schema={schemaTable}
               />
            </div>
         )}
      </div>
   );
};

export default Home;
