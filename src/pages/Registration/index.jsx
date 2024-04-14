import React from "react";
import EnrollmentLayout from "./layout";
import StepZero from "./partials/StepZero";
import StepOne from "./partials/StepOne";
import StepTwo from "./partials/StepTwo";
import StepOneHasAccount from "./partials/StepOneHasAccount";

export default function Registration() {
  return (
    <EnrollmentLayout>
      <StepZero />

      <StepOneHasAccount />

      <StepOne />
      <StepTwo />
    </EnrollmentLayout>
  );
}
