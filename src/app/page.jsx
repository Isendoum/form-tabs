"use client";

import FormComponent from "@/lib/FormComponent";
import { generateValidationSchema } from "@/lib/utils/validation";
import { smileSchema, updateSmileSchema } from "@/schemas/smileSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { schemaTableMUI as initialSchemaTableMUI } from "@/schemas/transactionTableSchema";
import GenericTable from "@/lib/GenericTable";
import {
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
} from "@mui/material";

const Home = () => {
   const [initialUpdateFormValues, setInitialUpdateFormValues] = useState({});
   const updateFormvValidationSchema = useMemo(
      () => generateValidationSchema(updateSmileSchema),
      [],
   );
   const [materialData, setMaterialData] = useState([]);
   const [selectedMaterial, setSelectedMaterial] = useState([]);
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const [selectedTableRow, setSelectedTableRow] = useState(null);
   const [schemaTableMUI, setSchemaTableMUI] = useState(() => [
      ...initialSchemaTableMUI,
      {
         headerName: "Actions",
         field: "actions",
         type: "actions",
         flex: 1,
         getActions: (params) => [
            <button onClick={() => selectRowAndOpenDeleteModal(params)}>
               Delete
            </button>,
            <button onClick={() => selectRowAndOpenUpdateModal(params)}>
               Update
            </button>,
         ],
      },
   ]);

   //filter form intialization
   const filters = useForm();

   const {
      control,
      watch,
      formState: { errors },
   } = filters;

   //update form intialization
   const updateForm = useForm({
      defaultValues: initialUpdateFormValues,
      resolver: yupResolver(updateFormvValidationSchema),
   });

   const {
      control: updateFormControl,
      handleSubmit: handleUpdateFormSubmitHook,
      watch: watchUpdateForm,
      formState: { errors: updateFormErrors },
      reset: resetUpdateForm,
   } = updateForm;

   // Watch all field changes. This is needed for renderer to be able to apply conditional logic
   // based on field values. We can also use to it to apply custom logic based on field values,
   // such as network requests when the user fills 2 of the 3 fields in the form.
   const watchFields = watch();
   const watchUpdateFormFields = watchUpdateForm();

   // action for the table visible on last column
   const selectRowAndOpenUpdateModal = useCallback(
      (params) => {
         setSelectedTableRow(params);
         setInitialUpdateFormValues(params.row);
         resetUpdateForm(params.row);
         setIsEditModalOpen(true);
      },
      [resetUpdateForm],
   );

   // action for the table visible on last column
   const selectRowAndOpenDeleteModal = useCallback((params) => {
      setSelectedTableRow(params);
      setIsDeleteModalOpen(true);
   }, []);

   // here is the code to update the date on the server
   const handleUpdateFormSubmit = useCallback((data) => {
      // const formData = new FormData();
      // formData.append("Picture", data.profilePicture);
      // formData.append("Rest", JSON.stringify(data, null, 2));

      // const formDataEntries = [];
      // formData.forEach((value, key) => {
      //    formDataEntries.push(`${key}: ${value}`);
      // });
      // const formDataString = formDataEntries.join("\n");

      // console.log(formData);
      // alert(formDataString);
      setSelectedMaterial((prev) => {
         // Filter out the old item and add the updated item
         const updatedMaterials = prev.filter((obj) => obj.id !== data.id);
         return [...updatedMaterials, data];
      });
      setIsEditModalOpen(false); // Close the modal after update
   }, []);

   // This will be used to give some action to row click of a table
   const handleSelectedRowUpperTable = useCallback((row) => {
      // Here we could do a network call to fetch the data for the main table
      setSelectedMaterial([{ id: 1, no: 1, activity: "Activity 1" }]);
   }, []);

   // this handles the Main table delete row action
   const handleDeleteMainTableRow = useCallback((index) => {
      setSelectedMaterial((prev) => prev.filter((obj) => obj.id !== index));
      setIsDeleteModalOpen(false);
      setSelectedTableRow(null);
   }, []);

   // useEffect to get fetch the data.
   useEffect(() => {
      const fetchMaterialData = async () => {
         if (watchFields.entityId && watchFields.activity) {
            try {
               setMaterialData([
                  { id: 1, materialName: "Test 1", availableStock: 200 },
               ]);
            } catch (e) {
               console.error(e);
            }
         }
      };

      fetchMaterialData();
   }, [watchFields.entityId, watchFields.activity]);

   return (
      <div className="container mx-auto p-4">
         <div className="flex flex-row gap-2">
            <div className="w-[50%]">
               {/* filters form */}
               <FormComponent
                  methods={filters}
                  schema={smileSchema}
                  watchFields={watchFields}
                  control={control}
                  errors={errors}
                  hideSubmit
                  formName={"basicForm"}
               />
            </div>
            <div className="w-[50%] border border-gray-300">
               <GenericTable
                  data={materialData}
                  onRowClick={handleSelectedRowUpperTable}
                  columnsSchema={[
                     { field: "materialName", headerName: "Name", flex: 1 },
                     {
                        field: "availableStock",
                        headerName: "Available Stock",
                        flex: 1,
                     },
                  ]}
               />
            </div>
         </div>
         <div className="flex flex-col border mt-2 p-4">
            {schemaTableMUI && schemaTableMUI.length > 0 && (
               <GenericTable
                  tableTitle={"Transactions table"}
                  data={selectedMaterial}
                  columnsSchema={schemaTableMUI}
               />
            )}
         </div>
         {/* This is the update dialog with a form and submit for update */}
         <Dialog
            open={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            fullWidth
         >
            <DialogTitle>Update</DialogTitle>
            <DialogContent>
               <FormComponent
                  methods={updateForm}
                  onSubmit={handleUpdateFormSubmit}
                  handleSubmit={handleUpdateFormSubmitHook}
                  schema={updateSmileSchema}
                  watchFields={watchUpdateFormFields}
                  initialValues={initialUpdateFormValues}
                  control={updateFormControl}
                  errors={updateFormErrors}
                  formName={"updateForm"}
               />
            </DialogContent>
         </Dialog>
         {/* This is the delete dialog a simple as it can be */}
         {initialUpdateFormValues && (
            <Dialog
               open={isDeleteModalOpen}
               onClose={() => setIsDeleteModalOpen(false)}
               fullWidth
            >
               <DialogTitle>Delete</DialogTitle>
               <DialogContent>
                  <div>
                     Are you sure you want to delete row with id:{" "}
                     {initialUpdateFormValues?.id}
                  </div>
               </DialogContent>
               <DialogActions className="">
                  <button
                     className="bg-red-600 rounded px-2 text-white"
                     onClick={() =>
                        handleDeleteMainTableRow(selectedTableRow?.id)
                     }
                  >
                     Delete
                  </button>
                  <button
                     className="bg-black rounded px-2 text-white"
                     onClick={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedTableRow(null);
                     }}
                  >
                     Cancel
                  </button>
               </DialogActions>
            </Dialog>
         )}
      </div>
   );
};

export default Home;
