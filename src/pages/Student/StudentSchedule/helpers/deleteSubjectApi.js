import { deleteSubjectEndpoint } from "@/config/teacherEndpoints";
import getAuthHeaders from "@/utils/getAuthHeaders";
import axios from "axios";

const deleteSubjectApi = async (deletionData) => {
  try {
    const response = await axios.delete(deleteSubjectEndpoint, {
      ...deletionData,
      ...getAuthHeaders(),
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default deleteSubjectApi;
