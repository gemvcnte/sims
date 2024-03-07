import React from "react";
import { Button } from "@/components/ui/button";
import {
  PersonalInformationSection,
  ParentInformationSection,
  AcademicInformationSection,
  AdditionalInformationSection,
} from "./sections";
import { updateStudentProfileApi } from "./helpers";
import { useStudentProfile } from "./hooks";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import showErrorNotification from "@/utils/ShowErrorNotification";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StudentProfileDisplayAndEditSection = () => {
  const { studentProfile, error, setStudentProfile } = useStudentProfile();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    // Limit the input value of contact numbers to 11 (09xxxxxxxxx)
    if (
      field === "fatherContactNumber" ||
      field === "motherContactNumber" ||
      field === "guardianContactNumber"
    ) {
      value = value.slice(0, 11);
    }

    setStudentProfile({
      ...studentProfile,
      [field]: value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const updatedProfileData = { ...studentProfile };
    try {
      const response = await updateStudentProfileApi(updatedProfileData);

      response.status === 200
        ? showSuccessNotification(response.data.message)
        : showErrorNotification(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error in component:", error);
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <form
        className="mt-4 flex flex-col gap-4 px-8 md:mt-8 md:gap-8 lg:mt-12 lg:gap-12"
        onSubmit={handleUpdateProfile}
      >
        <AcademicInformationSection
          studentProfile={studentProfile}
          handleInputChange={handleInputChange}
        />

        <PersonalInformationSection
          studentProfile={studentProfile}
          handleInputChange={handleInputChange}
        />

        <ParentInformationSection
          studentProfile={studentProfile}
          handleInputChange={handleInputChange}
        />

        <AdditionalInformationSection
          studentProfile={studentProfile}
          handleInputChange={handleInputChange}
        />

        <footer className="mb-4 p-4 text-right md:mb-8">
          <Button type="submit">Save changes</Button>
        </footer>
      </form>
    </>
  );
};

export default StudentProfileDisplayAndEditSection;
