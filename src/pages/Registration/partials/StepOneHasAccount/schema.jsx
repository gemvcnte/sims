import * as yup from "yup";

export const schema = yup.object().shape({
  lastName: yup
    .string()
    .required("Oops! Looks like you forgot to provide your last name.")
    .max(255, "Your last name must be at most 255 characters long."),
  lrn: yup
    .string()
    .required("Please provide your LRN (Learner Reference Number).")
    .matches(/^\d{12}$/, "Your LRN must be exactly 12 digits."),
  gradeLevel: yup
    .number()
    .required("Please select your grade level.")
    .oneOf([11, 12], "Your grade level must be either 11 or 12."),
  strand: yup
    .string()
    .required("Please specify your strand.")
    .oneOf(
      ["humss", "stem", "abm", "ict", "he"],
      "Please select a valid strand: HUMSS, STEM, ABM, ICT, or HE.",
    ),
});