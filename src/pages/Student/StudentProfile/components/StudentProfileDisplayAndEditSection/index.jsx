import { AdditionalInformationSection } from "./AdditionalInformationSection";
import { ParentInformationSection } from "./ParentInformationSection";
import { PersonalInformationSection } from "./PersonalInformationSection";
import { AcademicInformationSection } from "./AcademicInformationSection";
import React from "react";
import useStudentProfile from "@/hooks/useStudentProfile";
import { updateStudentProfileApi } from "@/utils/updateStudentProfileApi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import extensionNameSelectOptions from "../extensionNameSelectOptions";
import InputField from "../InputField";

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
