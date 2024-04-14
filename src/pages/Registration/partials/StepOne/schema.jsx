import * as yup from "yup";

export const schema = yup.object().shape({
  lastName: yup
    .string()
    .required("Please provide your last name.")
    .max(255, "Your last name must be at most 255 characters long."),
  firstName: yup
    .string()
    .required("Please provide your first name.")
    .max(255, "Your first name must be at most 255 characters long."),
  middleName: yup
    .string()
    .max(255, "Your middle name must be at most 255 characters long."),
  extensionName: yup
    .string()
    .oneOf(
      ["None", "Jr", "II", "III", "IV", "V"],
      "Please select a valid extension name.",
    )
    .default("None"),
  birthDate: yup
    .date()
    .max(new Date(), "Please enter a birthdate in the past.")
    .required("Your date of birth is required."),
  gender: yup
    .string()
    .oneOf(["Male", "Female"], "Please specify your gender as Male or Female.")
    .required("Please specify your gender."),
  currentAddress: yup
    .string()
    .required("Please provide your current address.")
    .max(255, "Your current address must be at most 255 characters long."),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Your email address is required.")
    .max(255, "Your email address must be at most 255 characters long.")
    .test("email-format", "Please enter a valid email format.", (value) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }),
});
