import axios from "axios";
import { getTeacherAssignedClassesEndpoint } from "@/config/teacherEndpoints";
import getAuthHeaders from "@/utils/getAuthHeaders";

export default async function getTeacherAssignedClassesApi() {
  const response = await axios.get(getTeacherAssignedClassesEndpoint, {
    ...getAuthHeaders(),
  });

  return response.data.data || [];
}
