import * as yup from "yup";

export const schema = yup.object().shape({
  guardianName: yup
    .string()
    .required("Please provide your guardian's name.")
    .max(255, "Your last name must be at most 255 characters long."),
  guardianContactNumber: yup
    .string()
    .required("Please provide your guardian's contact number.")
    .matches(
      /^\d{11}$/,
      "Contact number must be exactly 11 digits. e.g. 09123456789",
    ),
  guardianRelationship: yup
    .string()
    .required("Please specify your relationship with your guardian.")
    .oneOf(
      ["Relative", "Non-relative"],
      "Please specify your gender as Relative or Non-relative.",
    ),

  fatherName: yup
    .string()
    .max(255, "Your father's name must be at most 255 characters long."),
  fatherContactNumber: yup
    .string()
    .matches(
      /^\d{11}$/,
      "Contact number must be exactly 11 digits. e.g. 09123456789",
    ),
  motherName: yup
    .string()
    .max(255, "Your mother's name must be at most 255 characters long."),
  motherContactNumber: yup
    .string()
    .matches(
      /^\d{11}$/,
      "Contact number must be exactly 11 digits. e.g. 09123456789",
    ),
});
