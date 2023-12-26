// fetchStudentsApi.js

import { getAllStudentsEndpoint } from "@/config/teacherEndpoints";
import getAuthHeaders from "@/utils/getAuthHeaders";
import axios from "axios";

const fetchStudentsApi = async (setAllStudents) => {
  try {
    const response = await axios.get(getAllStudentsEndpoint, getAuthHeaders());
    setAllStudents(response.data.data);
  } catch (error) {
    console.error("Error fetching all students:", error);
  }
};

export default fetchStudentsApi;
