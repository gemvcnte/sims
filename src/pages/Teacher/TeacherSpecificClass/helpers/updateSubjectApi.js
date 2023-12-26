import getAuthHeaders from "@/utils/getAuthHeaders";
import axios from "axios";

export const updateSubjectApi = async (updatedSubjectData) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/teacher/class/update-subject/`,
      updatedSubjectData,
      getAuthHeaders(),
    );
    return response;
  } catch (error) {
    throw error;
  }
};
