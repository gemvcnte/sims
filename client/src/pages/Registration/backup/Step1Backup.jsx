// Step1.js
import React, { useState, useEffect } from "react";
import FormValidator from "./FormValidator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "./BlankFieldNotification";

function Step1({ onNext, fullFormData }) {
  useEffect(() => {
    if (fullFormData) {
      setFormData(fullFormData);
    }
  }, [fullFormData]);

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    extensionName: "",
    birthdate: "",
    sex: "",
    currentAddress: "",
    email: "",
  });

  const handleNext = () => {
    const isFormValid = FormValidator(formData, 1);
    isFormValid ? onNext(formData) : notify();
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div>
      <ToastContainer />
      <h2>Step 1: Personal Information</h2>
      <input
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        name="lastName"
        onChange={(e) => {
          const { name, value } = e.target;
          handleFieldChange(name, value);
        }}
      />
      <input
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        name="firstName"
        onChange={(e) => {
          const { name, value } = e.target;
          handleFieldChange(name, value);
        }}
      />
      <input
        type="text"
        placeholder="Middle Name"
        value={formData.middleName}
        name="middleName"
        onChange={(e) => {
          const { name, value } = e.target;
          handleFieldChange(name, value);
        }}
      />
      <select
        value={formData.extensionName}
        name="extensionName"
        onChange={(e) => {
          const { name, value } = e.target;
          handleFieldChange(name, value);
        }}
      >
        <option value="">Select Extension Name</option>
        <option value="Jr">Jr</option>
        <option value="II">II</option>
        <option value="III">III</option>
        <option value="IV">IV</option>
        <option value="V">V</option>
        <option value="none">None</option>
      </select>
      <input
        type="date"
        placeholder="Birthdate (MM/DD/YY)"
        value={formData.birthdate}
        name="birthdate"
        onChange={(e) => {
          const { name, value } = e.target;
          handleFieldChange(name, value);
        }}
      />
      <select
        type="text"
        placeholder="Sex"
        value={formData.sex}
        name="sex"
        onChange={(e) => {
          const { name, value } = e.target;
          handleFieldChange(name, value);
        }}
      >
        <option value="">Select Sex</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        type="text"
        placeholder="Current Address"
        value={formData.currentAddress}
        name="currentAddress"
        onChange={(e) => {
          const { name, value } = e.target;
          handleFieldChange(name, value);
        }}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        name="email"
        onChange={(e) => {
          const { name, value } = e.target;
          handleFieldChange(name, value);
        }}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default Step1;
