import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Step1, Step2, Step3, Header } from "./components";
import axios from "axios";
import LoadingSpinner from "@utils/LoadingSpinner";
import "./registration.css";
import { getBaseUrl } from "@src/utils/configUtils";

export default function Registration() {
  useEffect(() => {
    document.body.style.backgroundColor = "var(--clr-white-400)";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const [loading, setLoading] = useState(false);

  const baseUrl = getBaseUrl();
  const registrationApi = `${baseUrl}/apply`;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    if (step === 3) {
      return handleSubmit(data);
    }
    setStep(step + 1);
  };

  const handleBack = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step - 1);
  };

  const handleSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post(registrationApi, data);
      if (response.status === 200) {
        toast.success("Data submitted successfully", {
          autoClose: 10000,
          pauseOnHover: true,
        });
        setLoading(false);
        setFormData({});
        setStep(1);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="fixed z-10 grid h-[100vh] w-[100vw] place-items-center items-center bg-white-400 md:hidden">
        <p>Registration Only Available on Desktop</p>
      </div>
      <ToastContainer />
      <Header step={step} />

      <main>
        {step === 1 && <Step1 onNext={handleNext} fullFormData={formData} />}
        {step === 2 && (
          <Step2 onNext={handleNext} onBack={handleBack} formData={formData} />
        )}
        {step === 3 && (
          <Step3
            fullFormData={formData}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}
      </main>
    </>
  );
}
