const FormValidator = (formData, step) => {
  let requiredFields = [];

  if (step === 1) {
    requiredFields = [
      "lastName",
      "firstName",
      "middleName",
      "extensionName",
      "birthDate",
      "gender",
      "currentAddress",
      "emailAddress",
    ];
  } else if (step === 2) {
    requiredFields = [
      "guardianName",
      "guardianContactNumber",
      "guardianRelationship",
    ];
  } else if (step === 3) {
    requiredFields = ["lrn", "schoolYear", "semester", "track", "strand"];
  } else if (step === 4) {
    requiredFields = ["username", "password"];
  }

  const isFormDataValid = () => {
    return requiredFields.every((field) => {
      return formData.hasOwnProperty(field) && formData[field] !== "";
    });
  };

  return isFormDataValid();
};

export default FormValidator;
