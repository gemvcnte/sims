import * as yup from "yup";

export const schema = yup.object().shape({
  lrn: yup
    .string()
    .required("Please provide your LRN (Learner Reference Number).")
    .matches(/^\d{12}$/, "LRN must be exactly 12 digits."),
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
