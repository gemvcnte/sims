import React, { createContext, useContext, useEffect, useState } from "react";

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
  const [hasAccount, setHasAccount] = useState(null);
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

  useEffect(() => {
    if (step === 0) {
      setEnrollmentData({});
    }

    console.log(`step`, step);
  }, [step]);

  useEffect(() => {
    console.log(`enrollmentData`, enrollmentData);
  }, [enrollmentData]);

  const values = {
    enrollmentData,
    setEnrollmentData,
    step,
    nextStep,
    prevStep,
    resetStep,
    hasAccount,
    setHasAccount,
  };

  return (
    <EnrollmentContext.Provider value={values}>
      {children}
    </EnrollmentContext.Provider>
  );
};
