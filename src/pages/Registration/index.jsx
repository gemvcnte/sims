import React from "react";
import EnrollmentLayout from "./layout";
import StepZero from "./partials/StepZero";
import StepOne from "./partials/StepOne";
import StepTwo from "./partials/StepTwo";

export default function Registration() {
  return (
    <EnrollmentLayout>
      <StepZero />

      <StepOne />
      <StepTwo />
    </EnrollmentLayout>
  );
}
