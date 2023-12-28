// useTeacherProfile.js
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { getTeacherProfileEndpoint } from "@/config/teacherEndpoints";

const useTeacherProfile = () => {
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [error, setError] = useState(null);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      const storedProfileData = JSON.parse(
        localStorage.getItem("teacherProfile"),
      );

      if (storedProfileData) {
        setTeacherProfile(storedProfileData);
        return;
      }

      if (!authToken) {
        setError("JWT token not found in localStorage");
        return;
      }

      try {
        const response = await axiosInstance.get(getTeacherProfileEndpoint);

        const fetchedProfileData = response.data.teacherProfile;
        console.log(fetchedProfileData);
        setTeacherProfile(fetchedProfileData);

        localStorage.setItem(
          "teacherProfile",
          JSON.stringify(fetchedProfileData),
        );
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTeacherProfile();
  }, [getTeacherProfileEndpoint, authToken]);

  return { teacherProfile, error, setTeacherProfile };
};

export default useTeacherProfile;
