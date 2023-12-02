import axios from "axios";
import { createTeacherEndpoint } from "@/config/adminEndpoints";

export const createTeacherProfileApi = async (teacherProfileData) => {
  try {
    const response = await axios.post(
      createTeacherEndpoint,
      teacherProfileData,
    );

    return response;
  } catch (error) {
    console.error("Error creating teacher profile:", error);
    throw error;
  }
};
