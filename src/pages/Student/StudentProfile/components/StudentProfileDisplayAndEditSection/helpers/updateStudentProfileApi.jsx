import axios from "axios";
import { getBaseUrl } from "@src/utils/configUtils";

export const updateStudentProfileApi = async (updatedProfileData) => {
  const baseUrl = getBaseUrl();
  const authToken = localStorage.getItem("authToken");

  try {
    const response = await axios.patch(
      `${baseUrl}/student/profile/update`,
      { updatedProfileData },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    const updatedData = response.data;

    updateLocalProfileData(updatedData);

    return updatedData;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const updateLocalProfileData = (updatedProfileData) => {
  localStorage.setItem("studentProfile", JSON.stringify(updatedProfileData));
};
