import React from "react";
import { EnrollmentProvider } from "./useEnrollment";
import Header from "./partials/Header";

export default function EnrollmentLayout({ children }) {
  return (
    <EnrollmentProvider>
      <Header />

      {children}
    </EnrollmentProvider>
  );
}
