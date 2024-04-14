import React, { createContext, useContext, useState } from "react";

const EnrollmentContext = createContext();

export const useEnrollment = () => {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error("useEnrollment must be used within an EnrollmentProvider");
  }
  return context;
};

export const EnrollmentProvider = ({ children }) => {
  const [enrollmentData, setEnrollmentData] = useState({});
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const resetStep = () => {
    setStep(0);
  };

  const values = {
    enrollmentData,
    setEnrollmentData,
    step,
    nextStep,
    prevStep,
    resetStep,
  };

  return (
    <EnrollmentContext.Provider value={values}>
      {children}
    </EnrollmentContext.Provider>
  );
};
