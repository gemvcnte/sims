// useAdminProfile.js
import { useEffect, useState } from "react";
import axios from "axios";
import { getAdminProfileEndpoint } from "@/config/adminEndpoints";
import useCookie from "@/hooks/useCookie";

const useAdminProfile = () => {
  const { getCookie } = useCookie();

  const [adminProfile, setAdminProfile] = useState({});
  const [error, setError] = useState(null);
  const authToken = getCookie("authToken");

  const loadStoredProfile = () => {
    const storedProfileData = JSON.parse(localStorage.getItem("adminProfile"));

    if (storedProfileData) {
      setAdminProfile(storedProfileData);
      return true;
    }

    return false;
  };

  const handleSuccess = (fetchedProfileData) => {
    setAdminProfile(fetchedProfileData);
    localStorage.setItem("adminProfile", JSON.stringify(fetchedProfileData));
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const fetchProfileData = async () => {
    try {
      if (!loadStoredProfile() && authToken) {
        const response = await axios.get(getAdminProfileEndpoint, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const fetchedProfileData = response.data.adminData;
        handleSuccess(fetchedProfileData);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [getAdminProfileEndpoint, authToken]);

  return { adminProfile, error, setAdminProfile };
};

export default useAdminProfile;
