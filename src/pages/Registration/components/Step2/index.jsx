import React, { useState, useEffect } from "react";
import FormValidator from "@utils/FormValidator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "@utils/BlankFieldNotification";
import { Icon } from "@iconify/react";

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  className,
}) => (
  <input
    className={`border-white-700 rounded-lg border p-2 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    name={name}
  />
);

function Step2({ onNext, onBack, formData }) {
  const [parentData, setParentData] = useState({
    fatherName: "",
    fatherContactNumber: "",
    motherName: "",
    motherContactNumber: "",
    guardianName: "",
    guardianContactNumber: "",
    guardianRelationship: "",
  });

  useEffect(() => {
    if (formData) {
      setParentData(formData);
    }
  }, [formData]);

  const handleNext = (e) => {
    e.preventDefault();
    const isFormValid = FormValidator(parentData, 2);
    isFormValid ? onNext(parentData) : notify();
  };

  const handleFieldChange = (field, value) => {
    const maxLength = {
      fatherContactNumber: 11,
      motherContactNumber: 11,
      guardianContactNumber: 11,
    };

    if (maxLength.hasOwnProperty(field)) {
      setParentData({
        ...parentData,
        [field]: value.slice(0, maxLength[field]),
      });
    } else {
      setParentData({ ...parentData, [field]: value });
    }
  };

  return (
    <div className="px-36 lg:px-[12.5rem]">
      {/* <ToastContainer /> */}

      <header className="py-6 text-center">
        <h4 className="text-black-300">Step 2</h4>
        <h1 className="text-2xl">Parent's / Guardian's Information</h1>
      </header>

      <form onSubmit={handleNext}>
        <div className="gap-24 sm:flex">
          <div className="flex w-full flex-col gap-8">
            <div className="flex flex-col">
              <label>
                Father's Name <span className="text-destructive">*</span>
              </label>
              <InputField
                required
                type="text"
                placeholder="Firstname Middlename Lastname"
                value={parentData.fatherName}
                onChange={(e) =>
                  handleFieldChange("fatherName", e.target.value)
                }
                name="fatherName"
                o
                className={`${
                  parentData.fatherName && "!border-blue-400 text-blue-400"
                }`}
              />
            </div>
            <div className="flex flex-col">
              <label>
                Mother's Name <span className="text-destructive">*</span>
              </label>
              <InputField
                required
                type="text"
                placeholder="Firstname Middlename Lastname"
                value={parentData.motherName}
                onChange={(e) =>
                  handleFieldChange("motherName", e.target.value)
                }
                name="motherName"
                className={`${
                  parentData.motherName && "!border-blue-400 text-blue-400"
                }`}
              />
            </div>
          </div>

          <div className="flex w-[60%] flex-col gap-8">
            <div className="flex flex-col">
              <label>
                Father's Contact Number{" "}
                <span className="text-destructive">*</span>
              </label>
              <InputField
                required
                type="number"
                placeholder="09xxxxxxxxx"
                value={parentData.fatherContactNumber}
                onChange={(e) =>
                  handleFieldChange("fatherContactNumber", e.target.value)
                }
                name="fatherContactNumber"
                className={`${
                  parentData.fatherContactNumber &&
                  "!border-blue-400 text-blue-400"
                }`}
              />
            </div>
            <div className="flex flex-col">
              <label>
                Mother's Contact Number{" "}
                <span className="text-destructive">*</span>
              </label>
              <InputField
                required
                type="number"
                placeholder="09xxxxxxxxx"
                value={parentData.motherContactNumber}
                onChange={(e) =>
                  handleFieldChange("motherContactNumber", e.target.value)
                }
                name="motherContactNumber"
                className={`${
                  parentData.motherContactNumber &&
                  "!border-blue-400 text-blue-400"
                }`}
              />
            </div>
          </div>
        </div>

        <hr className="mt-8" />

        <div className=" mt-8 gap-24 sm:flex">
          <div className="flex w-full flex-col">
            <label>Guardian's Name</label>
            <InputField
              type="text"
              placeholder="Firstname Middlename Lastname"
              value={parentData.guardianName}
              onChange={(e) =>
                handleFieldChange("guardianName", e.target.value)
              }
              name="guardianName"
            />
          </div>

          <div className="flex w-[60%] flex-col">
            <label>Guardian's Contact Number</label>
            <InputField
              type="number"
              placeholder="09xxxxxxxxx"
              value={parentData.guardianContactNumber}
              onChange={(e) =>
                handleFieldChange("guardianContactNumber", e.target.value)
              }
              name="guardianContactNumber"
            />
          </div>
        </div>

        <div className="mt-4">
          <select
            className="border-white-700 rounded-lg border p-2 py-3 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="guardianRelationship"
            value={parentData.guardianRelationship}
            onChange={(e) =>
              handleFieldChange("guardianRelationship", e.target.value)
            }
          >
            <option value="">Relationship</option>
            <option value="Parent">Parent</option>
            <option value="Relative">Relative</option>
            <option value="Non-relative">Non-relative</option>
          </select>
        </div>

        <div className="flex items-end justify-end gap-4 py-16">
          <button
            onClick={() => onBack(parentData)}
            type="submit"
            className="border-white-700  rounded-lg border px-16 py-4 text-right hover:border-blue-400 hover:text-blue-400"
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

export default Step2;
