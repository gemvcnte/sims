import React from "react";
import axios from "axios";
import { getBaseUrl } from "@src/utils/configUtils";
import useStudentProfile from "@/hooks/useStudentProfile";

const StudentProfileDisplayAndEditSection = () => {
  const { studentProfile, error } = useStudentProfile();

  const updateProfile = async (updatedProfileData) => {
    const baseUrl = getBaseUrl();
    const authToken = localStorage.getItem("authToken");

    try {
      await axios.patch(
        `${baseUrl}/student/profile/update`,
        { updatedProfileData },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      updateLocalProfileData(updatedProfileData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const updateLocalProfileData = (updatedProfileData) => {
    localStorage.setItem("studentProfile", JSON.stringify(updatedProfileData));
  };

  const handleUpdateProfile = () => {
    const updatedProfileData = {
      ...studentProfile,
      username: "newUsername",
    };

    updateProfile(updatedProfileData);
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
