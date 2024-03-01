import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Step1, Step2, Step3, Header } from "./components";
import axios from "axios";
import LoadingSpinner from "@utils/LoadingSpinner";
import { registrationEndpoint } from "@/config/adminEndpoints";
import "./registration.css";
import getAuthHeaders from "@/utils/getAuthHeaders";
import { useTheme } from "@/components/theme-provider";

export default function Registration() {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor = "var(--clr-white-400)";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    const lightTheme = "light";
    setTheme(lightTheme);
  }, []);

  const [loading, setLoading] = useState(false);

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
      const response = await axios.post(
        registrationEndpoint,
        data,
        getAuthHeaders(),
      );
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
      <div className="fixed z-10 grid h-[100svh] w-[100vw] place-items-center items-center bg-slate-50 md:hidden">
        <p>Registration Only Available on Desktop</p>
      </div>
      {/* <ToastContainer /> */}
      <Header step={step} />

      <main className="bg-slate-50">
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
