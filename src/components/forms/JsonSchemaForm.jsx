import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";

import DynamicSelectWidget from "../widgets/DynamicSelectWidget";

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
            widgets={{ DynamicSelectWidget }}
         />
      </div>
   );
};

export default JsonSchemaForm;
