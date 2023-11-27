// useStudentProfile.js
import { useEffect, useState } from "react";
import axios from "axios";
import { getBaseUrl } from "@src/utils/configUtils";

const useStudentProfile = () => {
  const [studentProfile, setStudentProfile] = useState(null);
  const [error, setError] = useState(null);
  const baseUrl = getBaseUrl();
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchStudentProfile = async () => {
      const profileEndpoint = `${baseUrl}/student/profile`;

      const storedProfileData = JSON.parse(
        localStorage.getItem("studentProfile"),
      );

      if (storedProfileData) {
        setStudentProfile(storedProfileData);
        return;
      }

      if (!authToken) {
        setError("JWT token not found in localStorage");
        return;
      }

      try {
        const response = await axios.get(profileEndpoint, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const fetchedProfileData = response.data.studentProfile;
        setStudentProfile(fetchedProfileData);

        localStorage.setItem(
          "studentProfile",
          JSON.stringify(fetchedProfileData),
        );
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStudentProfile();
  }, [baseUrl, authToken]);

  return { studentProfile, error };
};

export default useStudentProfile;
