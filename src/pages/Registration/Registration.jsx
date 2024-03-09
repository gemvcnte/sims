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
import showErrorNotification from "@/utils/ShowErrorNotification";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Step5 from "./components/Step5";
import StepFiveReviewStudentInformationModal from "./components/Step5/StepFiveReviewStudentInformationModal";

export default function Registration() {
  const { setTheme, theme } = useTheme();
  const { globalSettings } = useGlobalSettings();

  useEffect(() => {
    const lightTheme = "light";
    setTheme(lightTheme);
  }, []);

  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [showDialog, setShowDialog] = useState(false); // State for controlling the visibility of the dialog

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    if (step === 3 || 5) {
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
      // console.log(data);
      // return handleSubmit(objectWithBackendSchemaStructure);
    } else {
      setStep(step + 1);
    }
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
        if (data.hasAccount) {
          setStep(0);
          setHasAccount(null);
        } else {
          setStep(1);
          setHasAccount(null);
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Server response error with 'error' field
        showErrorNotification(error.response.data.error);
      } else if (error.message) {
        // Other types of errors with a 'message' field
        showErrorNotification(error.response.data.message);
      } else {
        // Fallback for any other unexpected errors
        showErrorNotification("Unexpected error occurred.");
      }
      setLoading(false);
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

  const [hasAccount, setHasAccount] = useState(null);

  const handleStepBackToZero = () => {
    setStep(0);
    setFormData({});
  };

  const handleStepZeroNextButton = () => {
    if (!hasAccount) {
      setStep(step + 1);
    } else {
      setStep(step + 5);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="fixed z-10 grid h-[100svh] w-[100vw] place-items-center items-center bg-slate-50 md:hidden">
        <p>Registration Only Available on Desktop</p>
      </div>
      {/* <ToastContainer /> */}

      {step > 0 && step < 5 ? <Header step={step} /> : null}

      <main className="">
        {step === 0 && (
          <main className="flex h-[100svh] flex-col items-center justify-center gap-2">
            <section className="flex gap-8">
              <Card
                className={`flex aspect-square w-[35ch] cursor-pointer flex-col ${
                  hasAccount ? "border-blue-400" : ""
                }`}
                onClick={() => setHasAccount(true)}
              >
                <CardTitle className="flex justify-end p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`lucide lucide-circle-check text-blue-400 ${
                      hasAccount ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </CardTitle>
                <CardContent
                  className={`flex h-full flex-col items-center justify-center gap-2 text-center ${
                    hasAccount ? "text-blue-400" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-user-round-check"
                  >
                    <path d="M2 21a8 8 0 0 1 13.292-6" />
                    <circle cx="10" cy="8" r="5" />
                    <path d="m16 19 2 2 4-4" />
                  </svg>
                  <span>I have a SIMS account from previous semesters</span>
                </CardContent>
              </Card>

              <Card
                className={`flex aspect-square w-[35ch] cursor-pointer flex-col ${
                  !hasAccount ? "border-blue-400" : ""
                }`}
                onClick={() => setHasAccount(false)}
              >
                <CardTitle className="flex justify-end p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`lucide lucide-circle-check text-blue-400 ${
                      !hasAccount ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </CardTitle>
                <CardContent
                  className={`flex h-full flex-col items-center justify-center gap-2 text-center ${
                    !hasAccount ? "text-blue-400" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-user-round-x "
                  >
                    <path d="M2 21a8 8 0 0 1 11.873-7" />
                    <circle cx="10" cy="8" r="5" />
                    <path d="m17 17 5 5" />
                    <path d="m22 17-5 5" />
                  </svg>
                  <span>I'm new to SIMS and don't have an account yet</span>
                </CardContent>
              </Card>
            </section>

            <section className="flex w-[70ch] items-end justify-end pt-8">
              <button
                onClick={() => handleStepZeroNextButton()}
                className="group flex w-fit transform-gpu items-center gap-2 rounded-lg bg-blue-400 px-16 py-4 text-right text-white transition-transform hover:-translate-x-[-16px] focus:-translate-x-[-16px] focus:outline-none"
              >
                Next Step
                <Icon
                  className="transform-gpu transition-transform duration-300 group-hover:translate-x-8 group-focus:translate-x-8"
                  icon="ep:arrow-up-bold"
                  color="white"
                  rotate={1}
                />
              </button>
            </section>
          </main>
        )}

        {step === 1 && (
          <Step1
            onBack={handleStepBackToZero}
            onNext={handleNext}
            fullFormData={formData}
          />
        )}

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

        {step === 5 && (
          <Step5
            setStep={setStep}
            onNext={handleNext}
            onBack={handleBack}
            fullFormData={formData}
          />
        )}
      </main>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        {step === 3 ? (
          <ReviewStudentInformationModal
            application={formData}
            onSave={handleConfirmSubmission}
          />
        ) : (
          <StepFiveReviewStudentInformationModal
            application={formData}
            onSave={handleConfirmSubmission}
          />
        )}
      </Dialog>
    </>
  );
}
