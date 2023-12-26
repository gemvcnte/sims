import { updateSubjectEndpoint } from "@/config/teacherEndpoints";
import getAuthHeaders from "@/utils/getAuthHeaders";
import axios from "axios";

export const updateSubjectApi = async (updatedSubjectData) => {
  try {
    const response = await axios.patch(
      updateSubjectEndpoint,
      updatedSubjectData,
      getAuthHeaders(),
    );
    return response;
  } catch (error) {
    throw error;
  }
};
