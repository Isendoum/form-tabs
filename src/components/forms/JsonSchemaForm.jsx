import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import AutocompleteWidget from "@/components/widgets/AutocompleteWidget";

const JsonSchemaForm = ({ schema, schemaUi, onSubmit, transformErrors }) => {
   return (
      <div className="p-4">
         <Form
            transformErrors={transformErrors}
            schema={schema}
            uiSchema={schemaUi}
            liveOmit
            focusOnFirstError
            validator={validator}
            onSubmit={onSubmit}
            liveValidate
            showErrorList={false}
            // noHtml5Validate
            widgets={{ AutocompleteWidget }}
         />
      </div>
   );
};

export default JsonSchemaForm;
