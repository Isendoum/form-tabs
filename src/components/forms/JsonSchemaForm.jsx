import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import AutocompleteWidget from "@/components/widgets/AutocompleteWidget";

const JsonSchemaForm = ({ schema, schemaUi, onSubmit }) => {
   return (
      <div className="p-4">
         <Form
            schema={schema}
            uiSchema={schemaUi}
            validator={validator}
            onSubmit={onSubmit}
            showErrorList={false}
            widgets={{ AutocompleteWidget }}
         />
      </div>
   );
};

export default JsonSchemaForm;
