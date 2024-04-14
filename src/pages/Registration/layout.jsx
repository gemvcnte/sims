import React from "react";
import { EnrollmentProvider } from "./useEnrollment";

export default function EnrollmentLayout({ children }) {
  return <EnrollmentProvider>{children}</EnrollmentProvider>;
}
