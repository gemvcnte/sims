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
    <form className="px-4" onSubmit={handleUpdateProfile}>
      <AcademicInformationSection
        studentProfile={studentProfile}
        handleInputChange={handleInputChange}
      />

      <PersonalInformationSection
        studentProfile={studentProfile}
        handleInputChange={handleInputChange}
      />

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="fatherName" className="text-right">
          Father's Name
        </Label>
        <InputField
          required
          type="text"
          placeholder="Firstname Middlename Lastname"
          value={studentProfile?.fatherName}
          onChange={(e) => handleInputChange("fatherName", e.target.value)}
          name="fatherName"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="motherName" className="text-right">
          Mother's Name
        </Label>
        <InputField
          required
          type="text"
          placeholder="Firstname Middlename Lastname"
          value={studentProfile?.motherName}
          onChange={(e) => handleInputChange("motherName", e.target.value)}
          name="motherName"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="FatherContactNumber" className="text-right">
          Father's Tel. No.
        </Label>
        <InputField
          required
          type="number"
          placeholder="+639xxxxxxxxx"
          value={studentProfile?.fatherContactNumber}
          onChange={(e) =>
            handleInputChange("fatherContactNumber", e.target.value)
          }
          name="fatherContactNumber"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="motherContactNumber" className="text-right">
          Mother's Tel. No.
        </Label>
        <InputField
          required
          type="number"
          placeholder="+639xxxxxxxxx"
          value={studentProfile?.motherContactNumber}
          onChange={(e) =>
            handleInputChange("motherContactNumber", e.target.value)
          }
          name="motherContactNumber"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="guardianName" className="text-right">
          Guardian's Name
        </Label>
        <InputField
          type="text"
          placeholder="Firstname Middlename Lastname"
          value={studentProfile?.guardianName}
          onChange={(e) => handleInputChange("guardianName", e.target.value)}
          name="guardianName"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="guardianContactNumber" className="text-right">
          Guardian's Tel. No.
        </Label>
        <InputField
          type="number"
          placeholder="+639xxxxxxxxx"
          value={studentProfile?.guardianContactNumber}
          onChange={(e) =>
            handleInputChange("guardianContactNumber", e.target.value)
          }
          name="guardianContactNumber"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="guardianRelationship" className="text-right">
          Guardian Relationship
        </Label>
        <select
          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          name="guardianRelationship"
          value={studentProfile?.guardianRelationship}
          onChange={(e) =>
            handleInputChange("guardianRelationship", e.target.value)
          }
        >
          <option value="">Relationship with Guardian</option>
          <option value="Parent">Parent</option>
          <option value="Relative">Relative</option>
          <option value="Non-relative">Non-relative</option>
        </select>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="religion" className="text-right">
          Religion
        </Label>
        <InputField
          type="text"
          placeholder="Religion"
          value={studentProfile?.religion}
          onChange={(e) => handleInputChange("religion", e.target.value)}
          name="religion"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="zipCode" className="text-right">
          ZIP Code
        </Label>
        <InputField
          type="text"
          placeholder="ZIP Code"
          value={studentProfile?.zipCode}
          onChange={(e) => handleInputChange("zipCode", e.target.value)}
          name="zipCode"
        />
      </div>
      <footer className="text-right">
        <Button type="submit">Save changes</Button>
      </footer>
    </form>
  );
};

export default StudentProfileDisplayAndEditSection;
