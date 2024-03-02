import React, { useState, useEffect } from "react";
import FormValidator from "@utils/FormValidator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "@utils/BlankFieldNotification";
import { Icon } from "@iconify/react";

function Step3({ fullFormData, onBack, onNext }) {
  const [academicData, setAcademicData] = useState({
    lrn: "",
    schoolYear: "",
    semester: "",
    track: "",
    strand: "",
  });

  useEffect(() => {
    if (fullFormData) {
      setAcademicData(fullFormData);
    }
  }, [fullFormData]);

  const handleFieldChange = (field, value) => {
    const maxLength = 12;
    if (field === "lrn") {
      setAcademicData({ ...academicData, [field]: value.slice(0, maxLength) });
    } else {
      setAcademicData({ ...academicData, [field]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = FormValidator(academicData, 3);
    isFormValid ? onNext(academicData) : notify();
  };

  return (
    <div className="px-36 lg:px-[12.5rem]">
      {/* <ToastContainer /> */}

      <header className="py-6 text-center">
        <h4 className="text-black-300">Step 3</h4>
        <h1 className="text-2xl">Academic Information</h1>
      </header>

      <form onSubmit={handleSubmit} className="gap-24">
        <div className="flex items-end justify-center gap-8">
          <div className="flex w-full flex-col gap-8">
            <div className="flex flex-col">
              <label>LRN (Learner Reference Number)</label>
              <input
                type="number"
                placeholder="Input Your LRN"
                value={academicData.lrn}
                className={`border-white-700 rounded-lg border p-2 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  academicData.lrn && "!border-blue-400 text-blue-400"
                }`}
                onChange={(e) => handleFieldChange("lrn", e.target.value)}
              />
            </div>

            <div className="w flex flex-col items-start">
              <label htmlFor="schoolYear">School Year</label>
              <select
                className={`border-white-700 w-full rounded-lg border p-2 py-3 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  academicData.schoolYear &&
                  "!border-blue-400 bg-blue-400 text-white"
                }`}
                id="schoolYear"
                value={academicData.schoolYear}
                onChange={(e) =>
                  handleFieldChange("schoolYear", e.target.value)
                }
              >
                <option value="">Select School Year</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div className="w flex flex-col items-start">
              <label htmlFor="semester">Semester</label>
              <select
                className={`border-white-700 w-full rounded-lg border p-2 py-3 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  academicData.semester &&
                  "!border-blue-400 bg-blue-400 text-white"
                }`}
                id="semester"
                value={academicData.semester}
                onChange={(e) => handleFieldChange("semester", e.target.value)}
              >
                <option value="">Select Semester</option>
                <option value="first semester">1st Semester</option>
                <option value="second semester">2nd Semester</option>
              </select>
            </div>
          </div>

          <div className="flex w-full flex-col gap-8">
            <div className="w flex flex-col items-start">
              <label>Track</label>
              <select
                className={`border-white-700 w-full rounded-lg border p-2 py-3 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  academicData.track &&
                  "!border-blue-400 bg-blue-400 text-white"
                }`}
                id="track"
                value={academicData.track}
                onChange={(e) => handleFieldChange("track", e.target.value)}
              >
                <option value="">Select Track</option>
                <option value="academic">Academic Track</option>
                <option value="tvl">TVL Track</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="strand">Strand</label>
              <select
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
            onClick={() => onBack(academicData)}
            type="submit"
            className="border-white-700 rounded-lg border px-16 py-4 text-right hover:border-blue-400 hover:text-blue-400"
          >
            Back
          </button>
          <button
            type="submit"
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

export default Step3;
