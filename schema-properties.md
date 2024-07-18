Overview

The schema object is used to define the structure and validation rules for a form. Each field in the schema object corresponds to a form input element, and the properties of each field determine how the input element is rendered and validated.
Field Types and Supported Properties
Text, Email, Number, Password

    type: "text", "email", "number", "password"
    Supported properties:
        name: (string) The name of the property.
        label: (string) The label shown on the field.
        validation: (Yup schema) Validation schema for the field.

Textarea

    type: "textarea"
    Supported properties:
        name: (string) The name of the property.
        label: (string) The label shown on the field.
        validation: (Yup schema) Validation schema for the field.
        rows: (number) The number of rows for the textarea (optional).

Select

    type: "select"
    Supported properties:
        name: (string) The name of the property.
        label: (string) The label shown on the field.
        validation: (Yup schema) Validation schema for the field.
        options: (array) An array of options for the select field. Each option is an object with value and label properties.
        dynamicOptions: (object) An object defining the URL to fetch options from and any dependencies (optional).
            url: (string) The URL to fetch options from.
            dependency: (string) The name of the dependent field (optional).
        optionValue: (string) The property to use as the option value.
        optionLabel: (string) The property to use as the option label.

Checkbox

    type: "checkbox"
    Supported properties:
        name: (string) The name of the property.
        label: (string) The label shown on the field.
        validation: (Yup schema) Validation schema for the field.

Switch

    type: "switch"
    Supported properties:
        name: (string) The name of the property.
        label: (string) The label shown on the field.
        validation: (Yup schema) Validation schema for the field.

Slider

    type: "slider"
    Supported properties:
        name: (string) The name of the property.
        label: (string) The label shown on the field.
        validation: (Yup schema) Validation schema for the field.
        min: (number) The minimum value for the slider.
        max: (number) The maximum value for the slider.
        step: (number) The step value for the slider.

Date

    type: "date"
    Supported properties:
        name: (string) The name of the property.
        label: (string) The label shown on the field.
        validation: (Yup schema) Validation schema for the field.

Radio

    type: "radio"
    Supported properties:
        name: (string) The name of the property.
        label: (string) The label shown on the field.
        validation: (Yup schema) Validation schema for the field.
        options: (array) An array of options for the radio buttons. Each option is an object with value and label properties.

Autocomplete

    type: "autocomplete"
    Supported properties:
        name: (string) The name of the property.
        label: (string) The label shown on the field.
        validation: (Yup schema) Validation schema for the field.
        options: (array) An array of options for the autocomplete field. Each option is an object with value and label properties.

Server Autocomplete

    type: "server-autocomplete"
    Supported properties:
        name: (string) The name of the property.
        label: (string) The label shown on the field.
        validation: (Yup schema) Validation schema for the field.
        url: (string) The URL to fetch options from.
        optionValue: (string) The property to use as the option value.
        optionLabel: (string) The property to use as the option label.

File

    type: "file"
    Supported properties:
        name: (string) The name of the property.
        label: (string) The label shown on the field.
        validation: (Yup schema) Validation schema for the field.

Form Sections

    In order to create sections inside the form we can use this structure

    {
        title:"Section Title"
        orientation: "vertical"/"horizontal"
        columns: number of columns
        rows:[
                {
                    fields:[
                        array of fields
                            ]
                }
             ]
    }
