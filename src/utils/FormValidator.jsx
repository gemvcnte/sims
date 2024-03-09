const FormValidator = (formData, step) => {
  let requiredFields = [];

  if (step === 1) {
    requiredFields = [
      "lastName",
      "firstName",
      "middleName",
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
    requiredFields = ["lrn", "gradeLevel", "track", "strand"];
  } else if (step === 4) {
    requiredFields = ["username", "password"];
  } else if (step === 5) {
    requiredFields = ["lrn", "lastName", "gradeLevel", "track", "strand"];
  }

  const isFormDataValid = () => {
    return requiredFields.every((field) => {
      return formData.hasOwnProperty(field) && formData[field] !== "";
    });
  };

  return isFormDataValid();
};

export default FormValidator;
