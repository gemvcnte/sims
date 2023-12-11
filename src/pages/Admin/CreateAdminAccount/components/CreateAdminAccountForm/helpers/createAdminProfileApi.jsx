import axios from "axios";
import { createAdminEndpoint } from "@/config/adminEndpoints";
import getAuthHeaders from "@/utils/getAuthHeaders";

export const createAdminProfileApi = async (teacherProfileData) => {
  try {
    const response = await axios.post(
      createAdminEndpoint,
      teacherProfileData,
      getAuthHeaders(),
    );

    return response;
  } catch (error) {
    console.error("Error creating teacher profile:", error);
    throw error;
  }
};
