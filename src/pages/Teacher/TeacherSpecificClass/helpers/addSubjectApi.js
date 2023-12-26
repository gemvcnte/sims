import axios from "axios";

export const addSubjectApi = async (newSubjectData) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/teacher/class/add-subject`,
      newSubjectData,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
