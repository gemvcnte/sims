// fetchStudentsApi.js

import getAuthHeaders from "@/utils/getAuthHeaders";
import axios from "axios";

const fetchStudentsApi = async (setAllStudents) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/teacher/getStudents",
      getAuthHeaders(),
    );
    setAllStudents(response.data.data);
  } catch (error) {
    console.error("Error fetching all students:", error);
  }
};

export default fetchStudentsApi;
