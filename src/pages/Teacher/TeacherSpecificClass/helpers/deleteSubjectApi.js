import getAuthHeaders from "@/utils/getAuthHeaders";
import axios from "axios";

const deleteSubjectApi = async (deletionData) => {
  try {
    const response = await axios.delete(
      "http://localhost:5000/teacher/class/delete-subject",
      {
        ...deletionData,
        ...getAuthHeaders(),
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export default deleteSubjectApi;
