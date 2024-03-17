import React, { useState, useEffect } from "react";
import FormValidator from "@utils/FormValidator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "@utils/BlankFieldNotification";
import { Icon } from "@iconify/react";

function Step5({ setStep, fullFormData, onBack, onNext }) {
  const [academicData, setAcademicData] = useState({
    hasAccount: null,
    lrn: "",
    lastName: "",
    track: "",
    strand: "",
    gradeLevel: 0,
  });

  useEffect(() => {
    if (fullFormData) {
      setAcademicData(fullFormData);
    }
    setAcademicData({
      ...fullFormData,
      hasAccount: true,
    });
  }, [fullFormData]);

  const handleFieldChange = (field, value) => {
    const maxLength = 12;
    if (field === "lrn") {
      setAcademicData({ ...academicData, [field]: value.slice(0, maxLength) });
    } else if (field === "gradeLevel") {
      const intValue = parseInt(value, 10);
      setAcademicData({ ...academicData, [field]: intValue });
    } else if (field === "strand") {
      if (value === "abm" || value === "humss" || value === "stem") {
        setAcademicData({ ...academicData, track: "academic", [field]: value });
      } else if (value === "ict" || value === "he") {
        setAcademicData({ ...academicData, track: "tvl", [field]: value });
      }
    } else {
      setAcademicData({ ...academicData, [field]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = FormValidator(academicData, 5);
    isFormValid ? onNext(academicData) : notify();
  };

  return (
    <div className="px-36 lg:px-[12.5rem]">
      {/* <ToastContainer /> */}

      <header className="py-12 text-center">
        {/* <h4 className="text-black-300">Step 3</h4> */}
        {/* <h1 className="text-2xl">
          Form for Students with Existing Accounts from Previous
          Semesters/School Years
        </h1> */}
      </header>

      <form onSubmit={handleSubmit} className="gap-24">
        <div className="flex flex-col items-end justify-center gap-8">
          <div className="flex w-full flex-col gap-8">
            <div className="flex flex-col">
              <label>
                LRN (Learner Reference Number){" "}
                <span className="text-destructive">*</span>
              </label>
              <input
                required
                type="number"
                placeholder="Input Your LRN"
                value={academicData.lrn}
                className={`border-white-700 rounded-lg border p-2 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  academicData.lrn && "!border-blue-400 text-blue-400"
                }`}
                onChange={(e) => handleFieldChange("lrn", e.target.value)}
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-8">
            <div className="flex flex-col">
              <label>
                Last Name <span className="text-destructive">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="Input Your Last Name"
                value={academicData.lastName}
                className={`border-white-700 rounded-lg border p-2 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  academicData.lastName && "!border-blue-400 text-blue-400"
                }`}
                onChange={(e) =>
                  handleFieldChange("lastName", e.target.value.toUpperCase())
                }
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-8">
            <div className="w flex flex-col items-start">
              <label>
                Grade Level <span className="text-destructive">*</span>
              </label>
              <select
                required
                className={`border-white-700 w-full rounded-lg border p-2 py-3 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  academicData.gradeLevel &&
                  "!border-blue-400 bg-blue-400 text-white"
                }`}
                id="gradeLevel"
                value={academicData.gradeLevel}
                onChange={(e) =>
                  handleFieldChange("gradeLevel", e.target.value)
                }
              >
                <option value="">Select Grade Level</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="strand">
                Strand <span className="text-destructive">*</span>
              </label>
              <select
                required
                className={`border-white-700 w-full rounded-lg border p-2 py-3 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  academicData.strand &&
                  "!border-blue-400 bg-blue-400 text-white"
                }`}
                id="strand"
                value={academicData.strand}
                onChange={(e) => handleFieldChange("strand", e.target.value)}
              >
                <option value="">Select Strand</option>
                <option value="humss">HUMSS (Academic)</option>
                <option value="abm">ABM (Academic)</option>
                <option value="stem">STEM (Academic)</option>
                <option value="ict">ICT (TVL)</option>
                <option value="he">HE (TVL)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-end gap-4 py-16">
          <button
            onClick={() => {
              setStep(0);
              setAcademicData({});
            }}
            className="border-white-700 rounded-lg border px-16 py-4 text-right hover:border-blue-400 hover:text-blue-400"
          >
            Back
          </button>
          <button
            type="submit"
            // onClick={handleSubmit}
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
        </div>
      </form>
    </div>
  );
}

export default Step5;
