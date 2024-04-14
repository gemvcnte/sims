import * as yup from "yup";

export const schema = yup.object().shape({
  lastName: yup
    .string()
    .required("Last name is required")
    .max(255, "Last name must be at most 255 characters"),
  firstName: yup
    .string()
    .required("First name is required")
    .max(255, "First name must be at most 255 characters"),
  middleName: yup
    .string()
    .max(255, "Middle name must be at most 255 characters"),
  extensionName: yup.string().default("None"),
  birthDate: yup
    .date()
    .max(new Date(), "Birthdate cannot be in the future")
    .required("Date of birth is required"),
  gender: yup.string().required("Gender is required"),
  currentAddress: yup
    .string()
    .required("Current address is required")
    .max(255, "Current address must be at most 255 characters"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .max(255, "Email must be at most 255 characters")
    .test("email-format", "Invalid email format", (value) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }),
});
