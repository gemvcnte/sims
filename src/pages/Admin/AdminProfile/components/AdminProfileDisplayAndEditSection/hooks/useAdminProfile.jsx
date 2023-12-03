// useAdminProfile.js
import { useEffect, useState } from "react";
import axios from "axios";
import { getAdminProfileEndpoint } from "@/config/adminEndpoints";

const useAdminProfile = () => {
  const [adminProfile, setAdminProfile] = useState(null);
  const [error, setError] = useState(null);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchAdminProfile = async () => {
      const storedProfileData = JSON.parse(
        localStorage.getItem("adminProfile"),
      );

      if (storedProfileData) {
        setAdminProfile(storedProfileData);
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

        const fetchedProfileData = response.data.adminData;
        console.log(fetchedProfileData);
        setAdminProfile(fetchedProfileData);

        localStorage.setItem(
          "adminProfile",
          JSON.stringify(fetchedProfileData),
        );
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAdminProfile();
  }, [getAdminProfileEndpoint, authToken]);

  return { adminProfile, error, setAdminProfile };
};

export default useAdminProfile;
