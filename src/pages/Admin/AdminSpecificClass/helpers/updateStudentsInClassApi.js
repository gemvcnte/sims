import { updateStudentsInClassEndpoint } from "@/config/teacherEndpoints";
import getAuthHeaders from "@/utils/getAuthHeaders";
import axios from "axios";

const updateStudentsInClassApi = async (classId, studentEmails) => {
  try {
    const response = await axios.patch(
      updateStudentsInClassEndpoint,
      {
        classId,
        studentEmails,
      },
      getAuthHeaders(),
    );

    return response;
  } catch (error) {
    console.error("Error updating students in class:", error);
    throw error;
  }
};

export default updateStudentsInClassApi;
