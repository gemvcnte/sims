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

const StudentProfileDisplayAndEditSection = () => {
  const { studentProfile, error, setStudentProfile } = useStudentProfile();

  const handleInputChange = (field, value) => {
    setStudentProfile({
      ...studentProfile,
      [field]: value,
    });
  };

  const handleUpdateProfile = async () => {
    const updatedProfileData = { ...studentProfile };
    try {
      await updateStudentProfileApi(updatedProfileData);
    } catch (error) {
      console.error("Error in component:", error);
    }
  };

  return (
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
  );
};

export default StudentProfileDisplayAndEditSection;
