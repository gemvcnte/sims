// useTeacherProfile.js
import { useEffect, useState } from "react";
import axios from "axios";
import { getAdminProfileEndpoint } from "@/config/adminEndpoints";

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
        const response = await axios.get(getAdminProfileEndpoint, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

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
  }, [getAdminProfileEndpoint, authToken]);

  return { teacherProfile, error, setTeacherProfile };
};

export default useTeacherProfile;
