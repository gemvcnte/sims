import axios from "axios";
import { updateAdminProfileEndpoint } from "@/config/adminEndpoints";

export const updateAdminProfileApi = async (updatedProfileData) => {
  const authToken = localStorage.getItem("authToken");

  try {
    const response = await axios.patch(
      updateAdminProfileEndpoint,
      updatedProfileData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    const updatedData = response.data.adminData;

    updateLocalProfileData(updatedData);

    return response;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const updateLocalProfileData = (updatedProfileData) => {
  localStorage.setItem("adminProfile", JSON.stringify(updatedProfileData));
};
