import React from "react";
import useStudentProfile from "@/hooks/useStudentProfile";
import { updateStudentProfileApi } from "@/utils/updateStudentProfileApi";

const StudentProfileDisplayAndEditSection = () => {
  const { studentProfile, error } = useStudentProfile();

  const handleUpdateProfile = async () => {
    const updatedProfileData = {
      ...studentProfile,
      username: "newUsername",
    };

    try {
      await updateStudentProfileApi(updatedProfileData);
    } catch (error) {
      console.error("Error in component:", error);
    }
  };

  return (
    <section>
      <div>
        <h2>Student Profile</h2>
        <p>Username: {studentProfile?.username}</p>
        <p>Role: {studentProfile?.role}</p>
        <button onClick={handleUpdateProfile}>Update Profile</button>
      </div>
    </section>
  );
};

export default StudentProfileDisplayAndEditSection;
