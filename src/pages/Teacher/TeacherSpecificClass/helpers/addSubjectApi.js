import { addSubjectEndpoint } from "@/config/teacherEndpoints";
import getAuthHeaders from "@/utils/getAuthHeaders";
import axios from "axios";

export const addSubjectApi = async (newSubjectData) => {
  try {
    const response = await axios.post(
      addSubjectEndpoint,
      newSubjectData,
      getAuthHeaders(),
    );
    return response;
  } catch (error) {
    throw error;
  }
};
