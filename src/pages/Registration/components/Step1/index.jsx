import React, { useState, useEffect } from "react";
import FormValidator from "@utils/FormValidator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "@utils/BlankFieldNotification";
import { Icon } from "@iconify/react";
import showErrorNotification from "@/utils/ShowErrorNotification";

const InputField = ({
  type,
  placeholder,
  value,
  name,
  onChange,
  className,
}) => (
  <input
    // required
    type={type}
    placeholder={placeholder}
    value={value}
    name={name}
    onChange={onChange}
    className={`border-white-700 rounded-lg border p-2 focus:border-blue-400 focus:outline-none focus:ring-2 
    focus:ring-blue-400 ${className}`}
  />
);

const selectOptions = [
  { value: "", label: "Select Extension Name" },
  { value: "Jr", label: "Jr" },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
  { value: "IV", label: "IV" },
  { value: "V", label: "V" },
  { value: "none", label: "None" },
];

function Step1({ onNext, fullFormData }) {
  const [hasMiddleName, setHasMiddleName] = useState(false);

  const handleMiddleNameToggle = (e) => {
    const isChecked = e.target.checked;
    setHasMiddleName(isChecked);
    if (isChecked) {
      setFormData({ ...formData, middleName: null });
    } else {
      setFormData({ ...formData, middleName: "" });
    }
  };

  useEffect(() => {
    if (fullFormData) {
      setFormData(fullFormData);
    }
  }, [fullFormData]);

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    extensionName: "none",
    birthDate: "",
    gender: "",
    currentAddress: "",
    emailAddress: "",
  });

  const handleNext = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(formData.emailAddress);
    const isOtherFieldsValid = FormValidator(formData, 1);
    if (isEmailValid && isOtherFieldsValid) {
      onNext(formData);
    } else {
      if (!isEmailValid) {
        showErrorNotification("Invalid email address");
      } else {
        notify();
      }
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="px-36 lg:px-[12.5rem]">
      {/* <ToastContainer /> */}

      <header className="py-6 text-center">
        <h4 className="text-black-300">Step 1</h4>
        <h1 className="text-2xl">Learner Information</h1>
      </header>
      <form onSubmit={handleNext} className="gap-24 sm:flex">
        <div className="flex w-full flex-col gap-8">
          <div className="flex flex-col">
            <label>
              Last Name <span className="text-destructive">*</span>
            </label>
            <InputField
              type="text"
              placeholder="Input Your Last Name"
              value={formData.lastName}
              name="lastName"
              onChange={(e) =>
                handleFieldChange(e.target.name, e.target.value.toUpperCase())
              }
              className={`${
                formData.lastName && "!border-blue-400 text-blue-400"
              }`}
            />
          </div>

          <div className="flex w-full flex-col">
            <label>
              First Name <span className="text-destructive">*</span>
            </label>
            <InputField
              // required="firstName"
              type="text"
              placeholder="Input Your First Name"
              value={formData.firstName}
              name="firstName"
              onChange={(e) =>
                handleFieldChange(e.target.name, e.target.value.toUpperCase())
              }
              className={`${
                formData.firstName && "!border-blue-400 text-blue-400"
              }`}
            />
          </div>

          <div className="flex w-full flex-col">
            <section className="flex items-baseline justify-between">
              <label>
                Middle Name <span className="text-destructive">*</span>
              </label>
              <div className="flex">
                <label className="text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={formData.middleName === null}
                    onChange={handleMiddleNameToggle}
                    className="mr-2"
                  />
                  I don't have a middle name
                </label>
              </div>
            </section>
            {/* {!hasMiddleName && ( */}
            <input
              {...(formData.middleName === "" ? { required: true } : {})}
              disabled={formData.middleName === null}
              type="text"
              placeholder="Input Your Middle Name"
              value={formData.middleName === null ? "" : formData.middleName}
              name="middleName"
              onChange={(e) =>
                handleFieldChange(e.target.name, e.target.value.toUpperCase())
              }
              className={`${
                formData.middleName && "!border-blue-400 text-blue-400"
              } col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm uppercase ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            />
            {/* )} */}
          </div>

          <div className="flex w-full flex-col">
            <label>
              Extension Name <span className="text-destructive">*</span>
            </label>
            <select
              required
              className={`border-white-700 rounded-lg border p-2 py-3 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                formData.extensionName &&
                "!border-blue-400 bg-blue-400 text-white"
              }`}
              value={formData.extensionName}
              name="extensionName"
              onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
            >
              {selectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className=" flex w-full flex-col gap-8 ">
          <div className="flex flex-col">
            <label>
              Birthdate <span className="text-destructive">*</span>
            </label>
            <InputField
              type="date"
              placeholder="Input Your Birthdate (MM/DD/YY)"
              value={formData.birthDate}
              name="birthDate"
              onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
              className={`${
                formData.birthDate && "!border-blue-400 text-blue-400"
              }`}
            />
          </div>

          <div className="flex flex-col">
            <label>
              Gender <span className="text-destructive">*</span>
            </label>
            <select
              className={`border-white-700 rounded-lg border p-2 py-3 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                formData.gender && "!border-blue-400 bg-blue-400 text-white"
              }`}
              value={formData.gender}
              required
              name="gender"
              onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>
              Current Address <span className="text-destructive">*</span>
            </label>
            <InputField
              className={`${
                formData.currentAddress && "!border-blue-400 text-blue-400"
              }`}
              type="text"
              placeholder="E.g., 123 Purok St, Barangay, Municipality"
              value={formData.currentAddress}
              name="currentAddress"
              onChange={(e) =>
                handleFieldChange(e.target.name, e.target.value.toUpperCase())
              }
            />
          </div>

          <div className="flex flex-col">
            <label>
              Email <span className="text-destructive">*</span>
            </label>
            <InputField
              className={`${
                formData.emailAddress && "!border-blue-400 text-blue-400"
              }`}
              type="email"
              placeholder="Input Your Email"
              value={formData.emailAddress}
              name="emailAddress"
              onChange={(e) =>
                handleFieldChange(e.target.name, e.target.value.toUpperCase())
              }
            />
          </div>

          <div className="flex items-end justify-end ">
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
        </div>
      </form>
    </div>
  );
}

export default Step1;
