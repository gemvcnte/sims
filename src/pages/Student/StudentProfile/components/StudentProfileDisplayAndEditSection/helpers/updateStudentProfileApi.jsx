import axios from "axios";
import { updateStudentProfileEndpoint } from "@/config/studentEndpoints";

export const updateStudentProfileApi = async (updatedProfileData) => {
  const authToken = localStorage.getItem("authToken");

  try {
    const response = await axios.patch(
      updateStudentProfileEndpoint,
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
