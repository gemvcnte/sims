import React from "react";
import { Button } from "@/components/ui/button";
import {
  PersonalInformationSection,
  EducationalInformationSection,
  AdditionalInformationSection,
  EmploymentInformationSection,
} from "./sections";
import { updateAdminProfileApi } from "./helpers";
import { useAdminProfile } from "./hooks";

const AdminProfileDisplayAndEditSection = () => {
  const { adminProfile, error, setAdminProfile } = useAdminProfile();

  const handleInputChange = (field, value) => {
    setAdminProfile({
      ...adminProfile,
      [field]: value,
    });
  };

  const handleUpdateProfile = async () => {
    const updatedProfileData = { ...adminProfile };
    try {
      await updateAdminProfileApi(updatedProfileData);
    } catch (error) {
      console.error("Error in component:", error);
    }
  };

  return (
    <form
      className="mt-4 flex flex-col gap-4 px-8 md:mt-8 md:gap-8 lg:mt-12 lg:gap-12"
      onSubmit={handleUpdateProfile}
    >
      <EducationalInformationSection
        adminProfile={adminProfile}
        handleInputChange={handleInputChange}
      />

      <EmploymentInformationSection
        adminProfile={adminProfile}
        handleInputChange={handleInputChange}
      />

      <PersonalInformationSection
        adminProfile={adminProfile}
        handleInputChange={handleInputChange}
      />

      {/* hidden because the teacherModel and adminModel doesnt include additional information yet */}
      {/* <AdditionalInformationSection
        adminProfile={adminProfile}
        handleInputChange={handleInputChange}
      /> */}

      <footer className="mb-4 p-4 text-right md:mb-8">
        <Button type="submit">Save changes</Button>
      </footer>
    </form>
  );
};

export default AdminProfileDisplayAndEditSection;
