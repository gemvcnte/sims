import getAuthHeaders from "@/utils/getAuthHeaders";
import axios from "axios";

const updateStudentsInClassApi = async (classId, studentEmails) => {
  try {
    const response = await axios.patch(
      "http://localhost:5000/teacher/update-students-in-class",
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
