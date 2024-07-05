import { JsonForms } from "@jsonforms/react";
import {
   materialRenderers,
   materialCells,
} from "@jsonforms/material-renderers";
import AutocompleteRenderer from "@/components/renderers/AutocompleteRenderer";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({
   allErrors: true,
   verbose: true,
   strict: false,
});
addFormats(ajv);

const customRenderers = [
   ...materialRenderers,
   {
      tester: (uischema, schema) => (schema.format === "autocomplete" ? 3 : -1),
      renderer: AutocompleteRenderer,
   },
];

// in order for the component to work we need to add all the necessary logic for handling form submission and errors
// while it seems it validates the fields based on the schema we still need a custom button to handle sending a request to the server.
const JsonFormsForm = ({ schema, uiSchema, setData, data, handleSubmit }) => {
   return (
      <div>
         <h2 className="text-xl font-semibold mb-4">JSON Forms</h2>
         <form className="pb-4" onSubmit={handleSubmit}>
            <JsonForms
               ajv={ajv}
               schema={schema}
               uischema={uiSchema}
               data={data}
               validationMode="ValidateAndShow"
               renderers={customRenderers}
               cells={materialCells}
               onChange={({ data }) => setData(data)}
            />
            <button
               className="px-4 py-2 bg-blue-500 rounded float-right text-white"
               type="submit"
            >
               Submit
            </button>
         </form>
      </div>
   );
};

export default JsonFormsForm;
