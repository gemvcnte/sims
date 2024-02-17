import { resetTeacherPasswordEndpoint } from "@/config/adminEndpoints";
import axiosInstance from "@/utils/axios";

export const resetStudentPassword = async (teacherId) => {
  try {
    const response = await axiosInstance.patch(resetTeacherPasswordEndpoint, {
      id: teacherId,
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to reset student password",
    );
  }
};
