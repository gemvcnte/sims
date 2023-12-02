import axios from "axios";
import { createAdminEndpoint } from "@/config/adminEndpoints";

export const createTeacherProfileApi = async (teacherProfileData) => {
  try {
    const response = await axios.post(createAdminEndpoint, teacherProfileData);

    return response;
  } catch (error) {
    console.error("Error creating teacher profile:", error);
    throw error;
  }
};
