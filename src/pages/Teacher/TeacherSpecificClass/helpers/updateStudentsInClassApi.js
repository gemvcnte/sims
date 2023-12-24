// updateStudentsInClassApi.js

import axios from "axios";

const updateStudentsInClassApi = async (classId, studentEmails) => {
  try {
    await axios.post("http://localhost:5000/teacher/update-students-in-class", {
      classId,
      studentEmails,
    });
  } catch (error) {
    console.error("Error updating students in class:", error);
    throw error; // Rethrow the error so the calling code can handle it if needed
  }
};

export default updateStudentsInClassApi;
