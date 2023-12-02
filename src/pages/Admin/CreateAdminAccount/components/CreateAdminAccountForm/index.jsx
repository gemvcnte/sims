import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  PersonalInformationSection,
  EducationalInformationSection,
  AdditionalInformationSection,
  EmploymentInformationSection,
} from "./sections";
import { createTeacherProfileApi } from "./helpers";

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
    // console.log(teacherProfile);
    try {
      await createTeacherProfileApi(teacherProfile);
    } catch (error) {
      console.error("Error in component:", error);
    }
  };

  return (
    <form
      className="mt-4 flex flex-col gap-4 px-8 md:mt-8 md:gap-8 lg:mt-12 lg:gap-12"
      onSubmit={handleCreateTeacherAccount}
    >
      <EducationalInformationSection
        teacherProfile={teacherProfile}
        handleInputChange={handleInputChange}
      />

      <EmploymentInformationSection
        teacherProfile={teacherProfile}
        handleInputChange={handleInputChange}
      />

      <PersonalInformationSection
        teacherProfile={teacherProfile}
        handleInputChange={handleInputChange}
      />

      <AdditionalInformationSection
        teacherProfile={teacherProfile}
        handleInputChange={handleInputChange}
      />

      <footer className="mb-4 p-4 text-right md:mb-8">
        <Button type="submit">Save changes</Button>
      </footer>
    </form>
  );
};

export default CreateAdminAccountForm;
