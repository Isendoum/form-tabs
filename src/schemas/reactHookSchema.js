import * as Yup from "yup";

// Define a schema with both sections and simple fields
export const formSchema = {
   fields: [
      { name: "firstName", label: "First Name", type: "text", required: true },
      { name: "lastName", label: "Last Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
   ],
   sections: [
      {
         title: "Personal Information",
         orientation: "vertical", // or "horizontal"
         columns: 2,
         rows: [
            {
               fields: [
                  { name: "age", label: "Age", type: "number" },
                  {
                     name: "password",
                     label: "Password",
                     type: "password",
                     required: true,
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
                  },
                  {
                     name: "state",
                     label: "State",
                     type: "text",
                     required: true,
                     dependencies: [{ field: "country", value: "usa" }],
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
                  },
                  { name: "dob", label: "Date of Birth", type: "date" },
                  {
                     name: "bio",
                     label: "Bio",
                     type: "textarea",
                  },
                  {
                     name: "terms",
                     label: "Accept Terms",
                     type: "switch",
                     required: true,
                  },
                  {
                     name: "satisfaction",
                     label: "Satisfaction Level",
                     type: "slider",
                     min: 0,
                     max: 100,
                     step: 1,
                     defaultValue: 50,
                  },
                  {
                     name: "profilePicture",
                     label: "Profile Picture",
                     type: "file",
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
                  },
                  {
                     name: "city",
                     label: "City",
                     type: "server-autocomplete",
                     fetchOptions: async (input) => {
                        const response = await fetch(
                           `/api/cities?query=${input}`,
                        );
                        const data = await response.json();
                        return data.cities.map((city) => ({
                           label: city.name,
                           value: city.id,
                        }));
                     },
                  },
               ],
            },
         ],
      },
   ],
};

export const validationSchema = Yup.object().shape({
   firstName: Yup.string().required("This field is required"),
   lastName: Yup.string().required("This field is required"),
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
   bio: Yup.string().required("This field is required"),
   terms: Yup.boolean().oneOf([true], "You must accept the terms"),
   satisfaction: Yup.number()
      .typeError("Must be a number")
      .min(0, "Minimum value is 0")
      .max(100, "Maximum value is 100")
      .required("This field is required"),
   profilePicture: Yup.mixed().required("A file is required"),
   gender: Yup.string().required("This field is required"),
   favoriteColor: Yup.string().required("This field is required"),
   city: Yup.string().required("This field is required"),
});
