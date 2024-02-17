import { ResetStudentPasswordEndpoint } from "@/config/adminEndpoints";
import axiosInstance from "@/utils/axios";

export const resetStudentPassword = async (studentId) => {
  try {
    const response = await axiosInstance.patch(ResetStudentPasswordEndpoint, {
      lrn: studentId,
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to reset student password",
    );
  }
};
