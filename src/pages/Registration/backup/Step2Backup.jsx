// Step2.js
import React, { useState, useEffect } from "react";
import FormValidator from "./FormValidator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "./BlankFieldNotification";

function Step2({ onNext, onBack, formData }) {
  const [parentData, setParentData] = useState({
    parentLastName: "",
    parentFirstName: "",
    parentMiddleName: "",
    parentContactNumber: "",
  });

  useEffect(() => {
    if (formData) {
      setParentData(formData);
    }
  }, [formData]);

  const handleNext = () => {
    const isFormValid = FormValidator(parentData, 2);
    console.log(isFormValid);
    isFormValid ? onNext(parentData) : notify();
  };

  const handleFieldChange = (field, value) => {
    setParentData({ ...parentData, [field]: value });
  };

  return (
    <div>
      <ToastContainer />
      <h2>Step 2: Parent's Information</h2>
      <input
        type="text"
        placeholder="Last Name"
        value={parentData.parentLastName}
        onChange={(e) => handleFieldChange("parentLastName", e.target.value)}
      />
      <input
        type="text"
        placeholder="First Name"
        value={parentData.parentFirstName}
        onChange={(e) => handleFieldChange("parentFirstName", e.target.value)}
      />
      <input
        type="text"
        placeholder="Middle Name"
        value={parentData.parentMiddleName}
        onChange={(e) => handleFieldChange("parentMiddleName", e.target.value)}
      />
      <input
        type="number"
        placeholder="Contact Number"
        value={parentData.parentContactNumber}
        onChange={(e) =>
          handleFieldChange("parentContactNumber", e.target.value)
        }
      />
      <button onClick={() => onBack(parentData)}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default Step2;
