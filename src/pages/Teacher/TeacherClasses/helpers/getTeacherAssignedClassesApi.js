import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getTeacherAssignedClassesEndpoint } from "@/config/teacherEndpoints";
import getAuthHeaders from "@/utils/getAuthHeaders";

export default async function getTeacherAssignedClassesApi() {
  const authToken = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(authToken);
  const username = decodedToken ? decodedToken.username : null;

  // const queryParams = {
  //   adviser: username,
  // };

  const response = await axios.get(getTeacherAssignedClassesEndpoint, {
    // params: queryParams,
    ...getAuthHeaders(),
  });

  return response.data.data || [];
}