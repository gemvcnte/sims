import {
  resetAdminPasswordEndpoint,
  resetTeacherPasswordEndpoint,
} from "@/config/adminEndpoints";
import axiosInstance from "@/utils/axios";

export const resetAdminPassword = async (teacherId) => {
  try {
    const response = await axiosInstance.patch(resetAdminPasswordEndpoint, {
      id: teacherId,
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to reset admin password",
    );
  }
};
