import axios from "axios";
import { updateTeacherProfileEndpoint } from "@/config/teacherEndpoints";

export const updateTeacherProfileApi = async (updatedProfileData) => {
  const authToken = localStorage.getItem("authToken");

  try {
    const response = await axios.patch(
      updateTeacherProfileEndpoint,
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
  localStorage.setItem("teacherProfile", JSON.stringify(updatedProfileData));
};
