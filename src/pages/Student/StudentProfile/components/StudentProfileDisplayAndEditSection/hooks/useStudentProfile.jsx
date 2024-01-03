// useStudentProfile.js
import { useEffect, useState } from "react";
import axios from "axios";
import { getStudentProfileEndpoint } from "@/config/studentEndpoints";

const useStudentProfile = () => {
  const [studentProfile, setStudentProfile] = useState(null);
  const [error, setError] = useState(null);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchStudentProfile = async () => {
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
        const response = await axios.get(getStudentProfileEndpoint, {
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
  }, [getStudentProfileEndpoint, authToken]);

  return { studentProfile, error, setStudentProfile };
};

export default useStudentProfile;
