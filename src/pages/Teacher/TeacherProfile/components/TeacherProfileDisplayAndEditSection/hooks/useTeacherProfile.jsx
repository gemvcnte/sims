// useTeacherProfile.js
import { useEffect, useState } from "react";
import axios from "axios";
import { getTeacherProfileEndpoint } from "@/config/teacherEndpoints";

const useTeacherProfile = () => {
  const [teacherProfile, setTeacherProfile] = useState({});
  const [error, setError] = useState(null);
  const authToken = localStorage.getItem("authToken");

  const loadStoredProfile = () => {
    const storedProfileData = JSON.parse(
      localStorage.getItem("teacherProfile"),
    );

    if (storedProfileData) {
      setTeacherProfile(storedProfileData);
      return true;
    }

    return false;
  };

  const handleSuccess = (fetchedProfileData) => {
    setTeacherProfile(fetchedProfileData);
    localStorage.setItem("teacherProfile", JSON.stringify(fetchedProfileData));
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const fetchProfileData = async () => {
    try {
      if (!loadStoredProfile() && authToken) {
        const response = await axios.get(getTeacherProfileEndpoint, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const fetchedProfileData = response.data.teacherData;
        handleSuccess(fetchedProfileData);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [getTeacherProfileEndpoint, authToken]);

  return { teacherProfile, error, setTeacherProfile };
};

export default useTeacherProfile;
