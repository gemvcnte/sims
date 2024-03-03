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
import useGlobalSettings from "./useGlobalSettings";
import ReviewStudentInformationModal from "./components/Step3/ReviewStudentInformationModal";
import { Dialog } from "@/components/ui/dialog";

export default function Registration() {
  const { setTheme, theme } = useTheme();
  const { globalSettings } = useGlobalSettings();

  useEffect(() => {
    const lightTheme = "light";
    setTheme(lightTheme);
  }, []);

  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [showDialog, setShowDialog] = useState(false); // State for controlling the visibility of the dialog

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    if (step === 3) {
      setShowDialog(true); // Show the dialog before proceeding to the next step
      const objectWithBackendSchemaStructure = {
        schoolYear: {
          year: globalSettings.schoolYear,
          semester: globalSettings.semester,
          gradeLevel: data.gradeLevel,
          track: data.track,
          strand: data.strand,
        },
        ...data,
      };
      console.log(data);
      // return handleSubmit(objectWithBackendSchemaStructure);
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

  const handleConfirmSubmission = () => {
    setShowDialog(false);
    const objectWithBackendSchemaStructure = {
      schoolYear: {
        year: globalSettings.schoolYear,
        semester: globalSettings.semester,
        gradeLevel: formData.gradeLevel,
        track: formData.track,
        strand: formData.strand,
      },
      ...formData,
    };
    // console.log(objectWithBackendSchemaStructure);
    handleSubmit(objectWithBackendSchemaStructure); // Submit the form data to the API
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="fixed z-10 grid h-[100svh] w-[100vw] place-items-center items-center bg-slate-50 md:hidden">
        <p>Registration Only Available on Desktop</p>
      </div>
      {/* <ToastContainer /> */}
      <Header step={step} />

      <main className="">
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

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <ReviewStudentInformationModal
          application={formData}
          onSave={handleConfirmSubmission}
        />
      </Dialog>
    </>
  );
}
