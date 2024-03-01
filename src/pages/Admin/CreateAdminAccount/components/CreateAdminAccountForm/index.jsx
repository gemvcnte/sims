import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  PersonalInformationSection,
  EducationalInformationSection,
  AdditionalInformationSection,
  EmploymentInformationSection,
} from "./sections";
import { createAdminProfileApi } from "./helpers";
import showSuccessNotification from "@utils/ShowSuccessNotification";
import showErrorNotification from "@utils/ShowErrorNotification";
import { ToastContainer } from "react-toastify";

const CreateAdminAccountForm = () => {
  const [teacherProfile, setTeacherProfile] = useState();

  const handleInputChange = (field, value) => {
    setTeacherProfile({
      ...teacherProfile,
      [field]: value,
    });
  };

  const handleCreateTeacherAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await createAdminProfileApi(teacherProfile);
      if (response && response.status === 201) {
        showSuccessNotification(response.data.message);
      } else {
        showErrorNotification(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "An error occurred.";
      console.error(errorMessage);
      showErrorNotification(errorMessage);
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <form
        className="mt-4 flex flex-col gap-4 px-4 md:mt-8 md:gap-8 lg:mt-12 lg:gap-12"
        onSubmit={handleCreateTeacherAccount}
      >
        <PersonalInformationSection
          teacherProfile={teacherProfile}
          handleInputChange={handleInputChange}
        />

        <EducationalInformationSection
          teacherProfile={teacherProfile}
          handleInputChange={handleInputChange}
        />

        <EmploymentInformationSection
          teacherProfile={teacherProfile}
          handleInputChange={handleInputChange}
        />

        {/* hidden because the teacherModel and adminModel doesnt include additional information yet */}
        {/* <AdditionalInformationSection
          teacherProfile={teacherProfile}
          handleInputChange={handleInputChange}
        /> */}

        <footer className="mb-4 p-4 text-right md:mb-8">
          <Button type="submit">Create Admin Account</Button>
        </footer>
      </form>
    </>
  );
};

export default CreateAdminAccountForm;
