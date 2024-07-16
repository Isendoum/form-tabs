import * as Yup from "yup";

// Define a schema with both sections and simple fields
// Updated configuration with validation schemas
export const formSchema = {
   fields: [
      {
         name: "firstName",
         label: "First Name",
         type: "text",
         required: true,
         validation: Yup.string().required("First Name is required"),
      },
      {
         name: "lastName",
         label: "Last Name",
         type: "text",
         required: true,
         validation: Yup.string().required("Last Name is required"),
      },
      {
         name: "email",
         label: "Email",
         type: "email",
         required: true,
         validation: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
      },
   ],
   sections: [
      {
         title: "Personal Information",
         orientation: "vertical", // or "horizontal"
         columns: 2,
         rows: [
            {
               fields: [
                  {
                     name: "age",
                     label: "Age",
                     type: "number",
                     validation: Yup.number()
                        .typeError("Must be a number")
                        .required("Age is required"),
                  },
                  {
                     name: "password",
                     label: "Password",
                     type: "password",
                     required: true,
                     validation: Yup.string().required("Password is required"),
                  },
               ],
            },
            {
               fields: [
                  {
                     name: "country",
                     label: "Country",
                     type: "select",
                     options: [
                        { value: "usa", label: "USA" },
                        { value: "canada", label: "Canada" },
                        { value: "other", label: "Other" },
                     ],
                     required: true,
                     validation: Yup.string().required("Country is required"),
                  },
                  {
                     name: "state",
                     label: "State",
                     type: "text",
                     required: true,
                     dependencies: [{ field: "country", value: "usa" }],
                     validation: Yup.string().when("country", {
                        is: "usa",
                        then: Yup.string().required("State is required"),
                     }),
                  },
               ],
            },
         ],
      },
      {
         title: "Additional Information",
         orientation: "horizontal",
         columns: 3,
         rows: [
            {
               fields: [
                  {
                     name: "subscribe",
                     label: "Subscribe to newsletter",
                     type: "checkbox",
                     validation: Yup.boolean(),
                  },
                  {
                     name: "dob",
                     label: "Date of Birth",
                     type: "date",
                     validation: Yup.date()
                        .typeError("Invalid date")
                        .nullable()
                        .required("Date of Birth is required"),
                  },
                  {
                     name: "bio",
                     label: "Bio",
                     type: "textarea",
                     validation: Yup.string(),
                  },
                  {
                     name: "terms",
                     label: "Accept Terms",
                     type: "switch",
                     required: true,
                     validation: Yup.boolean()
                        .oneOf([true], "You must accept the terms")
                        .required("Terms are required"),
                  },
                  {
                     name: "satisfaction",
                     label: "Satisfaction Level",
                     type: "slider",
                     min: 0,
                     max: 100,
                     step: 1,
                     defaultValue: 50,
                     validation: Yup.number()
                        .min(0)
                        .max(100)
                        .required("Satisfaction level is required"),
                  },
                  {
                     name: "profilePicture",
                     label: "Profile Picture",
                     type: "file",
                     // validation: Yup.mixed().required("A file is required"),
                  },
               ],
            },
            {
               fields: [
                  {
                     name: "gender",
                     label: "Gender",
                     type: "radio",
                     options: [
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                     ],
                     required: true,
                     validation: Yup.string().required("Gender is required"),
                  },
                  {
                     name: "favoriteColor",
                     label: "Favorite Color",
                     type: "autocomplete",
                     options: [
                        { value: "red", label: "Red" },
                        { value: "blue", label: "Blue" },
                        { value: "green", label: "Green" },
                        { value: "yellow", label: "Yellow" },
                        { value: "pink", label: "Pink" },
                        { value: "black", label: "Black" },
                     ],
                     validation: Yup.string().required(
                        "Favorite color is required",
                     ),
                  },
                  {
                     name: "city",
                     label: "City",
                     type: "server-autocomplete",
                     url: "/api/cities?query=",
                     optionValue: "id",
                     optionLabel: "name",
                     // validation: Yup.string().required("City is required"),
                  },
               ],
            },
         ],
      },
   ],
};

export const validationSchema = Yup.object().shape({
   firstName: Yup.string(),
   lastName: Yup.string(),
   email: Yup.string()
      .email("Invalid email format")
      .required("This field is required"),
   age: Yup.number()
      .typeError("Must be a number")
      .required("This field is required"),
   password: Yup.string().required("This field is required"),
   country: Yup.string().required("This field is required"),
   state: Yup.string().when("country", {
      is: "usa",
      then: (schema) => schema.required("This field is required"),
      otherwise: (schema) => schema,
   }),
   subscribe: Yup.boolean(),
   dob: Yup.date()
      .typeError("Invalid date")
      .nullable()
      .required("This field is required"),
   bio: Yup.string(),
   terms: Yup.boolean()
      .oneOf([true], "You must accept the terms")
      .required("This field is required"),
   satisfaction: Yup.number()
      .typeError("Must be a number")
      .min(0, "Minimum value is 0")
      .max(100, "Maximum value is 100")
      .required("This field is required"),
   // profilePicture: Yup.mixed().required("A file is required"),
   gender: Yup.string().required("This field is required"),
   favoriteColor: Yup.string().required("This field is required"),
   // city: Yup.string().required("This field is required"),
});
